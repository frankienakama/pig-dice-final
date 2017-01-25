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

function oneCheck(input, Pig) {
  if(input === 1) {
    thePigs.forEach(function(item){
      item.turnTotal = 0;
    });
    thePigs.reverse();
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

    var reset = function(){
      thePigs.forEach(function(item){
        item.gameTotal = 0;
        item.turnTotal = 0;
      });
    };

    var turnSwitch = function(){
      thePigs.reverse();
      $("#hold").addClass("disabled").prop('disabled', true);
    }

    var showGameTotal = function(){
      $(".player1-game-total").text(newPig1.gameTotal);
      $(".player2-game-total").text(newPig2.gameTotal);
    };

    var whoseTurn = function() {
      $(".winner-display").text(thePigs[0].pigName + "'s turn!")
    };

    //Game begin

    $(".start").hide();
    $("#first-pig").text(newPig1.pigName);
    $("#second-pig").text(newPig2.pigName);
    $(".game-pane").show();
    whoseTurn();
    showGameTotal();

    //Roll Listener
    $("#roll").click(function(){
      var turnRoll = parseInt(thePigs[0].mudRoll());
      oneCheck(turnRoll, thePigs[0]);
      $(".turn-roll").text(turnRoll);
      $(".player-total").text(thePigs[0].turnTotal);
      $("#hold").removeClass("disabled").prop('disabled', false);

      // if (turnRoll === 1) {
      //   turnSwitch();
      // }

      $("#hold").off().click(function(){
        thePigs[0].gameTotal += thePigs[0].turnTotal;

        if (winCheck(thePigs[0].gameTotal) === true) {
          $(".winner-display").text(thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!");
          $("#play-again").show();
          $("#roll, #hold").addClass("disabled").prop('disabled', true);
          showGameTotal();
        } else {
          turnSwitch();
          whoseTurn();
          showGameTotal();
          thePigs[0].turnTotal = 0;
        };
        $(".turn-roll").text(turnRoll);
        $(".player-total").text(thePigs[0].turnTotal);
      });

      $("#play-again").off().click(function(){
        $(".previous-games").show();
        $(".history").prepend("<li>" + thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!</li>");
        reset();
        whoseTurn();
        showGameTotal();
        $("#play-again").hide();
        $("#roll, #hold").removeClass("disabled").prop('disabled', false);
      });
    });
  });
});
