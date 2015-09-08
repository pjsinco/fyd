var Backbone = require('backbone');

var Search = Backbone.Model.extend({
    
    locationModel: undefined,

    initialize: function () {
        this.listenTo(this.locationModel, 'change', 'From inside Search model, heard a change to Location model');
    }

});

module.exports = Search;

