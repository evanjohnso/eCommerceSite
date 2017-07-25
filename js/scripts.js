//Business Logic
function testPassword(first, second) {
  if (first===second) {
    return true;
  } else {
    return false;
  }
}
function NewAccount(first, last, userName, password) {
  this.first = first;
  this.last = last;
  this.userName = userName;
  this.password = password;
}

NewAccount.prototype.fullName = function() {
  // console.log('yo');
  return this.first + ' ' + this.last;
}


//User Interface
$(document).ready(function() {

  var accountBank = []; //Hold accounts in array
  $('#newAccount').submit(function(e) {
    e.preventDefault();
    //Take values
    var first = $('#newFirstName').val();
    var second = $('#newLastName').val();
    var newUserName = $('#newUserName').val();
    var pswd = $('#newUserPassword').val();
    var pswdConfirm = $('#confirmPassword').val();
    var verified = testPassword(pswd, pswdConfirm);
    //If verified, create new Object
    if (verified) {
      var accountHolder = new NewAccount(first, second, newUserName, pswd)
      accountBank.push(accountHolder);
    } else {
      alert("Please enter a valid password");
    }
    alert('Welcome back, ' + accountHolder.fullName() );
    $('.form-group input').val(''); //Reset form fields
    $(".col-md-6").hide();

  });

});
