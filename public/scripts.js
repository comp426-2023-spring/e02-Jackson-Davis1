#!/usr/bin/env node


const gameMode = document.getElementById("gameChoice");
const opponentType = document.getElementById("opponentChoice");
const playContainer = document.getElementById("playContainer");
let playerShotOptions = document.createElement("select");
playerShotOptions.id = 'playerShotOptions';
let opponentShotOptions = document.createElement("select");
opponentShotOptions.id = 'opponentShotOptions';
let playerShot = document.createElement("div");
let opponentShot = document.createElement("div");

function handleDropDown(dropDown, name, value) {
    // playable shots
    const rock = document.createElement("option");
    rock.value = `rock-${name}`;
    rock.text = 'rock'
    const paper = document.createElement("option");
    paper.value = `paper-${name}`;
    paper.text = `paper`
    const scissors = document.createElement("option");
    scissors.value = `scissors-${name}`;
    scissors.text = `scissors`
    const lizard = document.createElement("option");
    lizard.value = `lizard-${name}`;
    lizard.text = `lizard`;
    const spock = document.createElement("option");
    spock.value = `spock-${name}`;
    spock.text = `spock`
    console.log(dropDown);

    // initial shot values
    dropDown.remove(rock);
    dropDown.remove(paper);
    dropDown.remove(scissors);
    dropDown.add(rock);
    dropDown.add(paper);
    dropDown.add(scissors);
    if (value === 'rpsls') {
        dropDown.add(lizard);
        dropDown.add(spock)
    }
    else {
        dropDown.remove(lizard);
        dropDown.remove(spock);
    }
}


handleDropDown(playerShotOptions, 'player', 'rpsls');
handleDropDown(opponentShotOptions, 'opponent', 'rpsls');
handleDropDown(playerShotOptions, 'player', 'rps');
handleDropDown(opponentShotOptions, 'opponent', 'rps');
// append shot options to play container


gameMode.addEventListener("change", () => {
    let value = gameMode.value;
    handleDropDown(playerShotOptions, 'player', value);
    handleDropDown(opponentShotOptions, 'opponent', value);
})
let playerText = document.createElement("h3");
playerText.id = "player-text";
let opponentText = document.createElement("h3");
opponentText.id = "opponent-text";
opponentText.append("Opponent Shot: ")
let isPlayerText = false;
let isOpponentText = false;
function handleOpponentType(playerText, opponentText, value){

    if (!isPlayerText) {
        playerText.append("Player Shot: ")
        playerShot.append(playerText);
        isPlayerText = true;
    }
    if (value === 'player' && !isOpponentText){
        opponentShot.append(opponentText);
        opponentShot.append(opponentShotOptions);

        isOpponentText = true;
    }
    else if ((value === 'player' || value === 'computer') && isOpponentText){
        document.getElementById("opponent-text").outerHTML = "";
        document.getElementById("opponentShotOptions").outerHTML = "";
        isOpponentText = false;
    }
}

handleOpponentType(playerText, opponentText, 'player');

opponentType.addEventListener("change", () => {
    let value = opponentType.value;
    handleOpponentType(playerText, opponentText, value);
})

// add divs
playerShot.append(playerShotOptions);
opponentShot.append(opponentShotOptions);
playContainer.append(playerShot);
playContainer.append(opponentShot);
