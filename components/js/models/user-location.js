var Backbone = require('backbone');
var Location = require('models/location');
var LocalStorage = require('backbone.localstorage');

var UserLocation = Location.extend({

    localStorage: new LocalStorage('find-your-do'),

    initialize: function() {

    },

    getRandom: function() {
            
    }


});

module.exports = UserLocation;

