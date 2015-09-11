var Backbone = require('backbone');
var _ = require('underscore');
var IsEmptyMixin = require('util/mixin-is-empty');

var Specialty = Backbone.Model.extend({

    idAttribute: 'code',

    defaults: {
        code: undefined,
        full: undefined
    },

    initialize: function () {
        this.listenTo(this, 'change', this.heardChangeEvent)
    },

    heardChangeEvent: function() {
        console.log('in the Sepecialty Model, we heard a change event to this model');
    }


});

_.extend(Specialty.prototype, IsEmptyMixin);
module.exports = Specialty;

