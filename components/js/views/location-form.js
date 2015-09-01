var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Location = require('models/location');

var LocationForm = Backbone.View.extend({

    el: $('#location'),

    autocomplete: function() {
        var locationInput = this.$el;
    
        var locations = new Bloodhound({
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
                            return $.map(d, function(e) {
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

        locations.initialize();

        this.$el.typeahead({
            hint: true,
            highlight: true,
            minLength: 3,
        }, {
            name: 'engine',
            display: 'value',
            source: locations.ttAdapter(),
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
    

        //this.$el.on('typeahead:opened', function() {
            //console.log('opened autocomplete');
        //})
    },

    events: {
        'click': 'clickHandler',
        'typeahead:opened': 'opened',
        'focus': 'focused',
        'typeahead:selected': 'setLocation',
        'typeahead:autocompleted': 'setLocation',
        'typeahead:closed': 'closed',
    },
    
    closed: function(e) {
        console.log(e.type);
        console.log('val: ' + this.$el.typeahead('val'));
    },

    setLocation: function(evt, suggestion, name) {
        console.log(evt.type);
        this.model = new Location(suggestion);
        console.log('location set');
        console.dir(this.model.toJSON());
        //console.log(this.model.toJSON());
    },

    focused: function(e) {
        console.log('focused');
    },

    setNewLocation: {
        
    },

    opened: function(e) {
        console.log('we have an opened event');
    },

    clickHandler: function(e) {
        console.log('click');
    },

    render: function() {
        this.autocomplete();
    },

    isZipCode: function(query) {
        return new RegExp(/^\d{5}$/).test(query);
    }

});

module.exports = LocationForm;
