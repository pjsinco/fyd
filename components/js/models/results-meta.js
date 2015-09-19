var Backbone = require('backbone');

var ResultsMeta = Backbone.Model.extend({

    defaults: {
        city: undefined,
        state: undefined,
        zip: undefined,
        specialty: undefined,
        count: undefined,
        who: undefined,
    },

    initialize: function (attributes) {
        if (attributes !== undefined) {
            this.setWho(attributes.count);
        }
    },

    /**
     * Determines whether "DO[s]" should be plural or singular.
     *
     */
    setWho: function(count) {
        var who = 'DO';
        if (count === 0 || count > 1) {
            who += 's';
        } 
        this.set('who', who);
    }


});

module.exports = ResultsMeta;


