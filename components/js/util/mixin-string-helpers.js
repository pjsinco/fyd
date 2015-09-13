var _ = require('backbone');

var QueryStringHelpers = {

    /**
     * Trim the "?" at the beginning of a query string.
     * The query string is then suitable for serializing.
     *
     * @param {String} 
     * @return {String}
     */
    trimLeadingQuestionMark: function (queryString) {
        if (!queryString) {
            return false;
        }

        if (queryString.indexOf('?') == 0) {
            return queryString.substr(1);
        }
    },

    /**
     * Convert a query string into an object with properties
     * representing each entity in the query.
     *
     * https://gist.github.com/ryoppy/5780748
     *
     * ?a=b&c=d to {a: b, c: d}
     *
     * @param {String} queryString
     * @return {Object} query params
     */
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

module.exports = QueryStringHelpers;
