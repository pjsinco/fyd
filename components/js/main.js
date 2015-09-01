var Backbone = require('backbone'),
    $ = require('jquery'),
    Location = require('models/location'),
    SampleView = require('views/sample'),
    LocationView = require('views/location'),
    SpecialtyView = require('views/specialty'),
    LocationFormView = require('views/location-form');

Backbone.$ = $;



module.exports = {

    location: Location,
    LocationView: LocationView,
    SpecialtyView: SpecialtyView,
    LocationFormView: LocationFormView,
    SampleView: SampleView

};
