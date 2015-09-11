var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    typeahead = require('typeahead.0.10.5');

var SpecialtyView = Backbone.View.extend({

    el: $('#specialty'),


    events: {
        'typeahead:closed': 'closed',
        'typeahead:selected': 'setSpecialty'
    },

    initialize: function () {
        this.initAutocomplete();
        this.render();
    },

    setSpecialty: function(evt, suggestion) {
        this.model.set(suggestion);
        this.render();
    },

    initAutocomplete: function () {
        this._initSpecialtyBloodhound();
        this.specialtyEngine.initialize();

        this._initPhysicianBloodhound();
        this.physicianEngine.initialize();

        this._initTypeahead();
    },

    specialtyEngine: undefined,
    physicianEngine: undefined,

    _initSpecialtyBloodhound: function() {
        this.specialtyEngine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 7,
            prefetch: {
                url: 'http://lookup.dev/api/v1/specialties',
                filter: function(obj) {
                    //console.log(obj['data']);
                    return _.map(obj['data'], function(specialty) {
                        return specialty;
                    });
                }
            }
        });
    },

    _initPhysicianBloodhound: function() {
        this.physicianEngine = new Bloodhound({
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

    },

    physicianSuggestionTemplate: _.template(
        '<div><a href="/#physicians/<%= id %>" id="#physicianLink">' +
        '<strong><%= first_name %> <%= last_name %></strong>, ' +
        '<%= designation %>; <%= city %>, <%= state %></a></div>'
    ),

    _initTypeahead: function () {
        var self = this;

        this.$el.typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
            limit: 7,
        }, {
            name: 'physicians',
            //limit: 7,
            display: 'value',
            source: self.physicianEngine.ttAdapter(),
            templates: {
                header: '<h5 class="typeahead-subhead">Physicians near ' +
                    '[city, state]</h5>',
                suggestion: self.physicianSuggestionTemplate,
                engine: _
            },
        }, {
            name: 'specialties',
            source: self.specialtyEngine.ttAdapter(),
            display: 'name',
            templates: {
                header: '<h5 class="typeahead-subhead">Specialties</h5>',
                suggestion: function(suggestion) {
                    return '<div>' + suggestion.name + "</div>";
                }
            }
        });
        
    },

    render: function() {
        this.renderHidden();

    },

    hiddenTemplate: _.template(
        '<input id="sCode" name="s_code" type="hidden" value="<%= code %>">'
    ),

    renderHidden: function() {
        var $form = $('#findYourDo');
        $form.find('#sCode').remove();

        if (!this.model.isEmpty()) {
            $form.prepend(this.hiddenTemplate(this.model.toJSON()));
        }
        
    },

    closed: function(e) {
        console.log('#specialty closed');
    }

});

module.exports = SpecialtyView;
