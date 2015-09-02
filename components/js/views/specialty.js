var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    typeahead = require('typeahead.0.10.5');

var SpecialtyView = Backbone.View.extend({

    el: $('#specialty'),

    autocomplete: function() {

        var physicians = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            //limit: 7,
            remote: {
                url: 'http://lookup.dev/api/v1/physicians/search',
                replace: function(url, uriEncodedQuery) {
                    // Grab the location from the hidden form fields
                    var loc = {
                        city: $('#city').val(),
                        state: $('#state').val(),
                        zip: $('#zip').val(),
                        lat: $('#lat').val(),
                        lon: $('#lon').val()
                    };
                    var params = $.param(loc);
                    return url + '?name=' + uriEncodedQuery + '&' + params;
                },
                filter: function(physicians) {
                    return $.map(physicians, function(d) {
                        return $.map(d, function(e) {
                            return {
                                first_name: e.first_name,
                                last_name: e.last_name,
                                designation: e.designation,
                                city: e.city,
                                state: e.state,
                                id: e.id,
                                value: e.full_name
                            };
                        });
                    });
                }
            }
        });
    
        var specialties = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 7,
            prefetch: {
                url: 'http://lookup.dev/api/v1/specialties',
                filter: function(obj) {
                    console.log(obj['data']);
                    return _.map(obj['data'], function(specialty) {
                        return specialty;
                    });
                }
            }
        });

        physicians.initialize();
        specialties.initialize();

        var compiledSuggestion = _.template(
            '<div><a href="#"><strong><%= first_name %> <%= last_name %>' +
            '</strong>, <%= designation %>; <%= city %>, ' +
            '<%= state %></a></div>'
        );

        this.$el.typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
            limit: 7,
        }, {
            name: 'physicians',
            //limit: 7,
            display: 'value',
            source: physicians.ttAdapter(),
            templates: {
                header: '<h5 class="typeahead-subhead">Physicians near ' +
                    '[city, state]</h5>',
                suggestion: compiledSuggestion,
                engine: _
            },
        }, {
            name: 'specialties',
            source: specialties.ttAdapter(),
            display: 'name',
            templates: {
                header: '<h5 class="typeahead-subhead">Specialties</h5>',
                suggestion: function(suggestion) {
                    // TODO
                    // remove hard-coded url
                    return '<div>' + suggestion.name + "</div>";
                }
            }
        });

    },

    render: function() {
        this.autocomplete();
    }

});

module.exports = SpecialtyView;
