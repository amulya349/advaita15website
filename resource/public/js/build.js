// 'use strict';
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-57358904-2', 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');


// window.addEventListener('polymer-ready', function(e) {
//       Polymer();
//     });
//Polymer();

function init() {
var colors = ['00BCD4', 'E91E63', '9C27B0', '673AB7', '3F51B5', '2196F3',
'03A9F4', 'F44336', '009688', '4CAF50', '8BC34A',
'FF9800', 'ff4081','795548', 'FF5722', '00c853', '304ffe', 'c51162', 'b71c1c', '004d40',
 'aa00ff','2e7d32','00BCD4','9C27B0' , '009688','8BC34A','795548','ff4081','FF5722','4CAF50'];
  // Set a timeout...
  //console.log(colors[c]);
  // $('#core_toolbar1').css("background-color", "#"+colorSelect);
  //document.querySelector("#core_toolbar1").style.backgroundColor = '#'+colors[c];

  setTimeout(function(){
   $('.e_id').each(function(i){
  var c = Math.floor(Math.random()*colors.length);
    $(this).css("background-color",'#'+colors[c]);
  });
 },1000);

}

window.addEventListener('load', function(){
  
ch = document.body.clientHeight;
cw = document.body.clientWidth;
if(cw>640){
  window.scrollback = {"room":"advaita-15","titlebarColor":"#11827f","form":"toast","minimize":false};(function(d,s,h,e){e=d.createElement(s);e.async=1;e.src=(location.protocol === "https:" ? "https:" : "http:") + "//scrollback.io/client.min.js";d.getElementsByTagName(s)[0].parentNode.appendChild(e);}(document,"script"));
}


    // document.getElementsByClassName('e_id').style.backgroundColor = "#"+colors[item];
// }

 
});
//if user is logged through facebook , logged is true and clsbtn wont be clicked.
var logged = false;
var scope = document.querySelector('template[is="auto-binding"]');
scope.select=0;
scope.selector=0;
scope.iconSelect=false;

  localStorage.user = '';

function trigger(x){
  if(cw<440){
    $('#div1').css('display', 'none');
  }
  $('.tab').css('visibility', 'hidden');
  $('#paper_icon_button').removeAttr('core-drawer-toggle');
  var col = $('#trig'+x).css('background-color');
  $('#core_toolbar1').css('background-color', col);
  $('.shadow'+x).css('background-color', col)
  scope.pagetrans = x;
  scope.iconSelect=true;
  scope.eventname= $('#trig'+x).attr("eventname");
  scope.addE= scope.eventname;
  //console.log(scope.addE)
  var eventsmall = scope.addE.toLowerCase().replace(" ", "");
  var person = JSON.parse(localStorage.user);
   if(eval('person.events.'+eventsmall)) {
    scope.eventCalled = false;
  }
  else {
    scope.eventCalled = true;
  }
}

function trigger2(x){
  if(scope.transit == 0)
    {scope.transit = x;}
  else
    scope.transit = 0;
}

window.addEventListener("load",function() {

    loginCheck();
  // document.body.addEventListener('click', function(){
  //   document.querySelector('core-drawer-panel').togglePanel();
  // })
  $(document).keydown(function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      document.querySelector('core-drawer-panel').openDrawer();
    }
      else if(event.keyCode == 27){
        event.preventDefault();
       document.querySelector('core-drawer-panel').closeDrawer();

      }
    
  })

setTimeout( function(){
$('.loader').hide();

},5000);


  var query = window.location.search.substring(1);
  if(query == 'login'){
    logged = true;

  }
  if(localStorage.user == ''){
       $('.logout').hide();
       scope.eventCalled = true;
  }
  else{
       $('.logout').show();
  }
});
scope.woot = function(){
  var alerts = ['Hi there !', "Woot, Woot !", "Bazinga :p"];
  scope.alert = alerts[Math.floor(Math.random()*alerts.length)];
  document.querySelector('paper-toast').show();
}




scope.back = function(){
  $('#core_toolbar1').css('background-color','#03A9F4');
  this.lastSelected = this.$.pages.selected;
      // console.log(this.lastSelected);
  this.$.pages.selected = 0;
    scope.iconSelect = false;
      $('.tab').css('visibility', 'visible');
$('#div1').css('display','block');
scope.eventname="";
setTimeout(function(){
    $('#paper_icon_button').attr('core-drawer-toggle', 'true')

  }, 100)
}

scope.transend = function(){
  if(this.lastSelected)
    //console.log(this.lastSelected);
    this.lastSelected = null;
    scope.select =0;
}


function hideOverlay(){
  $('.overlay').addClass('hidden');
}
function showOverlay(){
  $('.overlay').removeClass('hidden')
  $('#username').val("");
  $('#password').val("");

}

function reg(){
  $('.loginContainer').css('display', 'none');
  $('.regContainer').css('display', 'block');
  $('backlogin').css('display', 'block');
}
function showLogin(){
  $('.regContainer').css('display', 'none');
  $('.loginContainer').css('display', 'block');
}
  // window.setInterval(function(){
  //   var online = navigator.onLine;
  // if(!online)
  //   scope.alert="Connection to Internet lost !";
  // document.querySelector('paper-toast').show();
  // }, 5000)

//Login error checking 
// function validate() {
//         var chk1 = document.getElementById('userid');
//         var chk2 = document.getElementById('pid');
//         var input1 = document.getElementById('username');
//         var input2 = document.getElementById('username');
//         chk1.isInvalid = !input1.validity.valid;
//         chk2.isInvalid = !input2.validity.valid;
//     }

// window.addEventListener('load', function(e) {
// for (scope.i = 0; scope.i < 33; scope.i++) {
//   $('<div>',{
//     'class':'spndiv',
//     'html':$('<img>',{
//       'src':'../public/img/sponsors/photo'+scope.i+'.jpg',
//           'class':'spn',
//       'alt':'image'
//     })

//   }).appendTo('.spncontent')
//   }
// }); 



// function init(){
// // Log to db, search the name and throw to the side panel
// }
          




function loginSubmit() {
    //console.log("Login CLicked!!")

  var lEmail = document.getElementById('username').value;
  var lPassword = document.getElementById('password').value;
  //console.log(lEmail);
  if(lEmail == '' || lPassword == ''){
    scope.alert = "Username or Password is incorrect !";
    document.querySelector('paper-toast').show();
    return;
  }
  $.post("/loginAjax",
  {
    email:lEmail,
    password:lPassword
  },
  function(data,status){
    if(status == 'success') {
      //console.log("After Logged in:\n ", data);
      if(data == 'false'){
        scope.alert = "Username or Password is incorrect !";
        document.querySelector('paper-toast').show();
        return;
      }
      
      $('#clsbtn').click();
      $('#paper_button').css('display', 'none');
      scope.alert = "Login Successful...";
        document.querySelector('paper-toast').show();
      loginCheck();

    }
  });
  //loginCheck();
  //location.reload();
}
function signUp() {
  //console.log("Register Clicked!!")
  var Semail = document.getElementById('email').value;
  // var Spassword = document.getElementById('passwd').value;
  // var Sconfirm = document.getElementById('confPasswd').value;
  var Sfname = document.getElementById('fname').value;
  var Slname = document.getElementById('lname').value;
  var Scollege = document.getElementById('college').value;
  var Syear = document.getElementById('year').value;
  var Sdegree = document.getElementById('degree').value;
  var Scity = document.getElementById('city').value;
  var Smobile = document.getElementById('mobile').value;
  
  if(Semail == '' || Slname == '' || Sfname == '' || Scollege == '' || Syear == '' || Sdegree == '' || Scity == '' || Smobile == ''){
    scope.alert = "All fields are mandatory ! ";
    document.querySelector('paper-toast').show();
    return;
  }
  // else if(Spassword.length <6){
  //   scope.alert = "Password must be minimum of six characters ! ";
  //   document.querySelector('paper-toast').show();
  //   return;
  // }
  // else if(Spassword != Sconfirm) {
  //   scope.alert = "Passwords do not match ! ";
  //   document.querySelector('paper-toast').show();
  //   return;
  // }
  // else if(('admin'.indexOf(Semail) == -1) || 'admin'.indexOf(Sfname) == -1 || 'admin'.indexOf(Scollege) == -1 || 'admin'.indexOf(Scollege) == -1) {
  //   scope.alert = "Invalid Values. Please enter correct values ! ";
  //   document.querySelector('paper-toast').show();
  //   return;
  // }
  var link = '';

  if(localStorage.user == '') {
    link = '/signup';
  }
  else {
    link = '/connect/local';
  }
    $.post(link,
    {
      email: Semail,
      password: 'iiit1234',
      fname: Sfname,
      lname: Slname,
      college: Scollege,
      year: Syear,
      degree: Sdegree, 
      city: Scity, 
      mobile: Smobile
    },
    function(data,status){
      
      if(status === 'success') {
      
        hideOverlay();
        $('#clsbtn').click();
        $('#paper_button').css('display', 'none');
        scope.alert = 'Registration Succesful. Please verify using verification email sent to you!';
        document.querySelector('paper-toast').show();
        //delay of 4 seconds to let the user read the message then reload.
        setTimeout(function() {
          location.reload();
        }, 4000)
      }
      else{
        hideOverlay();
        scope.alert = 'Failed to Register !';
        document.querySelector('paper-toast').show();
      }
    });
    
}

var loginCheck = function() {
  $.get("/loginCheck",function(data,status){
    if(status == 'success') {
      //alert('logged in');
      $('.logout').show();
      $('#paper_button').css('visibility', 'hidden');
      var person = JSON.stringify(data);
      localStorage.user = person ;     
      
      if(typeof data.local == 'undefined') {
        
        // logged = true; 
        //alert("local undefined");
        showOverlay();
        $("#regBtn").click();
        $('#clsbtn').css("visibility", "hidden");
        $('#backLogin').css("visibility", "hidden");
        document.getElementById('email').value = data.facebook.email || data.google.email;
        document.getElementById('email').readOnly = true;
        logged = true;
        scope.alert = "Please Register here to continue... ";
        document.querySelector('paper-toast').show();
      }
      else{
        //alert("local defined");
        
        hideOverlay();
        if(checkVerificationStatus(data) == false) {
          return;
        }
      }
      // if(logged == false){
      //   //$('#clsbtn').click();
      //   hideOverlay();
      //   //$('#paper_button').css('visibility', 'hidden');
      //   //console.log(1234)
      // }
      // else {
      //   $("#regBtn").click();
      //   // $('#clsbtn').css("visibility", "hidden");
      //   // $('#backLogin').css("visibility", "hidden");
      //   document.getElementById('email').value = data.facebook.email || data.google.email;
      //   logged = false;
      //   scope.alert = "Please Register here to continue... ";
      //   document.querySelector('paper-toast').show();
       
      
        
      // }
      
      if( typeof data.facebook != 'undefined' )
      { 
        scope.Uname= data.facebook.name;
        scope.image= "http://graph.facebook.com/"+data.facebook.id+"/picture?height=100&width=100" ; 
      } 
      else if( typeof data.google != 'undefined' )
      { 
        scope.Uname= data.google.name;
        scope.image= data.google.picture ; 
      } 
      else if( typeof data.local != 'undefined' )
      { 
        scope.Uname= data.local.fname+ ' ' + data.local.lname;
        //scope.image= '../public/img/placeholder_edit.png' ; 
      } 
    }
  });
}

//Event boolean change function
scope.addEvent = function(e){
  if(localStorage.user != ''){
  var eventsmall = scope.addE.toLowerCase().replace(" ", "");
  eventsmall = eventsmall.replace(/[()]/g,'');
  console.log(eventsmall);
  var exist;
    var sender = JSON.parse(localStorage.user);
    if(eval('sender.events.'+eventsmall)){
      scope.eventCalled = false;
      exist = false;
    }
    else{
      scope.eventCalled = true;
      exist = true;
    }
  
    $.ajax({
    url: '/ajax/events/'+sender._id,
    type: 'PUT',
    data: {name: eventsmall, val : exist},
    success: function(data) {
      loginCheck();
     if(exist == true){
      scope.alert="You have registered for "+scope.addE+ " :)";
      document.querySelector('paper-toast').show();
      scope.eventCalled = false;
      // document.querySelector('#eventAdd').css('background-color', 'green');

    }
    else if(exist == false){
      scope.alert="You have unregistered from "+scope.addE+ " :(";
      // document.querySelector('paper-toast').css('background', 'red');
      document.querySelector('paper-toast').show();
      scope.eventCalled = true;
      // $('.eventAdd').css('background-color', 'red');
    }
    else{
      scope.alert="Event is not open for register yet !";
            document.querySelector('paper-toast').show();

    }
    }
  });
}

else{
  scope.alert="It appears you are in Guest Mode, Log in";
  document.querySelector('paper-toast').show();
  setTimeout(function(){
    showOverlay();
  },4000)
}
}

//check for verification of user by email
var checkVerificationStatus = function(user) {
  if(user.local.verify != undefined){
    if( user.local.verify == false) {
      scope.alert="Please verify using the confirmation email to continue";
      document.querySelector('paper-toast').show();
      //set at timout of 2 seconds and then redirect to logout.
      setTimeout(function(){
        location.replace('/logout');
      }, 2000);
      

      return false;
    }  
  }
  return true;
}

//I know its lame !
//Not your mother's javascript, is it !

scope.goto = function(){

$('#section3').children().hide();
$('#section3').children("#home").show();
$('.fabGroup').addClass('hidden');
scope.selector =0;
scope.iconSelect = false;
      $('.tab').css('visibility', 'visible');
$('#div1').css('display','block');
$('#core_toolbar1').css('background-color','#03A9F4');
scope.eventname="";
setTimeout(function(){
    $('#paper_icon_button').attr('core-drawer-toggle', 'true')

  }, 100)
}


scope.goto1 = function(){
  init();
$('#section3').children().hide();
$('#section3').children("#events").show();
$('.fabGroup').addClass('hidden');
scope.selector =0;
document.querySelector('core-drawer-panel').closeDrawer();
}
scope.goto2 = function(){
$('#section3').children().hide();
$('#section3').children("#about").show();
$('.fabGroup').removeClass('hidden');
document.querySelector('core-drawer-panel').closeDrawer();
}
scope.goto3 = function(){

$('#section3').children().hide();
$('#section3').children("#ambassador").show();
$('.fabGroup').addClass('hidden');
scope.selector =0;
document.querySelector('core-drawer-panel').closeDrawer();
}
scope.goto4 = function(){

$('#section3').children().hide();
$('#section3').children("#team").show();
$('.fabGroup').addClass('hidden');
scope.selector =0;
document.querySelector('core-drawer-panel').closeDrawer();
}
scope.goto5 = function(){

$('#section3').children().hide();
$('#section3').children("#sponsor").show();
$('.fabGroup').addClass('hidden');
scope.selector =0;
document.querySelector('core-drawer-panel').closeDrawer();
}
scope.goto6 = function(){

$('#section3').children().hide();
$('#section3').children("#hospitality").show();
$('.fabGroup').addClass('hidden');
scope.selector =0;
document.querySelector('core-drawer-panel').closeDrawer();
scope.alert = "To register for accomodation, scroll below"
document.querySelector('paper-toast').show();
}


scope.seourl =function(){
  var user1 = JSON.parse(localStorage.user);
  var user1id = user1._id;
  var uri = document.getElementById('seoUrl').value;

  if(localStorage.user != '' && uri != '')
{
  if(user1.events.seo == true)
  {
   $.post("/log/seolink",
  
  {
    url:uri,
    userid:user1id
  },
  function(data,status){
    if(status == 'success') {
        scope.alert = data.message;
        document.querySelector('paper-toast').show();
        document.getElementById('seoUrl').value ="";
        return;
      }
      else{
        scope.alert = "Server Problem";
        document.querySelector('paper-toast').show();
        return;
      }
  });
}
else{
  scope.alert = "You haven't registered for the event yet !"
  document.querySelector('paper-toast').show();

}
}
else if(localStorage.user == ''){
  scope.alert = "You are in Guest Mode ! Log in";
  document.querySelector('paper-toast').show();
}
}
