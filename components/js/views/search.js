var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Location = require('models/location'),
    LocationFormView = require('views/location-form'),
    SpecialtyFormView = require('views/specialty-form');

var SearchView = Backbone.View.extend({

    el: '#findYourDO',

    locationFormView: undefined,
    specialtyFormView: undefined,

    initialize: function() {

        // Initialize the search form's two inputs
        this.locationFormView = new LocationFormView({
            model: this.model.searchLocation
        });

        this.specialtyFormView = new SpecialtyFormView({
            model: this.model.specialty
        });


        // Listen for change events emitted by the location input and
        // rerender on a change
//        this.listenTo(this.locationFormView, 'change', function(model) {
//            console.log('here in SearchView, we heard a change event in locationFormView');
//            this.render();
//        });
//
//        this.listenTo(this.locationFormView, 'error', function(model) {
//            console.log('here in SearchView, we heard an error event in locationFormView');
//            this.render();
//        });

    },

    render: function() {
        this.$el.find('#city').val(data.get('city'));
        this.$el.find('#state').val(data.get('state'));
        this.$el.find('#lat').val(data.get('lat'));
        this.$el.find('#lon').val(data.get('lon'));
    },

    events: {
        'submit': 'formSubmit'
    },

    formSubmit: function(evt) {
        evt.preventDefault();
        
        // Validate the form by checking if values in hidden inputs
        // #city and #state are set
        var $hiddens = $(evt.currentTarget).find('#city, #state');
        var valid = $hiddens.filter(function(i, elem) {
            return $(elem).val() != false;
        });

        console.log('form submitted: ' + (valid.length > 0 ? 'valid' : 'invalid' ));
    }

});

module.exports = SearchView;

