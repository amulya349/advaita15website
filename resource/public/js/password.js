function formSubmit() {
	//alert(1);
	
	pwd = document.getElementById('pwd').value;
	conf = document.getElementById('conf').value;
	if(pwd == conf) {
		//send the request.. submit the form...
		//var x = document.getElementById('myForm');
		//x.submit();
		var user = window.location.pathname.split( '/' );
		
		//console.log(user);
		$.ajax({
		    url: '/user/verifyuser/callback/bm90WW91ck1vdGhlcnNIVE1M/'+user[5]+'/aUxvdmVOb2Rl',
		    type: 'PUT',
		    data: {password: pwd},
		    success: function(data) {
		      alert('Request Processed successfully. You can close this window!');
		    }
		  });
	}
	else {
		alert("Passwords are not matching !");
	}
}