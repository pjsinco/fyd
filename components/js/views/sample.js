var Backbone = require('backbone'),
    $ = require('jquery');

var SampleView = Backbone.View.extend({

    //el: '.sample',
    el: $('.sample'),
    render: function() {

        this.$el.text('hiyajq');

    }


});



module.exports = SampleView;
