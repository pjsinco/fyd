var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var LocationForm = Backbone.View.extend({

    el: $('#location'),

    autocomplete: function() {

//        var stateList = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
//            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
//            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
//            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
//            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
//            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
//            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
//            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
//        ];
//
//        var states = new Bloodhound({
//            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('val'),
//            queryTokenizer: Bloodhound.tokenizers.whitespace,
//            local: _.map(stateList, function(state) { 
//                return { val: state };
//            })
//        });
//
//        states.initialize();

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
                    return $.map(locations, function(d) {
                        // user typed a city
                        if (isNaN(userTyped)) {
                            
                            // Keep the city, state list unique
                            var unique = _.uniq(d, false, function(item) {
                                return [item.city, item.state].join();
                            });
    
                            return $.map(unique, function(e) {
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
    
//        this.$el.typeahead({
//            hint: true,
//            highlight: true,
//            minLength: 1
//        }, {
//            displayKey: 'val',
//            source: states.ttAdapter()
//        });

        this.$el.on('typeahead:opened', function() {
            console.log('opened autocomplete');
        })
        
    },

    render: function() {
        this.autocomplete();
    }

});

module.exports = LocationForm;
