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
    Pig.turnTotal = 0;
    thePigs.reverse();
    thePigs[0].turnTotal = 0;
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

    var name1 = $("#player1-name").val();
    var name2 = $("#player2-name").val();
    var newPig1 = new Pig(name1);
    var newPig2 = new Pig(name2);
    thePigs.push(newPig1, newPig2);
    $(".winner-display").text(thePigs[0].pigName + "'s turn!")


    $(".start").hide();
    $("#first-pig").text(newPig1.pigName);
    $("#second-pig").text(newPig2.pigName);
    $(".game-pane").show();

    //Roll Listener
    $("#roll").click(function(){
      var turnRoll = parseInt(thePigs[0].mudRoll());
      oneCheck(turnRoll, thePigs[0]);
      $(".turn-roll").text(turnRoll);
      $(".player-total").text(thePigs[0].turnTotal);
      $(".winner-display").text(thePigs[0].pigName + "'s turn!")


      $("#hold").off().click(function(){
        thePigs[0].gameTotal += thePigs[0].turnTotal;

        if (winCheck(thePigs[0].gameTotal) === true) {
          $(".winner-display").text(thePigs[0].pigName + " wins with " + thePigs[0].gameTotal + " points!");
          thePigs.forEach(function(item){
            item.gameTotal = 0;
            item.turnTotal = 0;
          });
        } else {
          thePigs.reverse();
          $(".winner-display").text(thePigs[0].pigName + "'s turn!")
          thePigs[0].turnTotal = 0;
        };
        $(".turn-roll").text(turnRoll);
        $(".player-total").text(thePigs[0].turnTotal);
        $(".player1-game-total").text(newPig1.gameTotal);
        $(".player2-game-total").text(newPig2.gameTotal);
      });
    });
  });
});
