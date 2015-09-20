var Backbone = require('backbone');
var _ = require('underscore');

var GlobalEvents = {

    vent: _.extend({}, Backbone.Events)

};

module.exports = GlobalEvents;
