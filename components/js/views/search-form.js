var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Location = require('models/location'),
    LocationFormView = require('views/location-form'),
    SpecialtyView = require('views/specialty');

var SearchForm = Backbone.View.extend({

    el: '#findYourDO',

    initialize: function() {

        var location = new Location();
        var locationFormView = new LocationFormView({ model: location });
        locationFormView.render();

        var specialtyView = new SpecialtyView();
        specialtyView.render();
    },

    render: function() {
        console.log('rendering search form');
    },

    events: {

    }

});

module.exports = SearchForm;

