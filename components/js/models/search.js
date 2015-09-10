var Backbone = require('backbone');
var SearchView = require('views/search');

var Search = Backbone.Model.extend({
    
    locationModel: undefined,

    initialize: function (options) {
debugger;
        this.searchView = new SearchView({ el: '#findYourDo' });
        this.listenTo(this.locationModel, 'change', 'From inside Search model, heard a change to Location model');
    }

});

module.exports = Search;

