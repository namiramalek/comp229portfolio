let mongoose = require('mongoose');

// create a model class
let businesscontactModel  = mongoose.Schema({
    Contact_name: String,
    Contact_number: String,
    Email: String
   
},
{
        collection: "business_contact"
});

module.exports = mongoose.model('Business_contact',  businesscontactModel );