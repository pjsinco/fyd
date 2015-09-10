var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Physician = require('models/physician');
var PhysicianView = require('views/physician');
var PhysicianSimpleView = require('views/physician-simple');
var Location = require('models/location');
var Search = require('models/search');
var SearchView = require('views/search');
var UserLocation = require('models/user-location');

var Workspace = Backbone.Router.extend({

    routes: {
    
        '' : 'home',
        'physicians/:id': 'physicianDetail'
    },

    userLocation: undefined,

    initialize: function() {

        var self = this;

        this.userLocation = new UserLocation({ id: 1 });

        this.userLocation.fetch({

            success: function(model, response, options) {

                if (_.isEmpty(response)) {
                    // No location in localstorage
                    
                    // geolocate; spoof for now
                } else {
                    self.searchLocation = new Location()
                    self.searchLocation.set(response);
                }

                self.searchView = new SearchView({
                    userLocation: self.userLocation,
                })
                
            },
            error: function(model, response, options) {

                var modelOptions = {
                    url: 'http://lookup.dev/api/v1/locations/random', 
                };
                var randomLocation = new Location({}, modelOptions);
                var that = self;
                randomLocation.fetch({
                    success: function(model, response, options) {
                        that.userLocation = new UserLocation(_.extend({id: 1}, response.data));
                        that.userLocation.save();

                    }
                })
                
                // TODO
            }

        });

//        var search = new Search({ 
//            locationModel: searchLocation
//        });

    },

    initSearchForm: function () {

    },

    home: function() {
        console.log('home route');
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
