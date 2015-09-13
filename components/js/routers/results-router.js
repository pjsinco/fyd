var Backbone = require('backbone');
var _ = require('underscore');
var PhysicianList = require('collections/physician-list');
var PhysicianListView = require('views/physician-list');
var QueryStringHelpers = require('util/mixin-string-helpers');

var ResultsRouter = Backbone.Router.extend({

    routes: {
        '' : 'searchResults'       
    },

    hello: function () {
        console.log('hello from results router');
    },

    initialize: function(options) {
        //this.queryString = window.location.search;
        //this.queryString = options.queryString;
    },

    searchResults: function () {
        console.log('searchResults');
        queryString = 
            QueryStringHelpers.trimLeadingQuestionMark(window.location.search);

        //console.dir(query);

        this.physicianList = new PhysicianList({});

        var self = this;
        this.physicianList.fetch({
            data: queryString,
            //beforeSend: this.physicianList.setHeader,
            success: function() {
                var physicianListView = new PhysicianListView({
                    collection: self.physicianList,
                    router: self
                });
                physicianListView.render();
            }
        });
    },
});

_.extend(ResultsRouter.prototype, QueryStringHelpers);
module.exports = ResultsRouter;

