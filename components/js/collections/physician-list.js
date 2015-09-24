var Backbone = require('backbone');
var Physician = require('models/physician');

var PhysicianList = Backbone.Collection.extend({

    model: Physician,
    
    //url: 'http://lookup.dev/api/v1/physicians/search',
    url: 'http://lookupapi.dev/api/v1/physicians/search',
    
    parse: function(response) {
        return response.data;
    },

    //setHeader: function(xhr) {
        //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //}



});

module.exports = PhysicianList;

