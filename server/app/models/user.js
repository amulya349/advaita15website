// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        fname : String,
        lname : String,
        college : String,
        year: String, 
        degree: String, 
        city: String, 
        mobile: String,
        verify : Boolean
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        picture      : String
    },
    events             : {
        botsumo : Boolean, 
        pathseeker : Boolean,
        simulab : Boolean,
        hydrocket : Boolean,
        dirtrushgt : Boolean,
        cannonbot : Boolean,
        googlebuster : Boolean,
        blueprint : Boolean,
        switchcoding : Boolean,
        seo : Boolean,
        hackathon : Boolean,
        paperpresentation: Boolean,
        technova : Boolean,
        photoshopwars : Boolean,     
        rockathon : Boolean,
        accoustica : Boolean,
        footloose : Boolean,
        picasso : Boolean,
        lamode : Boolean,
        bollyquiz : Boolean,
        futsal: Boolean,
        supersix: Boolean,
        bplan: Boolean,
        acropolis: Boolean,
        cosmosurf: Boolean,
        starwarz: Boolean,
        interroger: Boolean
    },
    timeStamp: String

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
