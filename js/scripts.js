//Business Logic
//Constructors
function SiteManager(){
  this.buyers = [];
  this.goods = [];
  this.accounts = [];
  this.currentShopper = [];
}

function Good(name, desc, quantity, price, imglink, id){
  this.goodName = name;
  this.goodDesc = desc;
  this.quantity = quantity;
  this.price = price;
  this.imgLink = imglink;
  this.goodID = id;
}
function Account(first, last, userName, password, id) {
  this.first = first;
  this.last = last;
  this.userName = userName;
  this.password = password;
  this.cart = [];
  this.accountID = id;
}
//Functions
function testPassword(first, second) {
  if (first===second) {
    return true;
  } else {
    return false;
  }
}
SiteManager.prototype.uniqueUserName = function (uniqueName) {
  if (this.accounts.length === 0) {
    return true;
  } else {
    for (var i = 0; i <= this.accounts.length; i++) {
      if (this.accounts[i].userName === uniqueName) {
        return false;
      } else {
        return true;
      }
    }
  }
}
function populateGoods(sitemanager){
  var name = ["Ackee", "Buddhas Hand", "Hala Aka Puhala Tree Fruit", "Horned Melon", "Jackfruit", "Mangosteen", "Pitaya", "Rambutan", "Romanesco Broccoli"];
  var desc = ["So what does ackee taste like? It's completely unique. The fruit has a buttery, creamy texture and a mildtaste that reminded me of hearts of palm. The saltfish in the dish plays off the mild fruit nicely, adding a saline tang.", "Though it looks like a lemon gone wild, the Buddha's hand is actually a distinct fruit in the citron family. It has a sweet, lemon blossom aroma and no juice or pulp. The mild-tasting pith is not bitter, so the fruit can be zested or used whole.", "Although the hala fruit was indeed eaten in times of famine in Hawai'i, the edible part wasn't considered all that tasty.", "connoisseurs describe the flavor of the slimy green interior as a cross between cucumber, zucchini, and kiwifruit (though as it ripens, it tastes more like a banana). A fully ripened kiwano has an orange rind with prominent spikes. To eat plain, cut the fruit in half, as shown above. connoisseurs describe the flavor of the slimy green interior as a cross between cucumber, zucchini, and kiwifruit (though as it ripens, it tastes more like a banana). A fully ripened kiwano has an orange rind with prominent spikes. To eat plain, cut the fruit in half, as shown above.", "The starchy unripe fruit can be cooked in curries, while sweet, ripe jackfruit complements sticky rice and ice cream. You can get jackfruit chips, jackfruit noodles, jackfruit papad. Followers of American vegan-cooking blogs, on the other hand, will find unripe jackfruit compared, with confounding frequency, to 'vegan pulled pork'.", "It's not very common in North America, but if you grew up in Southeast Asia, chances are you're familiar with this sweet yet tangy tropical fruit. The mangosteen is a nearly spherical fruit with a thick, inedible deep purple skin, a succulent white segmented interior, and a thick, cartoonish green stem", "Dragonfruit (pitaya) doesn't have much taste. The best way I can describe it, is kind of like a white kiwi - in terms of consistency/flavor. Usually not very sweet (like a kiwi). Tends to be more bland/subtle (once in a while somewhat sweet).", "Native to the Malay Archipelago, the name of this fruit is derived from the Malay word meaning 'hairy,' and you can see why. But once the hairy exterior of therambutan is peeled away, the tender, fleshy, delicious fruit is revealed. Its taste is described as sweet and sour, much like a grape.", "In fact, it's an edible flower from the family that includes broccoli, cauliflower, Brussels sprouts, and cabbage. It tastes very similar to cauliflower, but with a slightly nuttier, earthier flavor."];
  var quantity = [12, 12, 12, 12, 12, 12, 12, 12, 12];
  var price = [1.25, 1.25, 1.25, 2.75, 2.75, 2.75, 3.50, 3.50, 3.50];
  var imglink = ["img/ackee.jpg", "img/buddhas.hand.jpg", "img/hala.aka.puhala.tree.fruit.jpg", "img/horned.melon.jpg", "img/jackfruit.jpg", "img/mangosteen.jpg", "img/pitaya.jpg", "img/rambutan.jpg", "img/romanesco.broccoli.jpg"];

  for (var i=0; i < name.length; i++){
    sitemanager.addGood(name[i], desc[i], quantity[i], price[i], imglink[i]);
  }
}
// prototypes
SiteManager.prototype.addGood = function(name, desc, quantity, price, imglink) {
  var index = this.goods.length;
  var newGood = new Good(name, desc, quantity, price, imglink, index);
  this.goods.push(newGood);
}
SiteManager.prototype.addAccount = function(first , last, userName, password) {
  var id = this.accounts.length;
  var account = new Account(first, last, userName, password, id);
  this.accounts.push(account);
}
SiteManager.prototype.authorizedAccount = function(userName, userPassword) {
  //Loop through all accounts for matching name
  for (var i=0; i <= this.accounts.length; i++) {
    //If no accounts, return false to UI
    if (this.accounts.length === 0) {
      return false;
    //Look for matching userName and password
    } else if (this.accounts[i].password === userPassword&& this.accounts[i].userName === userName) {
      this.currentShopper.push(this.accounts[i]);
      return this.accounts[i];
    //If end of array is reached, return null
    } else if (i === this.accounts.length - 1) {
      return 42;
    }
  }
}
SiteManager.prototype.goodToCart = function(goodID, amount){
  if (this.goods[goodID].decreaseAmount(amount) === 0) {
    return 0;
  }
  console.log("amount: " + amount + " name: " + this.currentShopper[0].first);
  this.currentShopper[0].addToCart(amount, this.goods[goodID]);
  console.log( this.currentShopper[0] );
}
//will remove a specific amount of good(s) from the checkout cart and return it to the goods array
SiteManager.prototype.cartToGood = function(goodID, amount){
  var oldGoodId= this.currentShopper[0].cart[goodID].oldID;
  if (this.currentShopper[0].removeFromCart(goodID, amount) === 0) {
    return 0;
  }
  this.goods[oldGoodId].increaseAmount(amount);
}

Good.prototype.increaseAmount = function(amount){
  if (isNaN(amount) === true){
    return 0;
  }
  this.quantity += amount;
  return 1;
}
Good.prototype.decreaseAmount = function(amount){
  if(isNaN(amount) === true){
    return 0;
  }
  var newAmount = this.quantity - amount;
  if(newAmount < 0){
    return 0;
  }
  this.quantity -= amount;
  return amount;
}
Account.prototype.addToCart = function(amount, inputGood){
  var index = this.cart.length;
  var newGood = new Good(inputGood.goodName, inputGood.goodDesc, amount, inputGood.price, inputGood.imgLink, index);
  newGood.oldID = inputGood.goodID; //hold on to the old id that references its place in the goods array
  this.cart.push(newGood);
}
Account.prototype.removeFromCart = function(cartIndex, amount){
  if (this.cart[cartIndex].quantity < amount) {
    return 0;
  }

  if(this.cart[cartIndex].quantity === amount){
    this.cart.splice(cartIndex, 1);
    return amount;
  }
  this.cart[cartIndex].decreaseAmount(amount);
  return amount;
}
Account.prototype.totalCart = function() {
  var total = 0;
  for(var i=0; i < this.cart.length; i++){
    total += (this.cart[i].price * this.cart[i].quantity);
  }
  // this.cart.length = 0;
  return total;
}
//User Interface
$(document).ready(function() {
  var siteManager = new SiteManager();
  populateGoods(siteManager);
  var goodsArray = siteManager.goods;
  $("#logOutButton").hide();
  //Display the backend goods to the HTML on DOCready
  var goods = showProducts(goodsArray);
  $('#productDisplay').html(goods);








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
                      productArray[i].goodName +
                      '</p>'+
                      '<img src="' + productArray[i].imgLink + '" alt="broken" class="fruitPic"/>' +
                    '</div>'+
                    '<div class="panel-body">'+
                      '<p>' + productArray[i].goodDesc + '</p>' +
                      '<p>' + productArray[i].price + '</p>' +
                      '<form class="form-group products">' +
                        '<label for=" ' + productArray[i].goodID + ' ">' + "Quantity: " + '</label>' +
                        '<input type = "number" id= "'+ productArray[i].goodID +' " placeholder="1">'+
                        '<button class="btn btn-info">Add to Cart!</button>'+
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
  //Create a new Account Functionality
  $('#newAccount').submit(function(event) {
    event.preventDefault();
    //Take values from user
    var first = $('#newFirstName').val();
    var second = $('#newLastName').val();
    var newUserName = $('#newUserName').val();
    var pswd = $('#newUserPassword').val();
    var pswdConfirm = $('#confirmPassword').val();
    var uniqueUser = siteManager.uniqueUserName(newUserName);
    console.log(siteManager.uniqueUserName(newUserName));
    //If userName not taken already
    if (uniqueUser) {
      var verified = testPassword(pswd, pswdConfirm);
      //If verified, create new Object
      if (verified) {
        var accountHolder = new Account(first, second, newUserName, pswd)
        siteManager.currentShopper.push(accountHolder);
        siteManager.accounts.push(accountHolder);
        $('.currentCartName').text(siteManager.currentShopper[0].first);
        $("#signUpButton").modal('hide'); //Hide the modal
        $("#productDisplay").show(); //Show the hidden products
        $("#logOutButton").show(); //Display logOutButton
        $("#btnSignUp").hide(); //Hide signUpButton
        $("#btnSignIn").hide(); //Hide signIn
        console.log("this is account bank ");
        console.log(siteManager.accounts);
        console.log("this is current shopper ");
        console.log(siteManager.currentShopper);
        $('.form-group input').val(''); //Reset form fields
      } else {
        alert("Please enter a valid password");
        $('.encryption').val('');
      }
    } else if (!uniqueUser) {
      alert('Sorry, this user name is already taken!');
      $('.userNameReset').val('');
      $('.encryption').val('');
    }

  });
  //Add items to cart
  $(".products").submit(function(event) {
    event.preventDefault();
    var quantityPurchased = parseInt ($(this).find('input').val() );
    var index = parseInt ( $(this).find('input').attr('id') );
    siteManager.goodToCart(index, quantityPurchased);
    console.log ( siteManager.goods[index].goodName );
    console.log ( siteManager.goods[index].price );

    var goodName = siteManager.goods[index].goodName
    var goodPrice = siteManager.goods[index].price
    var subTotal = siteManager.goods[index].price * quantityPurchased;

    $('#cartItems').append('<div class="row">' +
                              '<div class="col-sm-3">' +
                                '<p>Name: '+ goodName + '</p>' +
                              '</div>' +
                              '<div class="col-sm-3">' +
                                '<p>Quantity: ' + quantityPurchased + '</p>' +
                              '</div>' +
                              '<div class="col-sm-3">' +
                                '<p>Price: ' + goodPrice + '</p>'+
                              '</div>'+
                              '<div class="col-sm-3">'+
                                '<p>Subtotal: ' + subTotal + '</p>' +
                              '</div>'+
                            '</div>');

    $(this).find('input').val(' ');
  });





  //Check backend storage for matching account
  $("#signIn").submit(function(event) {
    event.preventDefault();
    var userName = $("#userName").val();
    var userPassword = $("#userPassword").val();
    var authorized = siteManager.authorizedAccount(userName, userPassword);
    //From backend, either no accounts, no matching user/password, or valid and return that user
    if (!authorized) {
      alert('We have no friends, please make an account');
      $('.form-group input').val(''); //Reset form fields
    } else if (authorized === 42) {
      alert('Your username and/or password is incorrect, we\'ll wait');
      $('.form-group input').val(''); //Reset form fields
    } else {
      $('.form-group input').val(''); //Reset form fields
      $("#signInModal").modal('hide'); //Hide the modal
      $("#productDisplay").show(); //Show the hidden products
      $("#logOutButton").show(); //Display logOutButton
      $("#btnSignUp").hide(); //Hide signUpButton
      $("#btnSignIn").hide(); //Hide signIn
    }
    console.log("this is account bank ");
    console.log(siteManager.accounts);
    console.log("this is current shopper ");
    console.log(siteManager.currentShopper);
  });
  //Log Out Button Functionality
  $('#logOutButton').click(function(event) {
    event.preventDefault();
    siteManager.currentShopper.length = 0;
    $('#productDisplay').hide();
    $("#btnSignUp").show();
    $("#btnSignIn").show();
    $("#logOutButton").hide();
    console.log("this is current shopper ");
    console.log(siteManager.currentShopper);
  });
  //Checkout Button Functionality
  $('#btnCheckout').click(function(event) {
    event.preventDefault();
    siteManager.currentShopper[0].totalCart();
    alert( siteManager.currentShopper[0].totalCart() );
  });
});
