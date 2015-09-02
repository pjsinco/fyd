var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Location = require('models/location'),
    LocationFormView = require('views/location-form'),
    SpecialtyView = require('views/specialty');

var SearchForm = Backbone.View.extend({

    el: '#findYourDO',

    initialize: function() {

        var locationFormView = new LocationFormView();

        var specialtyView = new SpecialtyView();
        specialtyView.render();
    },

    render: function() {
        console.log('rendering search form');
    },

    events: {
        'submit': 'formSubmit'
    },

    formSubmit: function(evt) {
        evt.preventDefault();
        console.log('form submitted');
    }

});

module.exports = SearchForm;

