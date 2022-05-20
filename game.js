//var element = document.getElementById("status").onload;

//console.log(element);

console.log("hello, world");

document.addEventListener("DOMContentLoaded", function(){
    //dom is fully loaded, but maybe waiting on images & css files
    var element = document.getElementById("status");
    element.style.color = "red";
    console.log(element);


    var start = document.getElementById("start");
    start.addEventListener("mouseover", function(){startGame()});

    var end = document.getElementById("end");
    end.addEventListener("mouseover", function(){winGame()});


    startGame();

});


function startGame() {
    var danger_zone = document.getElementsByClassName("boundary");
    console.log(danger_zone);
}