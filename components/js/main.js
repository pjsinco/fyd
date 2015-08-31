var Backbone = require('backbone'),
    $ = require('jquery'),
    Location = require('models/location'),
    LocationView = require('views/location');

Backbone.$ = $;

module.exports = {

    location: Location,
    LocationView: LocationView

};
