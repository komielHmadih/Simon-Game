var colors = ["red", "blue", "green", "yellow"];
var userPattern= [];
var gamePattern=[];
var isStatred = false;
var level = 0;

$(document).click(function(){
  if(!isStatred){
    $("h1").text("Level "+ level);
    nextSequence();
    isStatred = true;
  }
});

function nextSequence(){
  userPattern=[];
  level++;
  $("h1").text("Level "+ level);
  //generate a random numbers 0 1 2 3
  var randomNumber = Math.floor( Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

$(".btn").click(function(){
  var chosenColor = $(this).attr("id");
  userPattern.push(chosenColor);
  playSound(chosenColor);
  animatePress(chosenColor);

  check(userPattern.length-1);
});

function check(currentLevel){
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      startOver();
      $("body").addClass("game-over");
      $(".head").text("Game Over, click me to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


    }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function startOver() {
  level = 0;
  gamePattern = [];
  isStatred = false;
}
