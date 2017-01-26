/////////// Back End
var thePigs = []
var playerSize;

//Pig Maker
function Pig(name) {
  this.pigName = name;
  this.gameTotal = 0;
  this.turnTotal = 0;
}

//Hold Functions
function addGameTotal() {
  thePigs[0].gameTotal += thePigs[0].turnTotal;
}

//Single Player Computer
function computerRoll(newPig2) {
  if (playerSize === 1 && thePigs[1] === newPig2) {
    turnSwitch();
    for(var index = 0; newPig2.turnTotal <= 11 && index != 1; index++) {
      var computerTurnRoll = parseInt(newPig2.mudRoll());
      addToTotal(computerTurnRoll, newPig2);
      index = newPig2.turnTotal
    }
    addGameTotal();
    if (winCheck(newPig2.gameTotal) === true) {
      displayWin(true);
      return true;
    }
  } else {
  }
}

//Roll Function
Pig.prototype.mudRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

//Roll Check For Turn
function addToTotal(input, Pig) {
  if(input === 1) {
    thePigs.forEach(function(item){
    item.turnTotal = 0;
    });
  } else {
    Pig.turnTotal += input;
  };
};

//Win Check
function winCheck(input){
  if (input >= 100) {
    return true;
  } else {
    return false;
  };
};

//Reset Game
var reset = function(player1, player2){
  thePigs.forEach(function(item){
    item.gameTotal = 0;
    item.turnTotal = 0;
  });
  thePigs[0] = player1;
  thePigs[1] = player2;
};

//Turn Switch Function
var turnSwitch = function(){
  thePigs.reverse();
  thePigs.forEach(function(item){
    item.turnTotal = 0;
  });
}



/////////// Front End

// Display Win For Computer After WinCheck
  var displayWin = function(input) {
    if (input === true) {
      $("#play-again").show();
      $("#roll, #hold").addClass("disabled").prop('disabled', true);
    }
  }

  //Game alert
  var gameAlert = function(input){
    $(".game-alert").show();
    $(".game-alert-message").text(input)
    $(".game-alert-close").click(function(){
      $(".game-alert").hide();
    });
  };

  var computerAlert = function(input){
    $(".game-alert-pancake").show();
    $(".game-alert-message-pancake").text(input)
    $(".game-alert-close-pancake").click(function(){
      $(".game-alert-pancake").hide();
    });
  };

$(function(){

  //Submit Listener
  $("#single").click(function(){
    playerSize = 1;
    $(".player-choice").hide();
    $(".second-player-input").hide();
    $(".two-player").show();
  });

//Player Size Listeners
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

    //Name Check
    if (!name1) {
      name1 = "Pig 1";
    }
    if (!name2) {
      name2 = "Pig 2";
    }

    if (playerSize === 1) {
      name1 = "Your Pig"
      name2 = "Pancake";
    }

    //Player Objects
    var newPig1 = new Pig(name1);
    var newPig2 = new Pig(name2);
    thePigs.push(newPig1, newPig2);

    //Display Game Total
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

      //Roll a 1 test
      if (turnRoll === 1) {
        if (playerSize === 1) {
          gameAlert("You rolled a 1! Zero points.");
        } else {
          gameAlert(thePigs[0].pigName + " rolled a 1! Zero points.");
        }
        $("#hold").addClass("disabled").prop('disabled', true);
        if (computerRoll(newPig2) === true){
          showGameTotal();
          $(".winner-display").text("Pancake wins with " + thePigs[0].gameTotal + " points!");
        } else {
          if (playerSize === 1) {
            computerAlert("Pancake scored " + newPig2.turnTotal + " points!")
          }
          turnSwitch();
          showGameTotal();
        }
      } else {
        //Hold Button Press
        $("#hold").off().click(function(){
          addGameTotal();

          if (winCheck(thePigs[0].gameTotal) === true) {
            showGameTotal();
            displayWin(true);
            $(".winner-display").text(thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!");
          } else {
            if (computerRoll(newPig2) === true){
              showGameTotal();
              $(".winner-display").text("Pancake wins with " + thePigs[0].gameTotal + " points!");
            } else {
              gameAlert(thePigs[0].pigName + " has scored " + thePigs[0].turnTotal + " points!");
              turnSwitch();
              showGameTotal();
            }
          };
          //Roll Displays on Hold
          $(".turn-roll").text(turnRoll);
          $(".player-total").text(thePigs[0].turnTotal);
          $("#hold").addClass("disabled").prop('disabled', true);

        });

        //Reset
        $("#play-again").off().click(function(){
          $(".previous-games").show();
          $(".history").prepend("<li>" + thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!</li>");
          reset(newPig1, newPig2);
          showGameTotal();
          $("#play-again").hide();
          $(".turn-roll").text(turnRoll);
          $(".player-total").text(thePigs[0].turnTotal);
          $("#roll, #hold").removeClass("disabled").prop('disabled', false);
        });
      };
    });
  });
});
