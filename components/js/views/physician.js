var Backbone = require('backbone');
var _ = require('underscore');

var PhysicianListItemView = Backbone.View.extend({

    tagName: 'li',
    className: 'fyd-results__list-item',

    events: {
        
    },

    template: _.template(
            '<h3 class="fyd-results__name">' +
                '<a href="/#physicians/<%= id %>"><%= full_name %></a>' +
            '<h3>' +
            '<h4><%= specialty %></h4>' +
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

