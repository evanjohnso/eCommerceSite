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

  function showProducts(productArray) {
    var colCount = 3;
    var output = "";

    for (var i =0; i < productArray.length; i++) {
      if(colCount === 3){
        output += '<div class="row">' //start a new row when 3 columns
      }
      output += '<div class ="col-md-4">' +
                  '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                      '<p class="style1">' +
                      productArray[i].goodName+
                      '</p>'+
                    '</div>'+
                    '<div class="panel-body">'+
                      '<p>Age: ' + productArray[i].age +', species: ' + productArray[i].species + '</p>' +
                      '<div class="checkbox">' +
                        '<label><input type="checkbox" value="" id="' + productArray[i].idNum + '">Adopt Me!</label>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';
      colCount--;
      if (colCount === 0) {
        output += '</div>'; //When three columns, add closing div for row
        colCount = 3;
      }
    }
    if (productArray.length%3 !== 0) {
      output += '</div>';
    }
    return output;
  }





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
    showProducts();

  });

});
