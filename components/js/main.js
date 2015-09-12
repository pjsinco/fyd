'use strict'

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

Backbone.$ = $;

/**
 * Models
 *
 */
var Physician = require('models/physician');
var Specialty = require('models/specialty');
var Location = require('models/location');
var Search = require('models/search');
var UserLocation = require('models/user-location');

/**
 * Views
 *
 */
var PhysicianListItemView = require('views/physician');
var SpecialtyFormView = require('views/specialty-form');
var LocationFormView = require('views/location-form');
var SearchFormView = require('views/search');

/**
 * Collections
 *
 */
var PhysicianList = require('collections/physician-list');

/**
 * Router
 *
 */
var AppRouter = require('./router.js');


//var FindADoApp = new Backbone.Router.extend({
//
//    routes: {
//        '': 'index',
//        '/physicians': 'physicianIndex',
//        '/physicians/:id': 'physicianDetail'
//    },
//
//    physicianIndex: function() {
//        console.log();
//    },
//
//    physicianDetail: function(id) {
//        var physician = new Physician({ id: id });
//        physician.fetch({
//            success: function() {
//                var physicianView = new PhysicianView({ model: physician });
//                physicianView.render();
//                $('body').html(physicianView.el);
//            }
//        });
//    },
//
//    index: function() {
//        var searchView = new SearchView({ el: '#findYourDo' });
//    },
//
//    initialize: function() {
//    },
//
//    start: function() {
//        Backbone.history.start();
//    }
//
//});


$(function () {
    var app = new AppRouter();
    app.start({
        //root: '/results/'
    });
});



module.exports = {

    Physician: Physician,
    Specialty: Specialty,
    Location: Location,
    Search: Search,
    PhysicianListItemView: PhysicianListItemView,
    LocationFormView: LocationFormView,
    SearchFormView: SearchFormView,
    PhysicianList: PhysicianList,
    AppRouter: AppRouter,
    UserLocation: UserLocation,
    _: _
    //FindADoApp: FindADoApp

};
