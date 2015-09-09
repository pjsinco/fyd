var Backbone = require('backbone');
var $ = require('jquery');
var Physician = require('models/physician');
var PhysicianView = require('views/physician');
var PhysicianSimpleView = require('views/physician-simple');

var Workspace = Backbone.Router.extend({

    routes: {
    
        '' : 'home',
        'help': 'help',
        'physicians/:id': 'physicianDetail'
    },

    home: function() {
        console.log('home route');
        //var searchView = new SearchView({ el: '#findYourDo' });
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
