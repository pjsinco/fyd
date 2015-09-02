var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Location = require('models/location'),
    LocationFormView = require('views/location-form'),
    SpecialtyView = require('views/specialty');

var SearchForm = Backbone.View.extend({

    el: '#findYourDO',

    initialize: function() {

        // Initialize the search form's two inputs
        var locationFormView = new LocationFormView();
        var specialtyView = new SpecialtyView();
        specialtyView.render();

        // Listen for change events emitted by the location input and
        // rerender on a change
        this.listenTo(locationFormView, 'change', function(model) {
            console.log('heard a change event in SearchForm');
            this.render(model);
        });

        this.listenTo(locationFormView, 'error', function(model) {
            console.log('heard an error event in Searchform');
            this.render(model);
        });
    },

    render: function(data) {
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

module.exports = SearchForm;

