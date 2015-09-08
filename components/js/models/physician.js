var Backbone = require('backbone');

var Physician = Backbone.Model.extend({

    url: function() {
        return 'http://lookup.dev/api/v1/physicians/' + this.id;
    },

    initialize: function () {

    },

    parse: function (response) {
        return response.data;
    }

});

module.exports = Physician;

