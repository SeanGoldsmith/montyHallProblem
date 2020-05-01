var door1 = document.getElementById("door1");
var door2 = document.getElementById("door2");
var door3 = document.getElementById("door3");
var buttonCluster = document.getElementById("button-cluster");

var doors = [door1,door2,door3];

var doorIsSelected = false;

function randomNumber(min,max) {
    return Math.round(Math.random() * (max-min) + min);
}

function createButton(text) {
    var button = document.createElement("button");
    var textContent = document.createTextNode(text);
    button.appendChild(textContent);
    return button;
}

function insertButtons() {
    buttonCluster.appendChild(createButton("Stick"));
    buttonCluster.appendChild(createButton("Stand"));
}

function selectWinner(doorNumber) {
    if(!doorIsSelected) {
        doorIsSelected = true;
        doors[doorNumber-1].style.backgroundColor = "red";
        console.log(doorNumber);
        var winningDoor = randomNumber(1,3);   
        insertButtons();
    }
}