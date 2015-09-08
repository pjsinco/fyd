var Backbone = require('backbone');

var PhysicianSimple = Backbone.Model.extend({

    url: 'http://localhost:8000/api/v1/physicians',

    defaults: {
        firstName: '',
        lastName: '',
        designation: '',
        city: '',
        state: '',
        zip: '',
    },

    initialize: function() {
        
    }

});

module.exports = PhysicianSimple;
