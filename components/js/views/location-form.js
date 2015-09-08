var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    typeahead = require('typeahead.0.10.5'),
    Location = require('models/location');

var LocationForm = Backbone.View.extend({

    el: '#location',
    engine: {},
    isSet: false,

    initialize: function() {
        this.initAutocomplete();

        var self = this;

        var options = {
            url: 'http://lookup.dev/api/v1/locations/random', 
        };

        this.model = new Location({}, options);
        this.listenTo(this.model, 'change', this.logChangeEvent);

        this.model.fetch({
            success: function(response) {
                self.render();
                self.triggerChangeEvent();
            }
        });

    },

    logModelChange: function(model, options) {
        alert('Model changed to ' + this.model.get('city') + ', ' + 
            this.model.get('state'));
    },

    logChangeEvent: function(model, options) {
        console.log('change fired');
        //console.debug(model);
        //console.debug(options);
    },

    logError: function() {
        console.log('error');
    },

    events: {
        'focus': 'focusHandler',
        'click': 'clickHandler',
        'typeahead:opened': 'opened',
        'error': 'logError',
        'typeahead:selected': 'setLocation',
        'typeahead:autocompleted': 'setLocation',
        'typeahead:closed': 'closed',
        'input': 'inputHandler'
    },

    focusHandler: function() {
        console.log('focus');
    },

    clickHandler: function() {
        console.log('click');
    },

    inputHandler: function() {
        console.log('input changed');
        this.isSet = false;
    },

    opened: function() {
        console.log('typehaead opened');
    },

    parseInput: function() {
        var val = this.$el.typeahead('val');
        console.log('val grabbed in parse input: ' + val);
    },

    triggerChangeEvent: function() {
        this.trigger('change', this.model);
    },

    setLocation: function(evt, suggestion) {

        // User didn't include the zip, so we're tossing out
        // that level of precision
        if (!suggestion.hasOwnProperty('zip')) {
            _.defaults(suggestion, { zip: undefined })
        }

        this.isSet = true;
        this.model.set(suggestion);
        this.triggerChangeEvent();
    },

    /**
     * Announce that the location is unresolved.
     *
     */
    _unresolve: function() {
         console.log('unresolved');
         this.model.clear();
         this.trigger('error', this.model);
    },

    /**
     * Attempts to resolve a location that was not autocompleted.
     *
     */
    _resolve: function() {
        var self = this;
        var value = this.$el.typeahead('val');

        console.log('Trying to resolve: ' + value);

        // value is a string of an unautocompleted location, like 'king, w'
        this.engine.get(value, function(suggestions) {

            var uniqueLocations = _.uniq(suggestions, false, function(item) {
                return [item.city, item.state].join();
            });

            if (uniqueLocations.length == 1) {
                console.log('resolved');
                self.setLocation(null, uniqueLocations[0]);
                self.render();
                
            } else {
                self._unresolve();
            }
            _.each(uniqueLocations, function(loc) { 
                console.log(loc); 
            });
        });
    },
    
    closed: function(e) {

        // we shouldn't call _resolve() on an empty field
        if (this.$el.typeahead('val') != '') {
            console.log('resolving');
            this._resolve();
        } else {
            this._unresolve();
        }
    },

    focused: function(e) {
        console.log('focused');
    },

    render: function() {
        this.$el.typeahead('val', this.template(this.model.toJSON()));

        return this;
    },

    template: _.template(
        '<%= city %>, <%= state %><% if (typeof zip !== "undefined") { %>' +
            ' <%= zip %>' +
        '<% } %>'
    ),

    isZipCode: function(query) {
        return new RegExp(/^\d{5}$/).test(query);
    },

    _initBloodhound: function() {
        var locationInput = this.$el;
    
        this.engine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 10,
            remote: {
                url: 'http://lookup.dev/api/v1/locations/search',
                replace: function(url, urlEncodedQuery) {
                    return url + '?q=' + urlEncodedQuery;
                },
                filter: function(locations) {
                    var userTyped = locationInput.typeahead('val');
                    return $.map(locations, function(location) {
                        // user typed a city
                        if (isNaN(userTyped)) {
                            
                            // Keep the city, state list unique
                            var uniqueLocations = _.uniq(location, false, function(item) {
                                return [item.city, item.state].join();
                            });
    
                            return $.map(uniqueLocations, function(e) {
                                return {
                                    city: e.city,
                                    state: e.state,
                                    lat: e.lat,
                                    lon: e.lon,
                                    value: e.city + ', ' + e.state
                                };
                            });
                        } else {
                        // user typed a zip, so let's include zips
                            return $.map(location, function(e) {
                                return {
                                    city: e.city,
                                    state: e.state,
                                    zip: e.zip,
                                    lat: e.lat,
                                    lon: e.lon,
                                    value: e.city + ', ' + e.state + ' ' + e.zip
                                };
                            });
                        }
                    });
                }
            }
        }); 
    },
    
    _initTypeahead: function() {
        var locationInput = this.$el;

        this.$el.typeahead({
            hint: true,
            highlight: true,
            minLength: 3,
        }, {
            name: 'engine',
            display: 'value',
            source: this.engine.ttAdapter(),
            templates: {
                suggestion: function(data) {
                    var userTyped = locationInput.typeahead('val');
                    if (isNaN(userTyped)) {
                        return '<div>' + data.city + ', ' + data.state + '</div>';
                    } else {
                        return '<div>' + data.city + ', ' + data.state + ' ' +
                    data.zip + '</div>';
                    }
                },
                //engine: Hogan
            }
        });
    },
    
    initAutocomplete() {
        this._initBloodhound();
        this.engine.initialize();
        this._initTypeahead();
    }

});

module.exports = LocationForm;
