var Backbone = require('backbone');

var Physician = Backbone.Model.extend({

    // when we fetch outside a collection
    urlRoot: 'http://lookup.dev/api/v1/physicians',

    // when we fetch inside a collection
    url: 'http://lookup.dev/api/v1/physicians/search',

    initialize: function () {

    },

    parse: function (response) {
        return response.data;
    }

});

module.exports = Physician;

