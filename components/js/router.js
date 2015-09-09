var Backbone = require('backbone');
var $ = require('jquery');
var Physician = require('models/physician');
var PhysicianView = require('views/physician');
var PhysicianSimpleView = require('views/physician-simple');
var Location = require('models/location');
var Search = require('models/search');
var SearchView = require('views/search');

var Workspace = Backbone.Router.extend({

    routes: {
    
        '' : 'home',
        'help': 'help',
        'physicians/:id': 'physicianDetail'
    },

    initialize: function() {
        var searchLocation = new Location();

        var search = new Search({ 
            locationModel: searchLocation
        });

        this.searchView = new SearchView({ el: '#findYourDo' });
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
