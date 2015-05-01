// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '', // your App ID
        'clientSecret'  : '', // your App Secret
        'callbackURL'   : 'http://advaita.iiit-bh.ac.in/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '',
        'clientSecret'  : '',
        'callbackURL'   : 'http://advaita.iiit-bh.ac.in/auth/google/callback'
    }

};
