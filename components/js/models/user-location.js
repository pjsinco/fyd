var Backbone = require('backbone');
var _ = require('underscore');
var Location = require('models/location');
var LocalStorage = require('backbone.localstorage');

var UserLocation = Location.extend({

   
    localStorage: new LocalStorage('user-location'),

    defaults: {
        city: undefined,
        state: undefined, 
        zip: undefined,
        lat: undefined,
        lon: undefined
    },

    initialize: function() {
        this.fetch();
        this.listenTo(this, 'change', this.save)
    },

    isEmpty: function() {
        return (_.size(this.attributes) <= 1) ; // just id
    }


});

module.exports = UserLocation;

