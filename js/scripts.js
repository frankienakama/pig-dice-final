//back-end
var thePigs = []

function Pig(name) {
  this.pigName = name;
  this.gameTotal = 0;
  this.turnTotal = 0;
}

Pig.prototype.mudRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

function addToTotal(input, Pig) {
  if(input === 1) {
    thePigs.forEach(function(item){
    item.turnTotal = 0;
    });
  } else {
    Pig.turnTotal += input;
  };
};

function winCheck(input){
  if (input >= 100) {
    return true;
  } else {
    return false;
  };
};

var reset = function(){
  thePigs.forEach(function(item){
    item.gameTotal = 0;
    item.turnTotal = 0;
  });
};

var turnSwitch = function(){
  thePigs.reverse();
  thePigs.forEach(function(item){
    item.turnTotal = 0;
  });
}

//front-end
$(function(){
  //Submit Listener
  $("#begin").submit(function(event) {
    event.preventDefault();
    //Main Variables
    var name1 = $("#player1-name").val();
    var name2 = $("#player2-name").val();
    var newPig1 = new Pig(name1);
    var newPig2 = new Pig(name2);
    thePigs.push(newPig1, newPig2);

    // Front End Functions

    var showGameTotal = function(){
      $(".player1-game-total").text(newPig1.gameTotal);
      $(".player2-game-total").text(newPig2.gameTotal);
      $(".winner-display").text(thePigs[0].pigName + "'s turn!");
    }


    //Game begin

    $(".start").hide();
    $("#first-pig").text(newPig1.pigName);
    $("#second-pig").text(newPig2.pigName);
    $(".player-total").text(thePigs[0].turnTotal);
    $(".game-pane").show();
    showGameTotal();

    //Roll Listener
    $("#roll").click(function(){
      var turnRoll = parseInt(thePigs[0].mudRoll());
      addToTotal(turnRoll, thePigs[0]);
      $(".turn-roll").text(turnRoll);
      $(".player-total").text(thePigs[0].turnTotal);
      $("#hold").removeClass("disabled").prop('disabled', false);

      if (turnRoll === 1) {
        turnSwitch();
        showGameTotal();
        $("#hold").addClass("disabled").prop('disabled', true);
      } else {
        $("#hold").off().click(function(){
          thePigs[0].gameTotal += thePigs[0].turnTotal;

          if (winCheck(thePigs[0].gameTotal) === true) {
            $(".winner-display").text(thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!");
            $("#play-again").show();
            $("#roll, #hold").addClass("disabled").prop('disabled', true);
            showGameTotal();
          } else {
            turnSwitch();
            showGameTotal();
          };
          $(".turn-roll").text(turnRoll);
          $(".player-total").text(thePigs[0].turnTotal);
          $("#hold").addClass("disabled").prop('disabled', true);
        });

        $("#play-again").off().click(function(){
          $(".previous-games").show();
          $(".history").prepend("<li>" + thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!</li>");
          reset();
          showGameTotal();

          $("#play-again").hide();
          $("#roll, #hold").removeClass("disabled").prop('disabled', false);
        });
      };
    });
  });
});
