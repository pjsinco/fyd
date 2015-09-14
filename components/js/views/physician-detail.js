var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var PhysicianDetailView = Backbone.View.extend({

    tagName: 'div',
    id: 'right',

    events: {
        
    },

    initialize: function () {
        
    },

    render: function () {
        var markup = this.template(this.model.toJSON());
        this.$el.html(markup);
    },

    template: _.template(
        '<div class="row">' +
            '<div id="content" class="mainContent">' +
                '<h1><%= full_name %></h1>' +
                '<div class="entry facetwp-template">' +
                    '<h4>' +
                        '<%= addr_1 %><br />' +
                        '<% if (addr_2 != \'\') { %>' +
                            '<%= addr_2 %><br />' +
                        '<% } %>' +
                        '<%= city %>, <%= state %> <%= zip %>' +
                    '</h4>' +
                '</div>' +
            '</div>' +
        '</div>'
    )

});

module.exports = PhysicianDetailView;

