var Backbone = require('backbone');
var _ = require('underscore');

var PhysicianListItemView = Backbone.View.extend({

    tagName: 'li',
    className: 'fyd-results__list-item',

    events: {
        
    },

    template: _.template(
            '<h6 class="fyd-results__kicker"><%= specialty %></h6>' +
            '<h3 class="fyd-results__name">' +
                '<a href="results.html#physicians/<%= id %>"><%= full_name %></a>' +
                '<% if (aoa_cert) { %><span class="fyd-results__imagecontainer"><img src="img/logo-aoa-board-certified-28.png" /></span><% } %>' +
            '</h3>' +
            '<div class="fyd-results__body"><p data-lat=<%= lat %> data-lon=<%= lon %>>' +
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

