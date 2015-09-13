var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Location = require('models/location'),
    LocationFormView = require('views/location-form'),
    SpecialtyFormView = require('views/specialty-form');

var SearchFormView = Backbone.View.extend({

    /**
     * Models
     *
     */
    model: undefined,  // model: SearchForm; not persisted

    /**
     * Subviews
     *
     */
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

    },

    render: function() {
        return this;
    },

    events: {
        'submit': 'formSubmit'
    },

    formSubmit: function(evt) {

        // ?city=Chicago
        // &state=IL
        // &lat=41.881027
        // &lon=-87.62473
        // &s_code=C
        // &specialty=Cardiology
        // &location=Chicago%2C+IL

        evt.preventDefault();
        console.log('form submitted: ' + (this.isValid() ? 'valid' : 'invalid' ));
        if (this.isValid()) {
            var queryString = this.$el.serialize();    
            window.location = 'http://localhost:3333/results.html?' + 
                queryString
            console.log('hiya still here');
        } else {
            this.indicateInvalid();
        }
    },
    
    isValid: function() {
        return !this.model.searchLocation.isEmpty();
    },

    indicateInvalid: function() {
        var $loc = $('#location');
        $('#location')
            .addClass('animated bounceIn required')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd ' +
                    'oanimationend animationend', function() { 
                $(this).removeClass('animated bounceIn required');
            });
    }

});

module.exports = SearchFormView;

