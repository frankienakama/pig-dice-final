//back-end
function Pig(name) {
  this.pigName = name;
  this.currentRoll = 0;
  this.gameTotal = 0;
  this.turnTotal = 0;
}

Pig.prototype.mudRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

function oneCheck(input, Pig) {
  if(input === 1) {
    Pig.turnTotal = 0;
  } else {
    Pig.turnTotal += input;
  };
};

function winCheck(input){
  if (input >= 100) {
    return true;
  } else {
    return false;
  }
}

//front-end
$(function(){
  //Submit Listener
  $("#begin").submit(function(event) {
    event.preventDefault();

    var name = $("#player1-name").val();
    var newPig = new Pig(name);
    $(".start").hide();
    $("#first-pig").text(newPig.pigName);
    $(".game-pane").show();

    //Roll Listener
    $("#roll").click(function(){
      var turnRoll = parseInt(newPig.mudRoll());
      oneCheck(turnRoll, newPig);
      $(".turn-roll").text(turnRoll);
      $(".player1-total").text(newPig.turnTotal);


      $("#hold").off().click(function(){
        newPig.gameTotal += newPig.turnTotal;
        $(".player1-game-total").text(newPig.gameTotal);

        if (winCheck(newPig.gameTotal) === true) {
          $(".winner-display").text(newPig.pigName + " Wins!");
        } else {

        };

      });
    });
  });
});
