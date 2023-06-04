"use strict";
var memoryGame;
(function (memoryGame) {
    window.addEventListener("load", handleLoad);
    let pairs;
    let turnedCards = 0;
    let wonPairs = 0;
    let clickBoolean = true;
    let startButton;
    //array for all cards (empty after cards are on gameboard)
    let cardArray = [];
    //array for comparing Cards
    let compareArray = [];
    function handleLoad(_event) {
        startButton = document.getElementById("startButton");
        startButton.addEventListener("click", createCards);
    }
    async function getData(_url) {
        let response = await fetch(_url);
        let data = await response.json();
        return data;
    }
    //cards are created
    async function createCards(_event) {
        let jsonFile = new URLSearchParams(window.location.search).get("json");
        let cards = await getData(jsonFile); //katrin fragen was in Klammer kommt
        //make button invisible and create gameboard
        pairs = cards.length;
        console.log("pairs" + pairs);
        let gameBoard = document.getElementById("gameBoard");
        gameBoard.innerHTML = " ";
        gameBoard.setAttribute("class", "gameGrid");
        let id = 0;
        //create the cards
        for (let card of cards) {
            //div wird erstellt
            for (let i = 0; i < 2; i++) {
                let div = document.createElement("div");
                //back Klasse wird hinzugefügt
                if (i == 0) {
                    let img = document.createElement("img");
                    img.src = card.src;
                    div.appendChild(img);
                }
                else {
                    div.innerHTML = card.text;
                }
                // div.style.width = "100px"; //in css machen
                // div.style.height = "100px";
                div.setAttribute("class", "back");
                div.setAttribute("pairID", id.toString());
                div.addEventListener("click", chooseCard);
                cardArray.push(div);
            }
            id++;
        }
        console.log(cardArray);
        while (cardArray.length > 0) {
            let index = Math.floor(Math.random() * cardArray.length);
            gameBoard.appendChild(cardArray.splice(index, 1)[0]);
        }
    } //createCards end
    //cards are clicked
    function chooseCard(_event) {
        if (clickBoolean == true) {
            if (_event.target instanceof HTMLImageElement != true) {
                let clickedCard = _event.target;
                if (clickedCard != compareArray[0] && clickedCard != compareArray[1]) {
                    clickedCard.setAttribute("class", "front");
                    clickedCard.classList.remove("back");
                    turnedCards++;
                    compareArray.push(clickedCard); //push clickedCard.name
                    // console.log(turnedCards);
                    if (turnedCards == 2) {
                        clickBoolean = false;
                        setTimeout(() => { compareCards(); }, 2000);
                    }
                    console.log(compareArray);
                }
            }
        }
    } //end chooseCards
    //cards are being compared
    function compareCards() {
        // console.log("comparing");
        clickBoolean = true;
        //if it's a match, cards become invisible
        if (compareArray[0].getAttribute("pairID") == compareArray[1].getAttribute("pairID")) {
            compareArray[0].setAttribute("class", "isHidden");
            compareArray[0].classList.remove("front");
            compareArray[1].setAttribute("class", "isHidden");
            compareArray[1].classList.remove("front");
            turnedCards = 0;
            wonPairs++;
            console.log("won" + wonPairs);
            compareArray.length = 0;
            //if also won:
            if (wonPairs == pairs) {
                // document.getElementById("gameBoard").innerHTML = " ";
                //message for win
                let congrats = document.createElement("p");
                congrats.innerHTML = "Juhu, geschafft";
                document.getElementById("gameBoard").appendChild(congrats);
                // document.getElementById("gameBoard").innerHTML = "Juhu, geschafft!";
                //create reload button
                let neustart = document.createElement("button");
                neustart.innerHTML = "Neustart";
                document.getElementById("gameBoard").appendChild(neustart);
                neustart.addEventListener("click", function () {
                    window.location.reload();
                });
            }
        }
        else { //if no match, then cards show back again
            compareArray[0].setAttribute("class", "back");
            compareArray[0].classList.remove("front");
            compareArray[1].setAttribute("class", "back");
            compareArray[1].classList.remove("front");
            turnedCards = 0;
            compareArray.length = 0;
        }
    } //end compareCards
})(memoryGame || (memoryGame = {})); //end namespace
//# sourceMappingURL=memoryScript.js.map