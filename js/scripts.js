//back-end
var thePigs = []
var playerSize;

function Pig(name) {
  this.pigName = name;
  this.gameTotal = 0;
  this.turnTotal = 0;
}

function addGameTotal() {
  thePigs[0].gameTotal += thePigs[0].turnTotal;
}

function computerRoll(newPig2) {
  turnSwitch();
  if (playerSize === 1 && thePigs[0] === newPig2) {
    for(var index = 0; newPig2.turnTotal <= 11 && index != 1; index++) {
      var computerTurnRoll = parseInt(newPig2.mudRoll());
      addToTotal(computerTurnRoll, newPig2);
      index = newPig2.turnTotal
    }
    addGameTotal();
    turnSwitch();
  } else {
    turnSwitch();
  }
}

Pig.prototype.mudRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

function addToTotal(input, Pig) {
  console.log(thePigs[0]);
  console.log("Before Game Total is added: " + thePigs[0].gameTotal);
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

  $("#single").click(function(){
    playerSize = 1;
    $(".player-choice").hide();
    $(".second-player-input").hide();
    $(".two-player").show();
  });

  $("#double").click(function(){
    playerSize = 2;
    $(".player-choice").hide();
    $(".two-player").show();
  });

  $("#begin").submit(function(event) {
    event.preventDefault();
    //Main Variables
    var name1 = $("#player1-name").val();
    var name2 = $("#player2-name").val();
    if (!name1) {
      name1 = "Pig 1";
    }

    if (!name2) {
      name2 = "Pig 2";
    }

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
        $("#hold").addClass("disabled").prop('disabled', true);
        computerRoll(newPig2);
        showGameTotal();
      } else {
        $("#hold").off().click(function(){
          addGameTotal();

          if (winCheck(thePigs[0].gameTotal) === true) {
            $("#play-again").show();
            $("#roll, #hold").addClass("disabled").prop('disabled', true);
            showGameTotal();
            $(".winner-display").text(thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!");
          } else {
            computerRoll(newPig2);
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
