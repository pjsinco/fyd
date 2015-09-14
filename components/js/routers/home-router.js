var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Physician = require('models/physician');
var PhysicianList = require('collections/physician-list');
var PhysicianListView = require('views/physician-list');
var PhysicianListItemView = require('views/physician');
var Location = require('models/location');
var SearchForm = require('models/search-form');
var ParseQueryString = require('util/mixin-parse-query-string');
var UserLocation = require('models/user-location');

var HomeRouter = Backbone.Router.extend({

    routes: {
        '' : 'home',
        'show': 'showExample',
        'physicians/:id': 'show',
        //'results?*queryString': 'logResultsRoute',
        'physicians?*queryString': 'searchResults',
    },

    showExample: function () {
        console.log('showexmple');
    },

    logResultsRoute: function (queryString) {
        console.log('on results route');
    },

    userLocation: undefined,   // UserLocation model; persisted in local storage
    searchForm: undefined,     // SearchForm model; throwaway

    initialize: function() {
        this.userLocation = new UserLocation({ id: 1 });
        this.listenTo(this, 'all', this.reportRouteEvent)
    },

    reportRouteEvent: function(eventName) {
        console.log('Router: ' + eventName);
    },

    searchResults: function (queryString) {
        console.log('searchResults');
        //var query = ParseQueryString.getQueryParams(queryString);
        //console.dir(query);

        this.physicianList = new PhysicianList({

        });

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

    home: function() {
console.log('home');

        var self = this;
        this.userLocation.fetch({
            success: function() {
                self.initSearch();
            },

            error: function() {
                // So we don't have a location for this user.

                // Let's set one up.
                // This is where we'll geolocate by IP.
                // For now we'll spoof.
                //self.spoofGeoLocate();
                self.userLocation.clear();
                self.initSearch();
            }
        });
    },

    geoLocate: function () {
        
    },

    spoofGeoLocate: function () {
        var modelOptions = {
            url: 'http://lookup.dev/api/v1/locations/random', 
        };
        var randomLocation = new Location({}, modelOptions);
        var self = this;
        randomLocation.fetch({
            success: function(model, response) {
                self.userLocation.save(_.extend({ id: 1 }, response.data));
                self.initSearch();
            }
        })
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
                var physicianView = 
                    new PhysicianListItemView({ model: physician });
                physicianView.render();
                $('body').html(physicianView.el);
            }
        });
    },

    start: function() {
        Backbone.history.start();
    }
    
});

module.exports = HomeRouter;
