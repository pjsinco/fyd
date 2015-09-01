var Backbone = require('backbone'),
    $ = require('jquery'),
    Location = require('models/location'),
    SampleView = require('views/sample'),
    LocationView = require('views/location'),
    SpecialtyView = require('views/specialty'),
    LocationFormView = require('views/location-form');

Backbone.$ = $;

$(function () {

    var location = new Location();

    var locationFormView = new LocationFormView({ model: location });
    locationFormView.render();

    var specialtyView = new SpecialtyView();
    specialtyView.render();
});



module.exports = {

    location: Location,
    LocationView: LocationView,
    SpecialtyView: SpecialtyView,
    LocationFormView: LocationFormView,
    SampleView: SampleView

};
