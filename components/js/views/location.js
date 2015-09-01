var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    typeahead = require('typeahead.0.10.5');

var LocationView = Backbone.View.extend({

    el: $('#location'),
    
    autocomplete: function() {

        var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];

        var numbers = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('val'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: _.map(states, function(d) { 
                return { val: d };
            })
        });

        // initialize the bloodhound suggestion engine
        numbers.initialize();
        
        // instantiate the typeahead UI
        this.$el.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
          displayKey: 'val',
          source: numbers.ttAdapter()
        });


        this.$el.on('typeahead:opened', function() {
            console.log('opentpyeahead');
        });

    },

    hiya: function() {
        console.log('hiyafunction');
    },

    render: function() {
        this.autocomplete();
    },

    initialize: function() {
        console.log('new view');
    }

});


module.exports = LocationView;
