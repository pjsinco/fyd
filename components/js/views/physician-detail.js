var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var jade = require('jade');

var PhysicianDetailView = Backbone.View.extend({

    events: {
        
    },

    initialize: function (options) {
        if (options.el) {
            this.el = $(options.el) 
        }
        this.template = _.template($('#fydDetailTemplate').html());
    },

    render: function() {
        var markup = this.template(this.model.toJSON())
        this.$el.html(markup);
    },

});

module.exports = PhysicianDetailView;

