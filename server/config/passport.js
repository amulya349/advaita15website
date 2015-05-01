var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var sendgrid  = require('sendgrid')('userid', 'password');

// load up the user model
var User       = require('../app/models/user');

//list of events
events = ['botsumo', 'pathseeker', 'simulab', 'hydrocket',
'dirtrushgt', 'cannonbot', 'googlebuster', 'blueprint', 'switchcoding', 'seo',
'hackathon','technova', 'photoshopwars', 'rockathon', 'accoustica', 'footloose', 'picasso',
'lamode','bollyquiz','paperpresentation', 'futsal', 'supersix', 'bplan', 'acropolis', 'cosmosurf', 'starwarz', 'interroger'];

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        console.log("Local Strategy");
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // create the user
                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.fname = req.body.fname;
                        newUser.local.lname = req.body.lname;
                        newUser.local.college = req.body.college;
                        newUser.local.year = req.body.year;
                        newUser.local.degree = req.body.degree;
                        newUser.local.city = req.body.city;
                        newUser.local.mobile = req.body.mobile;
                        newUser.timeStamp = (new Date()).toString();
                        for(var k in events) {
                            eval('newUser.events.'+events[k]+' = false');
                        }
                        newUser.local.verify = false;
                        newUser.save(function(err) {
                            if (err){
                                console.log("Error in local-signup db.save()\n"); 
                                return done(err);
                            }
                            console.log("New Local User Created !\n");
                            sendEmail(newUser);
                            return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.local.email ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.local.fname = req.body.fname;
                        user.local.lname = req.body.lname;
                        user.local.college = req.body.college;
                        user.local.year = req.body.year;
                        user.local.degree = req.body.degree;
                        user.local.city = req.body.city;
                        user.local.mobile = req.body.mobile;
                        user.local.verify = false;
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            sendEmail(user);
                            return done(null,user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            console.log("Facebook Strategy");
            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.timeStamp = (new Date()).toString();
                        for(var k in events) {
                            eval('newUser.events.'+events[k]+' = false');
                        }
                        
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            console.log("New Facebook User created ! \n")
                            //sendEmail(newUser);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }
        });

    }));

    
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email
                            user.google.picture = profile._json.picture;
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email
                        newUser.google.picture = profile._json.picture;
                        newUser.timeStamp = (new Date()).toString();
                        for(var k in events) {
                            eval('newUser.events.'+events[k]+' = false');
                        }
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            console.log("New Google User Created !\n");
                            //sendEmail(newUser);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user          = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email
                user.google.picture = profile._json.picture;
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

    function sendEmail(user){
        
        var userName = user.local.fname || user.facebook.name || user.google.name;
        var email = user.local.email || user.google.email || user.facebook.email ;
        // var verifyLink = 'http://advaita.iiit-bh.ac.in/user/verification/authcallback/node/' + user._id +'/SUlJVFJvY2tz';
        var verifyLink = 'http://advaita.iiit-bh.ac.in/user/verifyuser/callback/bm90WW91ck1vdGhlcnNIVE1M/'+ user._id + '/aUxvdmVOb2Rl';
        //console.log(verifyLink);
        //var htmlload = '<html><head><title></title> <style type="text/css"> @import url(http://fonts.googleapis.com/css?family=Roboto:400,300);/**{*//* box-sizing: border-box;*//*}*//*html, body{*//* margin: 0;*//* padding: 0;*//* width: 100%;*//* height: 100%;*//*}*/body{font-family: \'Roboto\', sans-serif; background-color: #efefef;}#navWrapper{display: block; position: absolute; top: 10em; left: calc(100% - 12em); width: 60px; height: 60px; z-index: 999; background-color: #fff; border-radius: 50%; box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.2);}#navWrapper img{position: relative; top: 5px; left: 6px; padding: 7px; max-width: 90%; z-index: 800; -webkit-transform: scale(1.5); -moz-transform: scale(1.5); -ms-transform: scale(1.5); -o-transform: scale(1.5); transform: scale(1.5);}#navWrapper:hover{cursor: pointer;}#navWrapper:hover > nav{padding-top: 3.1em; opacity: 1;}header{display: block; position: absolute; top: 0; left: 0; width: 100%; height: 13em; text-align: center; background: url(http://s5.postimg.org/a2e2fy1bb/abc.jpg); box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 8px 17px 0 rgba(0, 0, 0, 0.2);}header p{font-weight: bold; font-size: 1.2em; font-variant: small-caps; text-shadow: 2px 2px 5px #00796B;}header span{display: block; padding-top: 1em; line-height: 22.3px; color: #fff; text-shadow: 2px 2px 5px #00796B; font-size: 2.2em;}#mainWrapper{display: block; position: relative; top: 7.5em; margin: 0 auto; width: 70%; height: 1%; min-height: 100% !important; color: #1e1e1e; font-family: sans-serif; font-size: 16px; font-weight: 400;}.frame{display: block; position: relative; margin-bottom: 20px; padding: 10px; box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 8px 17px 0 rgba(0, 0, 0, 0.2); background-color: #fff;}.frame h2{margin: 0; font-weight: normal; font-variant: small-caps; padding-top: 18px; height: 60px; vertical-align: center; background: #B3E5FC; width: 100%; text-align: center;}.frame p{font-size: 16px; line-height: 25.6px; color: #263238; width: 100%; text-align: center; min-height: 500px;}</style></head><body><p><%body%></p><div id="navWrapper"><a href="http://advaita.iiit-bh.ac.in" target="_blank"><img alt="" src="http://s5.postimg.org/kvgzapt7n/ic_launcher.png"/></a></div><header><span>ADVAITA</span><p style="color:#fff;">Where Imagination meets Reality</p></header><div id="mainWrapper"><section class="frame"><h2>Hello Peeps !!</h2><p>There seems to be a slight glitch in the system (Sorry for that).<br/>You have to register with your college details to proceed.</p></section></div><p>&nbsp;</p></body></html>';
        var payload   = {
          to      : email,
          from    : 'confirm@advaita.iiit-bh.ac.in',
          subject : 'Hi '+userName,
          text    : 'Hi, You have sucessfully registered for Advaita 2015. Stay tuned for fun and entertaiment.\nPlease confirm your registration and set a new password by clicking the following link: \n'+ verifyLink + '\n\nSee you during Advaita...\n\nTeam Advaita '
          //html : htmlload
        }
        
        sendgrid.send(payload, function(err, json) {
          if (err) { console.error(err); }
          console.log('Email sent to : '+email);
        });
    }

};