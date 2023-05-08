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
let resultContainer = document.getElementById("resultContainer");

function handleDropDown(dropDown, name, value) {
    // playable shots
    const rock = document.createElement("option");
    rock.value = `rock`;
    rock.text = 'rock'
    const paper = document.createElement("option");
    paper.value = `paper`;
    paper.text = `paper`
    const scissors = document.createElement("option");
    scissors.value = `scissors`;
    scissors.text = `scissors`
    const lizard = document.createElement("option");
    lizard.value = `lizard`;
    lizard.text = `lizard`;
    const spock = document.createElement("option");
    spock.value = `spock`;
    spock.text = `spock`
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
function handleOpponentType(playerText, opponentText, value) {

    if (!isPlayerText) {
        playerText.append("Player Shot: ")
        playerShot.append(playerText);
        isPlayerText = true;
    }
    if (value === 'player' && !isOpponentText) {
        opponentShot.append(opponentText);
        opponentShot.append(opponentShotOptions);

        isOpponentText = true;
    }
    else if ((value === 'player' || value === 'computer') && isOpponentText) {
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


let playResult = document.createElement("h3");
playResult.id = 'play-result';
let isResetButton = false;
async function play() {
    let game = gameMode.value;
    let shot = playerShotOptions.value;
    let withOpponent = opponentType.value === 'player' ? true : false;
    if (withOpponent) {
        const body = await playOpponent(`http://localhost:8080/app/${game}/play/${shot}`);
        playResult.innerText = `player shot: ${body['player']} \n opponent shot: ${body['opponent']} \n result: ${body['result']}`;
    }
    else {
        const body = await playNoOpponent(`http://localhost:8080/app/${game}/play/`)
        playResult.innerText = `player shot: ${body['player']}`;
    }
    if (!isResetButton) {
        let resetButton = document.createElement("button");
        resetButton.onclick = () => { reset(); }
        resetButton.innerText = 'reset';
        resultContainer.append(resetButton);
        isResetButton = true;
    }
    resultContainer.append(playResult);

}

function reset() {
    location.reload();
}

async function playNoOpponent(url) {
    response = await fetch(url);
    const body = await response.json();
    return body;
}

async function playOpponent(url) {
    response = await fetch(url);
    const body = await response.json();
    return body;
}
