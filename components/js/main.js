var Backbone = require('backbone'),
    $ = require('jquery'),
    Location = require('models/location'),
    SampleView = require('views/sample');
    LocationView = require('views/location');

Backbone.$ = $;



module.exports = {

    location: Location,
    LocationView: LocationView,
    SampleView: SampleView

};
