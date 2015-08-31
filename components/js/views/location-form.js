var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var LocationForm = Backbone.View.extend({

    el: $('#location'),

    autocomplete: function() {

        var stateList = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];

        var states = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('val'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: _.map(stateList, function(state) { 
                return { val: state };
            })
        });

        states.initialize();
    
        this.$el.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            displayKey: 'val',
            source: states.ttAdapter()
        });

        this.$el.on('typeahead:opened', function() {
            console.log('opened autocomplete');
        })
        
    },

    render: function() {
        this.autocomplete();
    }

});

module.exports = LocationForm;
