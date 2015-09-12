var Backbone = require('backbone');
var Physician = require('models/physician');

var PhysicianList = Backbone.Collection.extend({

    model: Physician,

});

module.exports = PhysicianList;

