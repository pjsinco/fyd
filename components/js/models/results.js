var Backbone = require('backbone');
var ResultsMeta = require('models/results-meta');
var ResultsMetaView = require('views/results-meta');
var PhysicianListView = require('views/physician-list');
var SearchForm = require('models/search-form');
var Specialty = require('models/specialty');

var Results = Backbone.Model.extend({

    initialize: function (options) {

        this.router = options.router;

        this.resultsMeta = options.resultsMeta;
        this.resultsMetaView = new ResultsMetaView({
            model: this.resultsMeta
        });

        this.physicianList = options.physicianList;
        this.physicianListView = new PhysicianListView({
            collection: this.physicianList
        });

        this.userLocation = options.userLocation;

        this.searchForm = new SearchForm({
            userLocation: this.userLocation,
            specialty: new Specialty({
                full: this.resultsMeta.get('specialty'),
                code: this.resultsMeta.get('code')
            })
        });

        this.physicianListView.render();
    }

});

module.exports = Results;

