var Backbone = require('backbone');
var LocationFormView = require('views/location-form');
var SpecialtyFormView = require('views/specialty');

var SearchView = Backbone.View.extend({

    events: {
        
    },

    initialize: function () {
        var locationFormView = new LocationFormView();
        var specialtyView = new SpecialtyView();
        specialtyView.render();
        
    },

    render: function () {

    }

});

module.exports = SearchView;

