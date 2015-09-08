var Backbone = require('backbone');
var PhysicianSimpleView = require('views/physician-simple');

var Workspace = Backbone.Router.extend({

    routes: {
    
        'help': 'help',
        'physicians/:id': 'getPhysicianById'
    },

    help: function() {
        alert('help route called');
    },

    getPhysicianById: function(id) {
        console.log('physicians/:id route called');
        console.log(id);
        new PhysicianSimpleView(id);
    }
    
    
    
});

module.exports = Workspace;
