var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var ResultsMetaView = Backbone.View.extend({

    el: '#fydResultsMeta',

    events: {
        
    },

    initialize: function (options) {
        if (options.el) {
            this.el = $(options.el)
        }

        this.render();
    },

    render: function () {
        var template = _.template($('#fydResultsMetaTemplate').html());
        this.$el.html(template( this.model.toJSON() ));
    }

});

module.exports = ResultsMetaView;

