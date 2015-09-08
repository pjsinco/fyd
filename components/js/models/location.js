var Backbone = require('backbone');

var Location = Backbone.Model.extend({

    urlRoot: 'http://lookup.dev/api/v1/locations',

    defaults: {
        city: undefined,
        state: undefined, 
        zip: undefined,
        lat: undefined,
        lon: undefined
    },

    initialize: function(attributes, options) {
        if (options && options.url) {
            this.urlRoot = options.url;
        }
    },

    parse: function(response) {
        return response.data;
    }

    // http://stackoverflow.com/questions/18383205/
    //     backbone-js-with-a-custom-fetch-url
    //  getRandom: function(options) {
    //      options = options || {};
    //  
    //      if (options.url === undefined) {
    //          //options.url = this.urlRoot + '/random';
    //          options.url = this.urlRoot;
    //      }
    //
    //      return Backbone.Model.prototype.fetch.call(this, options);
    //  },


});

module.exports = Location;
