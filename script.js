var gamePatteren = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).click(function () {
        $(this).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100)
    });

}

function startOver() {
    level = 0;
    started = false;
    gamePatteren = [];
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePatteren[currentLevel]) {
        if (userClickedPattern.length === gamePatteren.length) {
            setTimeout(function () { nextsequence() }, 1000);
        }
    }
    else {
        var wrong_audio = new Audio("./sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function nextsequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var random_choosen_colour = buttonColours[randomnumber];
    gamePatteren.push(random_choosen_colour);

    $("#" + random_choosen_colour).fadeOut(100).fadeIn(100);
    playSound(random_choosen_colour);

}

$(".btn").click(function () {

    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }

});