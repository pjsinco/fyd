var Backbone = require('backbone');
var _ = require('underscore');

var PhysicianListItemView = Backbone.View.extend({

    tagName: 'li',
    className: 'find-your-do__list-item',

    events: {
        
    },

    template: _.template(
        '<h2><%= full_name %></h2>' +
        '<h3><%= specialty %></h3>' +
        '<div><p data-lat=<%= lat %> data-lon=<%= lon %>>' +
        '<%= addr_1 %><br/ >' +
        '<%= city %>, <%= state %> <%= zip %>' +
        '</p></div>'
    ),

    initialize: function () {
        
    },

    render: function () {
        var markup = this.template(this.model.toJSON());
        this.$el.html(markup);
        return this;
    }

});

module.exports = PhysicianListItemView;

