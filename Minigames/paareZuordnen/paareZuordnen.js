"use strict";
var paareZuordnen;
(function (paareZuordnen) {
    let selectedCardsCount = 0;
    // let clickedCard: HTMLImageElement[] = [];
    // two empty variables for saving the selected Cards
    let pickedCard1 = "leer";
    let pickedCard2 = "leer";
    let correctPairs = 0;
    let feedbackMsg = document.getElementById("feedbackMsg");
    // id for the HTML Table Cards to put the images in
    let idCount = 1;
    let buttDiv = document.getElementById("backButton");
    let backButton = document.createElement("button");
    backButton.innerHTML = "Startseite";
    // Back to the main game/ reload page
    backButton.addEventListener("click", returnToStart);
    buttDiv.append(backButton);
    async function getJson(_url) {
        // get data from JSON file (as an array) and save them in an empty array(cardsArray)
        let response = await fetch(_url);
        let data = await response.json();
        let cardsArray1 = [];
        let cardsArray2 = [];
        for (let i = 0; i < data.length; i += 2) {
            // console.log("JSON convertiert");
            cardsArray1.push(data[i]);
            //console.log("data 1: " + data[i].pairID);
            //console.log("i: " + i)
        }
        for (let j = 1; j < data.length; j += 2) {
            // console.log("JSON convertiert");
            cardsArray2.push(data[j]);
            //console.log("data 2: " + data[j].pairID);
            //console.log("j: " + j)
        }
        cardsArray1.sort(() => .5 - Math.random());
        cardsArray2.sort(() => .5 - Math.random());
        //console.log("cardsarray 1: " + cardsArray1.length);
        fillCards(cardsArray1, cardsArray2);
    }
    // get data from .json files (later from databank)
    let jsonFile = new URLSearchParams(window.location.search).get("json");
    getJson(jsonFile);
    // implement the cards and audio data in the table 
    function fillCards(_cardsArray1, _cardsArray2) {
        // console.log("Hello World!")
        let cardsArray = _cardsArray1.concat(_cardsArray2);
        console.log("cardsArray.length: " + cardsArray.length);
        // fill every table-component with an image for every "id"
        for (let i = 0; i < cardsArray.length; i++) {
            console.log("Cards ID: " + cardsArray[i].pairID);
            // console.log(idCount)
            let cardInsert = document.createElement("img");
            // let randomNumber: number = Math.floor(Math.random() * (cardsArray.length));
            cardInsert.setAttribute("src", cardsArray[i].src);
            cardInsert.setAttribute("name", cardsArray[i].pairID.toString());
            cardInsert.setAttribute("width", "80px");
            cardInsert.setAttribute("height", "80px");
            // when clicking on image then count how many Cards were clicked and compare if two are selected
            cardInsert.addEventListener("click", compareCards);
            // let idCount = i + 1;
            // append the images to the table-slots/ to the id
            let cardID = document.getElementById(idCount.toString());
            cardID.appendChild(cardInsert);
            idCount++;
        }
    }
    // compare the picked Cards
    function compareCards(_event) {
        // get picked Image
        let picked = _event.target;
        if (picked.classList.contains("picked") == false && picked.classList.contains("done") == false) {
            console.log("start comparing");
            // mark the picked Image (with a border)
            picked.classList.add("picked");
            // console.log("Picked ID: " + picked.name);
            selectedCardsCount++;
            // console.log(selectedCardsCount);
            if (selectedCardsCount == 1)
                pickedCard1 = picked.name;
            if (selectedCardsCount == 2) {
                pickedCard2 = picked.name;
                // check if it is a correct pair
                if (pickedCard1 == pickedCard2) {
                    // console.log("Correct");
                    // reset saved selections
                    selectedCardsCount = 0;
                    pickedCard1 = "leer";
                    pickedCard2 = "leer";
                    correctPairs++;
                    let pickedClass = document.getElementsByClassName("picked");
                    // adjust correct selected pairs, so they can't be selected again
                    for (let i = 0; i <= pickedClass.length; i++) {
                        pickedClass[0].classList.add("done");
                        pickedClass[0].classList.remove("picked");
                        console.log("Correct pair marked!");
                    }
                    // check if all pairs were found
                    if (correctPairs == 6) {
                        console.log("You won!");
                        feedbackMsg.innerText = "Du hast gewonnen!";
                    }
                    else {
                        feedbackMsg.innerText = "Richtig, gut gemacht!";
                    }
                }
                else {
                    console.log("Incorrect!");
                    feedbackMsg.innerText = "Leider falsch!";
                    selectedCardsCount = 0;
                    // setTimeout(removeSelection, 800);
                    removeSelection(_event);
                }
            }
        }
        else {
            console.log("Already picked!");
        }
    }
    // puts the Cards back to the default look from before selection
    function removeSelection(_event) {
        let pickedClass = document.getElementsByClassName("picked");
        for (let i = 0; i <= pickedClass.length; i++) {
            // console.log("pickedClass[0]: " + pickedClass[0].classList)
            pickedClass[0].classList.remove("picked");
            console.log("Class removed!");
        }
        // remove saved selections
        pickedCard1 = "leer";
        pickedCard2 = "leer";
    }
    // reload the page (to restart the game)
    function returnToStart() {
        window.open("../Startseite/Startseite.html", "_self");
    }
})(paareZuordnen || (paareZuordnen = {}));
//# sourceMappingURL=paareZuordnen.js.map