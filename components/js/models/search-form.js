var Backbone = require('backbone');
var _ = require('underscore');
var SearchFormView = require('views/search');
var Location = require('models/location');
var Specialty = require('models/specialty');

var SearchForm = Backbone.Model.extend({

    /**
     * Models
     *
     */
    searchLocation: undefined, // model; not persisted
    userLocation: undefined,   // model; persisted in localstorage
    specialty: undefined,      // model; TODO make it
    searchFormView: undefined, // view; backed by this model

    initialize: function (options) {
        this.userLocation = options.userLocation;
        options.userLocation.unset('id');
        this.searchLocation = new Location(_.clone(this.userLocation.attributes));
        this.specialty = new Specialty();
        this.searchFormView = new SearchFormView({ 
            model: this ,
            el: '#findYourDo'
        });

        this.listenTo(this, 'all', this.reportEvent);
        this.listenTo(this.searchLocation, 'change', this.updateLocations);
        this.listenTo(this.specialty, 'change', this.updateSpecialty);
    },

    updateSpecialty: function (model, options) {
 console.log('way up in SearchForm model, heard change to specialty');
    },

    /**
     * Update the UserLocation and SearchLocation models.
     *
     */
    updateLocations: function(model, options) {
debugger;
        var attributes = _.clone(model.attributes);

        if (model.isEmpty()) {
            this.userLocation.clearLocation();
        } else {
            this.userLocation.updateLocation(_.extend({ id: 1 }, attributes));
        }

        this.searchLocation.set(attributes);
    },


    reportEvent: function (eventName) {
        console.log(eventName + ' event on SearchForm model');
    },

});

//_.extend(SearchForm.prototype, IsEmptyMixin);

module.exports = SearchForm;

