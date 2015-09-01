var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    typeahead = require('typeahead.0.10.5');

var LocationView = Backbone.View.extend({

    el: $('#location'),
    
    hiya: function() {
        console.log('hiyafunction');
    },

    render: function() {

        // render this view in the hidden location inputs?

    },

    initialize: function() {
        console.log('new view');
    }

});


module.exports = LocationView;
