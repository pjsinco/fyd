'use strict'

var Backbone = require('backbone'),
    $ = require('jquery'),
    SearchForm = require('views/search-form');

// TODO delete - for debugging only
var Location = require('models/location'),
    SampleView = require('views/sample'),
    LocationView = require('views/location'),
    SpecialtyView = require('views/specialty'),
    Workspace = require('./router.js'),
    Physician = require('models/physician'),
    PhysicianListItemView = require('views/physician'),
    PhysicianList = require('collections/physician-list'),
    LocationFormView = require('views/location-form');
    

Backbone.$ = $;

$(function () {

    var searchForm = new SearchForm({ el: '#findYourDo' });
    //searchForm.render();
    
    var router = new Workspace();
    Backbone.history.start({

    });

});



module.exports = {

    Location: Location,
    LocationView: LocationView,
    SpecialtyView: SpecialtyView,
    LocationFormView: LocationFormView,
    SampleView: SampleView,
    Workspace: Workspace,
    SearchForm: SearchForm,
    Physician: Physician,
    PhysicianListItemView: PhysicianListItemView,
    PhysicianList: PhysicianList

};
