'use strict';
// //Resize the page tab 
// function stretch(){
// $('.section').css({
// 	"height": (document.body.clientHeight)+"px",
// 	"max-height": (document.body.clientHeight)+"px",
// 	"width": document.body.clientWidth+"px"
// });
// $('#toolbar').css("width", "100%");
// }
// $(stretch) 

// $(window).resize(stretch, function(){
// 	console.log(document.body.clientHeight,document.body.clientWidth)
// });
// End of resize
$(document).ready(function() {

    $('#fullpage').fullpage();
    $('#mainContainer').hide();
// $('#login-btn').on('click', function(event) {
// 	event.preventDefault();
// 	$('paper-action-dialog').toggle();
// 	$('#toolbar').hide()
// });

});

function loginD(){
	var d = document.getElementById("a");
	d.toggle();
}


