var Backbone = require('backbone');
var Physician = require('models/physician');

var PhysicianList = Backbone.Collection.extend({

    model: Physician,
    
    url: 'http://lookup.dev/api/v1/physicians/search',
    
    parse: function(response) {
        return response.data;
    }


});

module.exports = PhysicianList;

