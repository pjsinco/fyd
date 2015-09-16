var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Physician = require('models/physician');
var PhysicianList = require('collections/physician-list');
var PhysicianListView = require('views/physician-list');
var PhysicianDetailView = require('views/physician-detail');
var PhysicianListItemView = require('views/physician');
var QueryStringHelpers = require('util/mixin-string-helpers');
var SearchForm = require('models/search-form');
var UserLocation = require('models/user-location');
var ResultsMeta = require('models/results-meta');

var ResultsRouter = Backbone.Router.extend({

    routes: {
        '' : 'searchResults',
        'physicians/:id': 'show'
    },

    initialize: function(options) {
        this.userLocation = new UserLocation({ id: 1 });
        var self = this;
        this.userLocation.fetch({
            success: function() {
                self.initSearch()
            }
        })
        //this.queryString = window.location.search;
        //this.queryString = options.queryString;
    },

    initSearch: function (locationAttributes) {
        this.searchForm = new SearchForm({
            userLocation: this.userLocation
        });
    },

    show: function(id) {
        var physician = new Physician({ id: id });
        physician.fetch({
            success: function() {
                var physicianDetailView = 
                    new PhysicianDetailView({ model: physician });
                physicianDetailView.render();
                $('#fydResults').html(physicianDetailView.el);
            }
        });
    },

    searchResults: function () {
        console.log('searchResults');
        queryString = 
            QueryStringHelpers
                .trimLeadingQuestionMark(window.location.search);

        //console.dir(query);

        this.physicianList = new PhysicianList({});

        var self = this;
        this.physicianList.fetch({
            data: queryString,
            //beforeSend: this.physicianList.setHeader,
            success: function(collection, response) {
                var resultsMeta = new ResultsMeta(response.meta);
                var physicianListView = new PhysicianListView({
                    collection: self.physicianList,
                    router: self
                });
                physicianListView.render();
            },
            error: function(collection, response) {
                var physicianListView
                var resultsMeta = new ResultsMeta(response.responseJSON);
            }
        });
    },
});

_.extend(ResultsRouter.prototype, QueryStringHelpers);
module.exports = ResultsRouter;

