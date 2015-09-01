var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    typeahead = require('typeahead.0.10.5');

var SpecialtyView = Backbone.View.extend({

    el: $('#specialty'),

    autocomplete: function() {
        
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

        specialties.initialize();

        this.$el.typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
            limit: 7,
        }, {
            name: 'specialties',
            source: specialties.ttAdapter(),
            display: 'name',
            templates: {
                header: '<h5 class="typeahead-subhead">Specialties</h5>',
                suggestion: function(suggestion) {
                    // TODO
                    // remove hard-coded url
                    return '<div><a href="#">' + suggestion.name + "</a></div>";
                }
            }
        });
        
    },

    render: function() {
        this.autocomplete();
    }

});

module.exports = SpecialtyView;
