var Backbone = require('backbone');

var Location = Backbone.Model.extend({

    // TODO is this right?
    url: 'physicians/search',

    defaults: {
        city: '',
        state: '', 
        zip: '',
        lat: 0.0,
        lon: 0.0
    },

    initialize: function() {
        console.log('location init\'d');
    },

    validate: function(fields) {

    },

    

});

module.exports = Location;
