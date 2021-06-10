let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(document).keydown(function(event) {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    // Display and increase Level count
    level++;
    $("#level-title").text("Level " + level);
    
    // Flash the random colour generated in the body background
    setTimeout(function() {
        $("body").css("background-color: " + randomChosenColour);
    }, 100);
}

// User click function
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check if the user input is correct with the gamePattern or not
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(audioName) {
    var audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

// Animate the button clicked by the user
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Check if the sequence input by the user is same as the random-generated pattern in "gamePattern" array
function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("User wins");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }     
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
        
}

// Resetting the values on game over
function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
}