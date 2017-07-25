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














//User Interface
$(document).ready(function() {
  $('#newAccount').submit(function(e) {
    e.preventDefault();
    var first = $('#newFirstName').val();
    var second = $('#newLastName').val();
    var newUserName = $('#newUserName').val();
    var pswd = $('#newUserPassword').val();
    var pswdConfirm = $('#confirmPassword').val();
    var verified = testPassword(pswd, pswdConfirm);

    if (verified) {
      var accountHolder = new NewAccount(first, second, newUserName, pswd)
    } else {
      alert("Please enter a valid password");
    }
    console.log(accountHolder);
    console.log(first, second, newUserName, pswd, pswdConfirm);


    $('.form-group input').val('');
  });

});
