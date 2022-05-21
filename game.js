let user_score = 0;

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
    //get the h2 element
    var status = document.getElementById("status");
    status.innerHTML = "You Lost &#128556";
    status.style.color = "red";
}


function displayYouWon() {
    //increase score
    new_score = increaseScore();
    displayScore(new_score);

    //we need to check first if the boundries are not red
    var boundries_color = getBoundriesColor();
    console.log(boundries_color);
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
