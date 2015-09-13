var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var PhysicianListItemView = require('views/physician');


var PhysicianListView = Backbone.View.extend({

    collection: undefined,
    tagName: 'ul',
    className: 'find-your-do__list',

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


    render: function () {
        this.collection.each(this.addOne, this);
        $('#fydResults').html(this.$el);
    }

});

module.exports = PhysicianListView;

