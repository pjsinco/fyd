'use strict'

var Backbone = require('backbone');
var $ = require('jquery');


/**
 * Models
 *
 */
var Physician = require('models/physician');
var Specialty = require('models/specialty');
var Location = require('models/location');
var Search = require('models/search');

/**
 * Views
 *
 */
var PhysicianListItemView = require('views/physician');
var SpecialtyFormView = require('views/specialty-form');
var LocationFormView = require('views/location-form');
var SearchView = require('views/search');

/**
 * Collections
 *
 */
var PhysicianList = require('collections/physician-list');

/**
 * Router
 *
 */
var Workspace = require('./router.js');

Backbone.$ = $;

$(function () {

    var searchLocation = new Location();

    var search = new Search({ 
        locationModel: searchLocation
    });

    var searchView = new SearchView({ el: '#findYourDo' });
    
    var router = new Workspace();
    Backbone.history.start({

    });

});



module.exports = {

    Physician: Physician,
    Specialty: Specialty,
    Location: Location,
    Search: Search,
    PhysicianListItemView: PhysicianListItemView,
    LocationFormView: LocationFormView,
    SearchView: SearchView,
    PhysicianList: PhysicianList,
    Workspace: Workspace

};
