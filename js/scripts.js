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


//front-end
$(function(){
  $("#begin").submit(function(event) {
    event.preventDefault();

    var name = $("#player1-name").val();
    var newPig = new Pig(name);
  });
});
