// import { Chance } from "./chance";

var myChance = new Chance();

var door1 = document.getElementById("door1");
var door2 = document.getElementById("door2");
var door3 = document.getElementById("door3");
var buttonCluster = document.getElementById("button-cluster");
var winsStick = 0;
var winsSwap = 0;
var roundsStick = 0;
var roundsSwap = 0;
var doors = [door1,door2,door3];

var doorIsSelected = false;
var choiceIsMade = false;

function selectWinner(doorNumber) {
    if(!doorIsSelected) {
        doorIsSelected = true;
        highlightSelectedDoor(doorNumber);
        var winningDoor = randomNumber(1,3);
        console.log(doorNumber + " chosen.",winningDoor + " wins : ");
        var switchDoor = selectRevealDoor(doorNumber,winningDoor);
        console.log(doorNumber,winningDoor,switchDoor);
        insertButtons(doorNumber,winningDoor,switchDoor);
    }
}

function highlightSelectedDoor(chosenDoorNumber) {
    // doors[chosenDoorNumber-1].style.backgroundColor="blue";
}

function randomNumber(minimum,maximum) {
    return myChance.integer({min: minimum,max: maximum});
    // return Math.round(Math.random() * (max-min) + min);
}

function selectRevealDoor(chosenDoorNumber,winningDoorNumber) {
    if(chosenDoorNumber==winningDoorNumber) {
        switch (chosenDoorNumber) {
            case 1:
                var choice = randomNumber(1,2);
                if(choice==1) {
                    revealDoor(2);
                    return 3;
                }
                else if (choice==2) {
                    revealDoor(3);
                    return 2;
                }
                break;
            case 2:
                var choice = randomNumber(1,2);
                if(choice==1) {
                    revealDoor(1);
                    return 3;
                }
                else if (choice==2) {
                    revealDoor(3);
                    return 1;
                }
                break;
            case 3:
                var choice = randomNumber(1,2);
                if(choice==1) {
                    revealDoor(1);
                    return 2;
                }
                else if (choice==2) {
                    revealDoor(2);
                    return 1;
                }
                break;
        }
    }
    //Chose wrong door
    else {
        var doorArray = [chosenDoorNumber,winningDoorNumber];
        if(!doorArray.includes(1)){
            revealDoor(1);
        }
        else if (!doorArray.includes(2)) {
            revealDoor(2);
        }
        else if (!doorArray.includes(3)) {
            revealDoor(3);
        }
        return winningDoorNumber;
    }
}

function revealDoor(doorNumber) {
    // doors[doorNumber-1].classList.remove('closed');
    // doors[doorNumber-1].classList.add("goat");
    const time = new Date().getTime();
    doors[doorNumber-1].style.backgroundImage=`url("./img/goat-opening.gif?random=${time})`;
}


function insertButtons(chosenDoorNumber,winningDoorNumber,switchDoor) {
    buttonCluster.appendChild(createButton("Swap",() => {swap(switchDoor,winningDoorNumber)}));
    buttonCluster.appendChild(createButton("Stick",() => {stick(chosenDoorNumber,winningDoorNumber)}));
}

function createButton(text,onClickFunc) {
    var button = document.createElement("button");
    var textContent = document.createTextNode(text);
    button.appendChild(textContent);
    button.onclick=onClickFunc;
    return button;
}

function swap(switchDoorNumber,winningDoorNumber) {
    const time = new Date().getTime();
    if(!choiceIsMade) {
        roundsSwap ++;
        if (switchDoorNumber==winningDoorNumber) {
            console.log("That's a bingo");
            console.log(switchDoorNumber);
            doors[switchDoorNumber-1].style.backgroundImage=`url("./img/car-opening.gif?random=${time})`;
            setElementText(document.getElementById("win-lose"),"You Win!");
            winsSwap++;
        }
        else {
            console.log("You lose.")
            console.log(switchDoorNumber);
            doors[switchDoorNumber-1].style.backgroundImage=`url("./img/bummer-goat.gif?random=${time})`;
            setElementText(document.getElementById("win-lose"),"You Lose!");;
        }
        choiceIsMade = true;
    }  
}

function stick(chosenDoorNumber,winningDoorNumber) {
    const time = new Date().getTime();
    if(!choiceIsMade) {
        roundsStick ++;
        if(chosenDoorNumber==winningDoorNumber) {
            console.log("That's a bingo");
            doors[chosenDoorNumber-1].style.backgroundImage=`url("./img/car-opening.gif?random=${time})`;
            winsStick++;
            setElementText(document.getElementById("win-lose"),"You Win!");
        }
        else {
            console.log("you lose.");
            doors[chosenDoorNumber-1].style.backgroundImage=`url("./img/bummer-goat.gif?random=${time})`;
            setElementText(document.getElementById("win-lose"),"You Lose!");
        }
        choiceIsMade = true;
    }
    
}

function setElementText (elem,text) {
    elem.innerHTML = text;
}

function calculateWinPercentage(won=0,played=0) {
    return (won/played)*100;
}

function resetGame(doors) {
    const time = new Date().getTime();
    if(choiceIsMade) {
        for(i= 0; i < doors.length; i++) {
            document.getElementById(`door${i+1}`).style="";
            document.getElementById(`door${i+1}`).style.backgroundImage=`url("./img/closed-door.gif?random="+${time})`;
            doorIsSelected = false;
            buttonCluster.innerHTML="";
        }
        setElementText(document.getElementById("win-lose"),"");
        choiceIsMade = false;
        setElementText(document.getElementById("stick-percentage"),calculateWinPercentage(winsStick,roundsStick));
        setElementText(document.getElementById("swap-percentage"),calculateWinPercentage(winsSwap,roundsSwap));
    }
}

function explain() {
    const overlay = document.getElementById("overlay");
    overlay.style.display="flex";
    setTimeout(() => {
        overlay.style.opacity="1";
    },100);
}

function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.opacity="0";
    setTimeout(() => {
        overlay.style.display="none";
    },333);   
}












