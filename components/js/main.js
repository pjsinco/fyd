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
var ResultsMeta = require('models/results-meta');

/**
 * Views
 *
 */
var PhysicianListItemView = require('views/physician');
var SpecialtyFormView = require('views/specialty-form');
var LocationFormView = require('views/location-form');
var SearchFormView = require('views/search');
var PhysicianDetailView = require('views/physician-detail');

/**
 * Collections
 *
 */
var PhysicianList = require('collections/physician-list');

/**
 * Router
 *
 */
var HomeRouter = require('routers/home-router');
var ResultsRouter = require('routers/results-router');


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

    var whereWeAre = window.location.pathname;

    if (whereWeAre.indexOf('results') > 0) {
        var app = new ResultsRouter({
            queryString: window.location.search
        });
    } else {
        var app = new HomeRouter();
    }

    Backbone.history.start({
        //root: '/results/',
        //pushState: true
    });
});



module.exports = {

    Physician: Physician,
    Specialty: Specialty,
    Location: Location,
    Search: Search,
    PhysicianListItemView: PhysicianListItemView,
    PhysicianDetailView: PhysicianDetailView,
    LocationFormView: LocationFormView,
    SearchFormView: SearchFormView,
    PhysicianList: PhysicianList,
    HomeRouter: HomeRouter,
    ResultsRouter: ResultsRouter,
    UserLocation: UserLocation,
    _: _
    //FindADoApp: FindADoApp

};
