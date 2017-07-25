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

function populateGoods(sitemanager){
  var name = ["ackee", "buddhas hand", "hala aka puhala tree fruit", "horned mellon", "jackfruit", "mangosteen", "pitaya", "rambutan", "romanseco broccoli"];
  var desc = ["So what does ackee taste like? It's completely unique. The fruit has a buttery, creamy texture and a mildtaste that reminded me of hearts of palm. The saltfish in the dish plays off the mild fruit nicely, adding a saline tang.", "Though it looks like a lemon gone wild, the Buddha's hand is actually a distinct fruit in the citron family. It has a sweet, lemon blossom aroma and no juice or pulp. The mild-tasting pith is not bitter, so the fruit can be zested or used whole.", "Although the hala fruit was indeed eaten in times of famine in Hawai'i, the edible part wasn't considered all that tasty.", "connoisseurs describe the flavor of the slimy green interior as a cross between cucumber, zucchini, and kiwifruit (though as it ripens, it tastes more like a banana). A fully ripened kiwano has an orange rind with prominent spikes. To eat plain, cut the fruit in half, as shown above.connoisseurs describe the flavor of the slimy green interior as a cross between cucumber, zucchini, and kiwifruit (though as it ripens, it tastes more like a banana). A fully ripened kiwano has an orange rind with prominent spikes. To eat plain, cut the fruit in half, as shown above.", "The starchy unripe fruit can be cooked in curries, while sweet, ripe jackfruit complements sticky rice and ice cream. You can get jackfruit chips, jackfruit noodles, jackfruit papad. Followers of American vegan-cooking blogs, on the other hand, will find unripe jackfruit compared, with confounding frequency, to “vegan pulled pork.”", "It's not very common in North America, but if you grew up in Southeast Asia, chances are you're familiar with this sweet yet tangy tropical fruit. The mangosteen is a nearly spherical fruit with a thick, inedible deep purple skin, a succulent white segmented interior, and a thick, cartoonish green stem", "Dragonfruit (pitaya) doesn't have much taste. The best way I can describe it, is kind of like a white kiwi - in terms of consistency/flavor. Usually not very sweet (like a kiwi). Tends to be more bland/subtle (once in a while somewhat sweet).", "Native to the Malay Archipelago, the name of this fruit is derived from the Malay word meaning 'hairy,' and you can see why. But once the hairy exterior of therambutan is peeled away, the tender, fleshy, delicious fruit is revealed. Its taste is described as sweet and sour, much like a grape.", "In fact, it's an edible flower from the family that includes broccoli, cauliflower, Brussels sprouts, and cabbage. It tastes very similar to cauliflower, but with a slightly nuttier, earthier flavor."];
  var quantity = [12, 12, 12, 12, 12, 12, 12, 12, 12,];
  var price = [1.25, 1.25, 1.25, 2.75, 2.75, 2.75, 3.50, 3.50, 3.50,];
  var imglink = ["img/ackee.jpg", "img/buddhas.hand.jpg", "img/hala.aka.puhala.tree.fruit.jpg", "img/horned.melon.jpg", "img/jackfruit.jpg", "img/mangosteen.jpg", "img/pitaya.jpg", "img/rambutan.jpg", "img/romanseco.broccoli.jpg"];

  for(i=0; i < name.length; i++){
    sitemanager.addGood(name[i], desc[i], quantity[i], price[i], imglink[i]);
  }

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
