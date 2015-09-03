var Backbone = require('backbone');

var PhysicianSimple = Backbone.Model.extend({

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
