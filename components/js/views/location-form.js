var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    typeahead = require('typeahead.0.10.5'),
    Location = require('models/location');

var LocationForm = Backbone.View.extend({

    el: '#location',
    engine: {},
    resolved: false,

    initialize: function() {
        this.initAutocomplete();

        var self = this;

//        var options = {
//            url: 'http://lookup.dev/api/v1/locations/random', 
//        };
//
//        this.model = new Location({}, options);
        this.listenTo(this.model, 'change', this.render);

        //this.model.fetch({
            //success: function(response) {
                self.render();
                self.triggerChangeEvent();
            //}
        //});

    },

    logError: function() {
        console.log('error');
    },

    events: {
        'typeahead:opened': 'opened',
        'error': 'logError',
        'typeahead:selected': 'setLocation',
        'typeahead:autocompleted': 'setLocation',
        'typeahead:closed': 'closed',
        'input': 'inputChange',
    },

    inputChange: function () {
        this.resolved == false;
        console.log('resolved = false');
    },

    holla: function(model, options)  {
        console.log('holla');
    },


    opened: function() {
    },

    parseInput: function() {
        var val = this.$el.typeahead('val');
        console.log('val grabbed in parse input: ' + val);
    },

    triggerChangeEvent: function() {
        this.trigger('change', this.model);
    },

    setLocation: function(evt, suggestion) {
        this.resolved = true;
        console.log('resolved = true');
        // User didn't include the zip, so we're tossing out
        // that level of precision
        if (!suggestion.hasOwnProperty('zip')) {
            _.defaults(suggestion, { zip: undefined })
        }

        this.model.set(suggestion);
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
                self.resolved = true;
                console.log('resolved = true');
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
        console.log('we\'re in closed(): resolved: ' + 
            (this.resolved ? 'true' : 'false'));
        if (this.$el.typeahead('val') != '' && !this.resolved) {
            console.log('resolving');
            this._resolve();
        } 
    },

    focused: function(e) {
        console.log('focused');
    },

    render: function() {
        this.renderTypeaheadInput();
        this.renderHiddens();
        return this;
    },

    /**
     * Render hidden form inputs
     *
     */
    renderHiddens: function() {
        console.log('rendering hiddens');
        var $form = $('#findYourDo');
        $form.find('.hidden-location').remove();

        if (!this.model.isEmpty()) {
            $form.prepend(this.hiddensTemplate(this.model.toJSON()));
        }
    },

    renderTypeaheadInput: function() {
        if (!this.model.isEmpty()) {
            this.$el.typeahead('val', this.template(this.model.toJSON()));
        }
    },

    hiddensTemplate: _.template(
        '<input class="hidden-location" id="city" name="city" type="hidden" value="<%= city %>">' +
        '<input class="hidden-location" id="state" name="state" type="hidden" value="<%= state %>">' +
        '<input class="hidden-location" id="zip" name="zip" type="hidden" value="<%= zip %>">' +
        '<input class="hidden-location" id="lat" name="lat" type="hidden" value="<%= lat %>">' +
        '<input class="hidden-location" id="lon" name="lon" type="hidden" value="<%= lon %>">'
    ),

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
    
    initAutocomplete: function() {
        this._initBloodhound();
        this.engine.initialize();
        this._initTypeahead();
    }

});

module.exports = LocationForm;
