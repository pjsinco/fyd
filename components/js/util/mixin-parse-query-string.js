var _ = require('underscore');

/**
 * Convert a query string into an object with properties
 * representing each entity in the query.
 *
 * https://gist.github.com/ryoppy/5780748
 *
 * ?a=b&c=d to {a: b, c: d}
 *
 * @param {String} (option) queryString
 * @return {Object} query params
 */
var ParseQueryString = {
    getQueryParams: function(queryString) {

        if (!queryString) {
            return false;
        }

        return _
            .chain(queryString.split('&'))
            .map(function(params) {
                var p = params.split('=');
                return [p[0], decodeURIComponent(p[1])];
            }) 
            .object()
            .value();
    }
}

module.exports = ParseQueryString;
