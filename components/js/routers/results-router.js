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
var Results = require('models/results');
var ResultsMeta = require('models/results-meta');

var ResultsRouter = Backbone.Router.extend({

    routes: {
        '' : 'searchResults',
        'physicians/:id': 'show'
    },

    initialize: function(options) {
        /**
         * Grab the user's location from local storage
         *
         */
        this.userLocation = new UserLocation({ id: 1 });
        var self = this;
        this.userLocation.fetch({
            success: function() {
                self.initSearch()
            }
        })

        this.vent = _.extend({}, Backbone.events);
        this.listenTo(this.vent, 'x', function(e) {
            console.log('heard a holler up here in router');
        });
    },

    initSearch: function (locationAttributes) {
    },

    show: function(id) {
        var physician = new Physician({ id: id });
        var self = this;
        physician.fetch({
            success: function() {
                this.searchForm = new SearchForm({
                    userLocation: self.userLocation
                    //specialty: this.resultsMeta.get('specialty')
                });
                var physicianDetailView = 
                    new PhysicianDetailView({ model: physician });
                physicianDetailView.render();
                $('#fydResults').html(physicianDetailView.el);
            }
        });
    },

    searchResults: function () {
        queryString = 
            QueryStringHelpers
                .trimLeadingQuestionMark(window.location.search);

        var physicianList = new PhysicianList({});

        var self = this;
        physicianList.fetch({
            data: queryString,
            success: function(collection, response) {
                var results = new Results({
                    resultsMeta: new ResultsMeta(response.meta),
                    physicianList: physicianList,
                    userLocation: self.userLocation,
                    router: self
                });
            },
            error: function(collection, response) {
                var results = new Results({
                    resultsMeta: new ResultsMeta(response.responseJSON.meta),
                    physicianList: physicianList,
                    userLocation: self.userLocation,
                    router: self
                });
            }
        });
    },
});

_.extend(ResultsRouter.prototype, QueryStringHelpers);
module.exports = ResultsRouter;
