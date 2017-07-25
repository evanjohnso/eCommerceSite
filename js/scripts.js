//Business Logic

function SiteManager(){
  this.buyer[];
  this.goods[];
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

function populateGoods(sitemanager){
  var name = ["ackee", "buddhas hand", "hala aka puhala tree fruit", "horned mellon", "jackfruit", "mangosteen", "pitaya", "rambutan", "romanseco broccoli"];
  var desc = ["its fruit"];
  var quantity = [12, 12, 12, 12, 12, 12, 12, 12, 12,];
  var price = [1.25, 1.25, 1.25, 2.75, 2.75, 2.75, 3.50, 3.50, 3.50,];
  var imglink = ["img/ackee.jpg", "img/buddhas.hand.jpg", "img/hala.aka.puhala.tree.fruit.jpg", "img/horned.melon.jpg", "img/jackfruit.jpg", "img/mangosteen.jpg", "img/pitaya.jpg", "img/rambutan.jpg", "img/romanseco.broccoli.jpg"];

  for(i=0, i < name.length; i++){
    sitemanager.addGood(name[i], desc[i], quantity[i], price[i], imglink[i]);
  }

}

SiteManger.prototype.addGood(name, desc, quantity, price, imglink){
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
