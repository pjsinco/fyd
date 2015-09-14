var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var PhysicianListItemView = require('views/physician');


var PhysicianListView = Backbone.View.extend({

    collection: undefined,
    tagName: 'ul',
    className: 'fyd-results__list',

    events: {
        
    },

    initialize: function (options) {
        this.router = options.router;
    },

    /**
     * Create a physician view and append to the 
     *
     */
    addOne: function (physician) {
        var physicianListItemView = 
            new PhysicianListItemView({ model: physician });
        this.$el.append(physicianListItemView.render().el);
    },

    addAll: function () {
        
    },

    template: _.template(
        '<div id="right">' +
            '<div class="row">' +
                '<div id="content" class="mainContent">' +
                '</div>' +
            '</div>' +
        '</div>'
    ),

    render: function () {
        this.collection.each(this.addOne, this);
        $('#fydResults').append(this.$el);
    }

});

module.exports = PhysicianListView;

