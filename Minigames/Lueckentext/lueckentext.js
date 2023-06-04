"use strict";
var cloze;
(function (cloze) {
    //let game: HTMLDivElement = <HTMLDivElement>document.getElementById("game");
    let text = document.getElementById("text");
    //let input: HTMLInputElement = <HTMLInputElement>document.getElementById("input");
    let submit = document.getElementById("submit");
    submit.addEventListener("click", checkInput);
    let correctCount = 0;
    let inputArr = [];
    let inputMix = [];
    let buttDiv = document.getElementById("backButton");
    let backButton = document.createElement("button");
    backButton.innerHTML = "Startseite";
    // Back to the main game/ reload page
    backButton.addEventListener("click", returnToStart);
    buttDiv.append(backButton);
    let jsonFile = new URLSearchParams(window.location.search).get("json");
    getData(jsonFile);
    async function getData(_url) {
        let response = await fetch(_url);
        let data = await response.json();
        inputArr = data;
        inputMix = data;
        for (let i = 0; i < data.length; i++) {
            text.append(data[i].text);
            text.append(createInput(data[i].input, i));
            // console.log(data[i].input);
            // console.log(inputArr[i].input);
            text.append(data[i].text_after);
        }
        showAllWords(inputMix);
        console.log(inputMix);
        console.log(inputArr);
    }
    function createInput(_dataInput, _inputCount) {
        // create Input Stuff
        let setInput = document.createElement("input");
        // let inputID: string = "ipt" + _inputCount;
        // get size of word and fit input field to it
        let inputText = document.createElement("span");
        inputText.innerText = _dataInput;
        text.appendChild(inputText);
        // console.log(inputText.offsetWidth);
        setInput.style.width = inputText.offsetWidth.toString() + "px";
        inputText.remove();
        setInput.setAttribute("id", _dataInput);
        // setInput.setAttribute("id", inputID);
        return setInput;
    }
    function checkInput() {
        let input = document.getElementsByTagName("input");
        console.log("Checking Input");
        removeFalseClass();
        for (let i = 0; i < input.length; i++) {
            // make id a number (from string)
            // let inputID: number = +input[i].id;
            console.log(input[i].value.toLowerCase());
            // console.log(inputArr[inputID].input.toLowerCase());
            // console.log(inputID);
            // console.log(input[i].id);
            // if (input[i].value.toLowerCase() == inputArr[inputID].input.toLowerCase()) {
            if (input[i].value.toLowerCase() == input[i].id.toLowerCase()) {
                correctCount++;
                // let insertP: Text = <Text>document.createTextNode(inputArr[inputID].input);
                let insertP = document.createTextNode(input[i].id);
                console.log(insertP);
                text.insertBefore(insertP, input[i]);
                input[i].value = "";
                input[i].classList.add("done");
                console.log("Correct!");
                if (correctCount == inputArr.length) {
                    console.log("You won!");
                }
            }
            else {
                // console.log(input[i].id);
                input[i].classList.add("false");
            }
        }
    }
    function removeFalseClass() {
        let falseClasses = document.getElementsByClassName("false");
        for (let i = 0; i < falseClasses.length; i++) {
            falseClasses[0].classList.remove("false");
        }
    }
    function showAllWords(allWords) {
        let wordsDiv = document.getElementById("words");
        let words = document.createElement("p");
        let wordsString;
        let wordsRandArray = allWords;
        wordsRandArray.sort(() => .5 - Math.random());
        for (let i = 0; i < wordsRandArray.length; i++) {
            if (i == 0) {
                wordsString = wordsRandArray[i].input;
            }
            else {
                wordsString = wordsString + " | " + wordsRandArray[i].input;
            }
        }
        words.innerHTML = wordsString;
        wordsDiv.appendChild(words);
    }
    // reload the page (to restart the game)
    function returnToStart() {
        window.open("../Startseite/Startseite.html", "_self");
    }
})(cloze || (cloze = {}));
//# sourceMappingURL=lueckentext.js.map