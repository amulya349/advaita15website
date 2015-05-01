// app/routes.js
module.exports = function (app, passport) {
var express  = require('express');
var path = require('path');
var User = require('./models/user.js');
var Seo = require('./models/seo.js');
var Feed = require('./models/feed.js');
var Blue = require('./models/blueprint.js');
var sendgrid  = require('sendgrid')('userid', 'password');
app.use(express.static(path.join(__dirname, '../')));
// =====================================
// HOME PAGE (with login links) ========
// =====================================
app.get('/', function(req, res) {
//res.render('index.ejs'); // load the index.ejs file
res.sendFile(path.join(__dirname, '../../resource/views', 'sitedown.html'));
});
//Testing POLYMER here !!!
app.get('/advaita', function(req, res) {
//res.render('index.ejs'); // load the index.ejs file
res.sendFile(path.join(__dirname, '../../resource/views', 'build.html'));
});
// End of Polymer serve

// =====================================
// LOGIN ===============================
// =====================================

app.post('/loginAjax', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { 
        res.redirect('/advaita');
        return;
    }
    if (!user) {    
        res.status(200).send('false');
        return; 
    }
    req.logIn(user, function(err) {
        if (err) { return next(err); }
        //If successfull, below will run;
        var data = req.user;
        data.__v = undefined;
        data.local.password = undefined;
        data.facebook.token = undefined;
        data.google.id = undefined;
        data.google.token = undefined;
        data.timeStamp = undefined;
        res.status(200).json(data);
    });
  })(req, res, next);
});

app.get('/loginCheck', loggedCheck, function(req, res) {
    var data = req.user;
    data.__v = undefined;
    data.local.password = undefined;
    data.facebook.token = undefined;
    data.google.token = undefined;
    data.google.id = undefined;
    data.timeStamp = undefined;
    //console.log(data);
    res.json(data);
})

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form

// process the signup form
app.post('/signup', 
    passport.authenticate('local-signup'),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
        console.log(req.flash);

        var data = req.user;
        data.__v = undefined;
        data.local.password = undefined;
        data.facebook.token = undefined;
        data.google.id = undefined;
        data.google.token = undefined;
        data.timeStamp = undefined;
        //console.log(req.user);
        res.status(200).json(data);
        console.log("New Local signup..");
        //res.redirect('/');
    }
);
// =====================================
// PROFILE SECTION =====================
// =====================================

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/advaita');
    }
);
// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// the callback after google has authenticated the user
app.get('/auth/google/callback',
    passport.authenticate('google'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/advaita');
    }
);
// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

app.post('/connect/local', 
    passport.authenticate('local-signup'),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
        if(!req.user)
            res.status(404).end;
        var data = req.user;
        data.__v = undefined;
        data.local.password = undefined;
        data.facebook.token = undefined;
        data.facebook.Name = undefined;
        data.google = undefined;
        data.timeStamp = undefined;
        //res.redirect('/');
        res.status(200).json(data);
        console.log("New Local signup..");
    } 
);
// facebook -------------------------------
// send to facebook to do the authentication
app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
// handle the callback after facebook has authorized the user
app.get('/connect/facebook/callback',
    passport.authorize('facebook'),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
        var data = req.user;
        data.__v = undefined;
        data.local.password = undefined;
        data.facebook.token = undefined;
        data.facebook.email = undefined;
        data.google.token = undefined;
        data.timeStamp = undefined;
        //console.log(req.user);
        //res.status(200).json(data);
        res.redirect('/advaita');
    }
);


    // google ---------------------------------
    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google'),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            var data = req.user;
            data.__v = undefined;
            data.local.password = undefined;
            data.facebook.token = undefined;
            data.google.id = undefined;
            data.google.token = undefined;
            data.timeStamp = undefined;
            //res.status(200).json(data);
            res.redirect('/advaita');
        } 
    );

    // =====================================
    // AJAX ROUTES =========================
    // =====================================
    app.put('/ajax/events/:user_id', isLoggedIn, function(req, res){
        User.findById(req.params.user_id, function(err, user) {
                if (err)
                    res.send(err);
                eval('user.events.'+req.body.name+'='+req.body.val)
                user.save(function(err1){
                    if(err1)
                        res.send(err1);
                    res.send(200);
                })   
            });
    })

    //Email verification confirmation
    app.get('/user/verification/authcallback/node/:user_id/SUlJVFJvY2tz', function(req, res){
        User.findById(req.params.user_id, function(err, user) {
                if (err)
                    res.send(err);
                if(user.local.verify == false){
                    user.local.verify = true;

                    user.save(function(err1){
                        if(err1)
                            res.send(err1);
                        res.send("Cool.. Now, I trust you are a legit person. Enjoy buddy... You can close this window... ");
                    }) 
                }
                else {
                    res.send("You have already verified with me.");
                }
            });
    })
    //Email verification get route, which will be sent by email
    // app.get('/user/verification/authcallback/node/:user_id/SUlJVFJvY2tz', function(req, res){
    //     res.sendFile(path.join(__dirname, '../views', 'passwordreset.html'));
    // })
    

    //Registration after callback from facebook or google.
    app.get('/register', isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, '../../resource/views', 'registration.html'));
    })
    //Password Reset PUT
    app.put('/user/verifyuser/callback/bm90WW91ck1vdGhlcnNIVE1M/:user_id/aUxvdmVOb2Rl', function(req, res){
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.local.password = user.generateHash(req.body.password);
            if(user.local.verify == false)
                    user.local.verify = true;
            
            user.save(function(err1){
                if(err1)
                    res.send(err1);
                res.json({message:"You password is successfully Changed... You can close this window... "});
                //res.status(200);
            })                 
        });
    });

    //Password Reset GET
    app.get('/user/verifyuser/callback/bm90WW91ck1vdGhlcnNIVE1M/:user_id/aUxvdmVOb2Rl', function(req, res){
        res.sendFile(path.join(__dirname, '../../resource/views', 'password.html'));
    })

    //Password reset email sending route
    app.post('/pwdreset', function(req, res) {
        var email = req.body.email;
        email = email.toLowerCase();
        User.findOne({'local.email' : email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                res.status(500).end();

            // check to see if theres already a user with that email
            if (user) {
                passResetMail(email);
            }
            else {
                res.status(200).json({message: "Email not registered..."});
            }
        })
        
    })

    //RESEND verification email by entering email address
    app.post('/sendemail', function(req, res) {
        var email = req.body.email.toLowerCase();
        User.findOne({'local.email' : email} , function(err, user) {
            if(err)
                res.status(500).end();
            if(user) {
                verifyEmail(email);
                res.status(200).json({message: "Email sent successfully..."});
            }
            else {
                res.status(200).json({message: "Email not registered..."});
            }
        })

    })

    // =====================================
    // SEO Route ===========================
    // =====================================
    app.post('/log/seolink', function(req, res) {
        var data = new Seo();
        data.url = req.body.url;
        data.userId = req.body.userid;
        data.timeStamp = (new Date()).toString();
        console.log(data);
        
        Seo.findOne({$or: [{'userId' : req.body.userid }, {'url' : req.body.url}]}, function(err, seo) {
            // if there are any errors, return the error
            if (err)
                res.status(500).end();

            // check to see if theres already a user with that email
            if (seo) {
                // res.status(200).json({message:"Each user can have one unique blog only!"});
                if(seo.userId ==  req.body.userid){
                res.status(200).json({message:"Each user can have one unique blog only!"});

                }
                else{
                res.status(200).json({message:"Oops ! This Blog has already been registered with us"});

                }
            }
            else {
                data.save(function(err) {
                    if(err)
                        console.log("error happend!");
                    res.status(200).json({message: "Successfully registered"});
                })
            }
        })
    })


    // =====================================
    // LIVE FEEDS ==========================
    // =====================================
    app.get('/live/feed', function(req, res) {
        Feed.find().sort({timeStamp: -1}).limit(10).exec(
            function(err, feed) {
                if(err)
                    res.status(200).json({message: 'error'});
                if(feed) {
                    res.status(200).jsong(feed);
                }
                else {
                    res.status(404);
                }
            }
        )
    })

    app.post('/live/feed/post', function(req, res) {
        var feedData = new Feed();
        feedData.timeStamp = (new Date()).toString();
        feedData.data = req.body.data;
        feedData.save(function(err) {
            if(err)
                console.log("error happend!");
            res.status(200).json({message: "Success !!"});
        })
    })


    app.get('/event/blueprint', function(req, res) {
        res.sendFile(path.join(__dirname, '../../resource/views', 'Programs.html'));

    })

    app.post('/event/blueprintdata', function(req, res) {
        var blue = new Blue();
        blue.timeStamp = (new Date()).toString();
        blue.code = req.body.code;
        blue.userId = req.body.userid;
        blue.lang = req.body.lang;
        blue.prog = req.body.program;
        blue.save(function(err) {
            if(err)
                console.log("error happened!");
            res.status(200).json({message: "Success !!"});
        })
    })
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.status(200).redirect('/advaita');
    });

    
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/advaita');
}

function loggedCheck(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.send(401);
}

function passResetMail(req, res) {
    var resetLink = 'http://advaita.iiit-bh.ac.in/user/password/reset/bm90WW91ck1vdGhlcnNIVE1M/' + user._id +'/aUxvdmVOb2Rl';
    var payload   = {
      to      : req.body.email,
      from    : 'password@advaita.iiit-bh.ac.in',
      subject : 'Password reset for Advaita',
      text    : 'Its sad that you forgot your password. Dont worry, we have a backup plan. Click on the following link to reset the password: \n'+ verifyLink + '\n\nSee you during Advaita...\n\nTeam Advaita '
    }
    
    sendgrid.send(payload, function(err, json) {
      if (err) { console.error(err); }
      console.log('Email sent to : '+email);
      res.status(200).json({message: "Password reset mail sent to above email address..."});
    });
}

function verifyEmail(email){
    // var userName = user.local.fname || user.facebook.name || user.google.name;
    //var email = user.local.email || user.google.email || user.facebook.email ;
    var verifyLink = 'http://advaita.iiit-bh.ac.in/user/verification/authcallback/node/' + user._id +'/SUlJVFJvY2tz';
    console.log(verifyLink);
    var payload   = {
      to      : email,
      from    : 'confirm@advaita.iiit-bh.ac.in',
      subject : 'Hi '+userName,
      text    : 'Hi, You have sucessfully registered for Advaita 2015. Stay tuned for fun and entertaiment.\nPlease confirm your registration by clicking the following link: \n'+ verifyLink + '\n\nSee you during Advaita...\n\nTeam Advaita '
    }
    
    sendgrid.send(payload, function(err, json) {
      if (err) { console.error(err); }
      console.log('Email sent to : '+email);
    });
}