var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var ResultsMetaView = Backbone.View.extend({

    events: {
        
    },

    initialize: function (options) {
        if (options.el) {
            this.el = $(options.el)
        }

        if (options.length) {
            this.length = options.length;
        }
        this.render();
    },

    render: function () {
        var template = _.template($('#fydResultsMetaTemplate').html());
        this.$el.html(template({ length: this.length } ));
    }

});

module.exports = ResultsMetaView;

