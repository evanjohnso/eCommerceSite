//Business Logic
function SiteManager(){
  this.buyer = [];
  this.goods = [];
}

function Good(name, desc, quantity, price, imglink, id){
  this.goodName = name;
  this.goodDesc = desc;
  this.quantity = quantity;
  this.price = price;
  this.imgLink = imglink;
  this.goodID = id;
}

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


SiteManager.prototype.addGood = function(name, desc, quantity, price, imglink) {
  var index = this.goods.length;
  var newGood = Good(name, desc, quantity, price, imglink, index);
  this.goods.push(newGood);
}

NewAccount.prototype.fullName = function() {
  // console.log('yo');
  return this.first + ' ' + this.last;
}

//User Interface
$(document).ready(function() {
  var siteManager = new SiteManager();
  var goodsArray = siteManager.goods;
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
                      '<p>' + productArray[i].goodDesc + '</p>' +
                      '<p>' + productArray[i].price + '</p>' +
                      '<form class="form-group">' +
                        '<label for=" ' + productArray[i].goodID + ' ">' + "Quantity: " + '</label>' +
                        '<input type = "number" id= "'+ productArray[i].goodID +' ">'+
                        '<button class"btn btn-info">"Add to Cart!"</button'+
                      '</form>'+
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
    // alert('Welcome back, ' + accountHolder.fullName() );
    $('.form-group input').val(''); //Reset form fields
    // $(".col-md-6").hide();

    var ourProducts = showProducts(goodsArray) ;
    $('#productDisplay').html(ourProducts);

  });
});
