function signUp() {
  //console.log("Register Clicked!!")
  var Semail = document.getElementById('email').value;
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
  
  var link = '/connect/local';

  
    $.post(link,
    {
      email: Semail,
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
        console.log(data);
        alert('Registration Successful !');
        
        location.reload();
      }
      else{
        
        scope.alert = 'Failed to Register !';
        document.querySelector('paper-toast').show();
      }
    });
    
}