var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Physician = require('models/physician');
var PhysicianView = require('views/physician');
var PhysicianSimpleView = require('views/physician-simple');
var Location = require('models/location');
var SearchForm = require('models/search-form');
var SearchView = require('views/search');
var UserLocation = require('models/user-location');

var Workspace = Backbone.Router.extend({

    routes: {
    
        '' : 'home',
        'physicians/:id': 'physicianDetail'
    },

    userLocation: undefined,   // UserLocation model; persisted in local storage
    searchForm: undefined,     // SearchForm model; throwaway

    initialize: function() {
        this.userLocation = new UserLocation({ id: 1 });
    },

    home: function() {

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

    physicianDetail: function(id) {
        var physician = new Physician({ id: id });
        physician.fetch({
            success: function() {
                var physicianView = new PhysicianView({ model: physician });
                physicianView.render();
                $('body').html(physicianView.el);
            }
        });
    },

    start: function() {
        Backbone.history.start();
    }
    
    
    
});

module.exports = Workspace;
