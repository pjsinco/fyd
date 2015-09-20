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

    initialize: function (options) {
        
        if (options.searchLocation) {
            this.searchLocation = options.searchLocation;
        }

        this.initAutocomplete();

        if (this.model && !this.model.isEmpty()) {
            this.render();
        }

        //this.listenTo(this.searchLocation, 'change', this.updateSearchLocation);

    },

    updateSearchLocation: function(model, options) {
        //this.saerch
    },

    setSpecialty: function(evt, suggestion) {
        this.model.set({
            code: suggestion.code,
            full: suggestion.name
        });
        this.render();
    },

    clearSpecialty: function() {
        this.model.clear();
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
            limit: 25,
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
                    return $.map(physicians.data, function(d) {
                        return {
                            //first_name: d.first_name,
                            //last_name: d.last_name,
                            //middle_name: d.middle_name,
                            full_name: d.full_name,
                            designation: d.designation,
                            city: d.city,
                            state: d.state,
                            id: d.id,
                            value: d.full_name
                        };
                    });
                }
            }
        });

    },

    physicianSuggestionTemplate: _.template(
        '<div>' +
            '<a href="results.html#physicians/<%= id %>"><%= full_name %><br />' +
                '<span class="typeahead-location"><%= city %>, <%= state %><span>' +
            '</a>' +
        '</div>'
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
                //header: '<h5 class="typeahead-subhead">Physicians near ' +
                    //self.searchLocation.get('city') + ', ' +
                    //self.searchLocation.get('state') + '</h5>',
                header: '<h5 class="typeahead-subhead">Nearby physicians</h5>',
                suggestion: self.physicianSuggestionTemplate,
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
        this.renderSpecialtyInInput();
    },

    renderSpecialtyInInput: function () {
        this.$el.typeahead('val', this.model.get('full'));
    },

    hiddenTemplate: _.template(
        '<input id="code" name="code" type="hidden" value="<%= code %>">'
    ),

    renderHidden: function() {
        var $form = $('#findYourDo');
        $form.find('#code').remove();
        if (!this.model.isEmpty()) {
            $form.prepend(this.hiddenTemplate(this.model.toJSON()));
        }
        
    },

    closed: function(e) {
        if (this.$el.typeahead('val') == '') {
            this.clearSpecialty();
        }
    }

});

module.exports = SpecialtyView;
