var Backbone = require('backbone');

var Location = Backbone.Model.extend({

    defaults: {
        city: '',
        state: '', 
        zip: '',
        lat: 0.0,
        lon: 0.0
    },

    initialize: function() {
        console.log('location init\'d');
    }

});

module.exports = Location;
