var Backbone = require('backbone');

var ResultsMeta = Backbone.Model.extend({

    
    defaults: {
        city: undefined,
        state: undefined,
        zip: undefined,
        specialty: undefined
    },

    initialize: function () {

    }

});

module.exports = ResultsMeta;


