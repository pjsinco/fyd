var Backbone = require('backbone'),
    $ = require('jquery'),
    Location = require('models/location'),
    SampleView = require('views/sample'),
    LocationView = require('views/location'),
    LocationFormView = require('views/location-form');

Backbone.$ = $;



module.exports = {

    location: Location,
    LocationView: LocationView,
    LocationFormView: LocationFormView,
    SampleView: SampleView

};
