var Backbone = require('backbone'),
    $ = require('jquery'),
    SearchForm = require('views/search-form');

// TODO delete - for debugging only
var Location = require('models/location'),
    SampleView = require('views/sample'),
    LocationView = require('views/location'),
    SpecialtyView = require('views/specialty');
    LocationFormView = require('views/location-form');

Backbone.$ = $;

$(function () {

    var searchForm = new SearchForm({ el: '#findYourDo' });
    searchForm.render();

});



module.exports = {

    location: Location,
    LocationView: LocationView,
    SpecialtyView: SpecialtyView,
    LocationFormView: LocationFormView,
    SampleView: SampleView,
    SearchForm: SearchForm

};
