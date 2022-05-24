let user_score = 0;
let game_started = false;
let live_time;


document.addEventListener("DOMContentLoaded", function(){
    startGame();
});


//when the user clicks on the S button
// or when the user hover on the S button
function startGame() {
    //initially we need to add two event listeners
    //1- on click on start 'S' to reset the whole game and score
    //2- on hover on S for a new try
    var start = document.getElementById("start");
    start.addEventListener("click", function(){resetScore()});
    start.addEventListener("mouseover", function(){resetBordersColor()});
}

//This function will be called when the user clicks on start
//mainly this funct will reset the score and return the display to its initial state
function resetScore() {
    //calling the display score function with zero as its argument
    user_score = 0;
    displayScore(user_score);

    //The second part is to reset the display of the boundries (back to black)
    resetBordersColor();
    resetTimingScores();
}

function displayScore(input) {
    let output = `Score: ${input} `;

    var score = document.getElementsByClassName("example");
    score = score[0];
    score.innerHTML = "<p id='score-txt'></p>";
    score.style.width = "100px";

    //accessing the p tag that we've created inside the score(example) div
    var score_txt = document.getElementById("score-txt");

    score_txt.style.display = "block";
    score_txt.style.padding = "0 0";
    score_txt.style.margin = "auto";
    score_txt.style.textAlign = "center";
    score_txt.style.width = "100%";
    score_txt.style.fontWeight = "bold";
    //finally
    score_txt.innerHTML = output;
}

//One hover reset the border colors
function resetBordersColor () {

    resetTimingScores();

    //write the function here
    //get the elements, mainly the five divs
    const danger_zone = document.querySelectorAll(".boundary");
    danger_zone.forEach(div => {
        //console.log(div);
        div.style.borderColor = "black";
    });

    //since the game hs started we need to do the following:
    activateDangerZone();
    activateTheEnd();
    reset_title();
    detectCheating();
    addTimerHTML();
    startStopWatch();

    //clearInterval(interval); //Not sure 
}

function reset_title(){
    //get the h2 element
    var status = document.getElementById("status");
    status.innerHTML = 'Begin by moving your mouse over the "S".';
    status.style.color = "black";
}

//add event listeners function
function activateDangerZone () {
    //lets activate the danger zone
    //storing the divs in an array than applying the event listener
    const danger_zone = document.querySelectorAll(".boundary");
    danger_zone.forEach(zone => {
        zone.addEventListener("mouseover", function(){fireOnTheHall()});
    });
}

//when the user touches the borders
function fireOnTheHall() {
    //first we need to check if the user had already won 
    //so the user in this case may hover over the divs and lose
    //so to prevent that we check if the title/h2 element color is not blue
    //since if it's blue it indicates that the user has already won a round
    //So the whole block of code is inside an if statement
    //get the h2 element color
    var status = document.getElementById("status").style.color;
    if (status!="blue"){
        new_score = decreaseScore();
        displayScore(new_score);

        //get the divs elements
        const danger_zone = document.querySelectorAll(".boundary");
        danger_zone.forEach(div => {
            //console.log(div);
            div.style.borderColor = "red";
        });

        // for (let i=0 ; i < danger_zone.length-1 ; i++) {
        //     danger_zone[i].classList.add('youlose');
        // }

        //display you lost in the h2 element
        displayYouLost();
    }
}

// decrease the score when the game is lost
function decreaseScore() {
    //check if the borders are red to prevent unnecessary decrease of the scrore
    //by checking if the borders are red already
    danger_zone_color = getBoundriesColor();
    if (danger_zone_color!=='red'){
        user_score -= 10;
        return user_score;
    }else {
        return user_score;
    }
}

//a function to get the borders color 
function getBoundriesColor() {
    //get the borders color
    const danger_zone = document.querySelectorAll(".boundary");
    //since danger_zone is an array we can only check the first element:
    danger_zone_color = danger_zone[0].style.borderColor;
    return danger_zone_color;
}

//a seperate function that will activate the End button/div
function activateTheEnd(){
    var end = document.getElementById("end");
    end.addEventListener("mouseover", function(){displayYouWon()});
    
}

function displayYouLost(){
    displayResultTiming();
    clearInterval(interval);
    resetTimingScores();


    //get the h2 element
    var status = document.getElementById("status");
    status.innerHTML = "You Lost &#128556";
    status.style.color = "red";
}

function displayYouWon() {
    let won = true;
    displayResultTiming(won);
    clearInterval(interval);
    // resetLiveTime();
    resetTimingScores();
    
    //increase score
    new_score = increaseScore();
    displayScore(new_score);

    //we need to check first if the boundries are not red
    var boundries_color = getBoundriesColor();
    //console.log(boundries_color);
    if (boundries_color!=="red"){
        var status = document.getElementById("status");
        status.innerHTML = "You Won &#128525";
        //status.style.fontSize = "30px";
        status.style.color = "blue";
    }

    removeEventListenerOnBoundries();
}

function increaseScore(){
    //check if the h2 is not blue! to prevent further increase in the score
    //get the h2 element
    var status = document.getElementById("status").style.color;
    if (status!="blue" && status!="red"){
        user_score += 5;
        return user_score;
    }
    else{
        return user_score;
    }
}

function removeEventListenerOnBoundries() {
    const danger_zone = document.querySelectorAll(".boundary");
    danger_zone.forEach(zone => {
        //console.log(div);
        //var score = Number();
        zone.removeEventListener("mouseover", function(){fireOnTheHall()});
    });
}           

//This function will detect if the user trie to cheat :P
//cheating means the user is trying to get to the end from outside the maze
function detectCheating() {
    //we simply could add event listener on the h2 element on top 
    //And the the p tag on bottom
    //get the h2 element
    var status = document.getElementById("status");
    status.addEventListener("mouseover", function(){displayCheating()});

    //get the p tags inside the body
    var p_tags = document.getElementsByTagName("p");
    //console.log(p_tags);
    for (let i=0 ; i < p_tags.length ; i++){
        //console.log(p_tags[i]);
        p_tags[i].addEventListener("mouseover", function(){displayCheating()});
    }
}

//the function that will print a message when cheating
function displayCheating(){
    //First we need to check if the user has not already won or lost
    //in order to do that we can simply check if the title.color (status) is not red or blue

    //get the h2 element
    var status = document.getElementById("status");
    var status_color = status.style.color;
    if (status_color!="blue" && status_color!="red"){
        status.innerHTML = "Go ahead bro no one is watching &#128529";
    }
}


//add html tag to show the timer
function addTimerHTML(){
    if (!game_started) {
        //console.log("hi");

        let score_div = document.getElementsByTagName("p")[1];
        //console.log(score_div);

        score_div.innerHTML = "<span id='timer'>Timer: </span><span id='last'>last: </span><span id='best'>Best</span>"

        let spans = document.getElementsByTagName('span');
        //spans.style.textAlign = 'center';
        for (let i=0 ; i<spans.length ; i++ ){
            spans[i].style.display = "inline-block";
            spans[i].style.marginLeft = '40px';
            spans[i].style.marginRight = '40px';
        }
        game_started = true;
    }
    //clearInterval(interval);
    startStopWatch();
}


let interval =null;
let elapsedTime;
const user_score_timer = [];
var startTime = Date.now();
let high_score = Infinity;

function startStopWatch() {
    startTime = Date.now();
    interval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        var live_time = document.getElementById('timer');
        elapsedTime = (elapsedTime /1000).toFixed(2);
        live_time.innerHTML = "live <br>" + elapsedTime;
    }, 100);
    user_score_timer.push(elapsedTime);
    // console.log("hello");
    // console.log(elapsedTime);
    // console.log(user_score_timer);
}

function displayResultTiming(won){
    //get elements
    let last_time_taken = document.getElementById('last');
    let best_time_taken = document.getElementById('best');

    //last score
    let last_score = user_score_timer[user_score_timer.length-1];
    last_time_taken.innerHTML = "last <br>" + last_score;


    if (high_score>elapsedTime && won) {
        high_score = elapsedTime;
        best_time_taken.innerHTML = "best <br>" + high_score;
    }
    else {
        if (high_score){
            best_time_taken.innerHTML = "best <br>" + high_score;
        }
        else {
            best_time_taken.innerHTML = "best <br>" + "0.00";
        }
    }


}

function resetTimingScores() {
    live_time = document.getElementById('timer');
    if (game_started) {
        //console.log("hello hear me????");
        live_time.innerText = "0.00";

    }
    elapsedTime = 0;
    clearInterval(interval);
    //console.log("hello");
}