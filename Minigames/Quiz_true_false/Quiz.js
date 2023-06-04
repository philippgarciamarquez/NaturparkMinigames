"use strict";
var QuizTrueFalse;
(function (QuizTrueFalse) {
    let questionDiv = document.getElementById("question");
    let questionText = document.createElement("p");
    let trueBtn = document.getElementById("trueAnswer");
    let falseBtn = document.getElementById("falseAnswer");
    let trueFalse = document.getElementById("true-false");
    let answer = document.getElementById("answer");
    let reloadBtn = document.getElementById("reload");
    reloadBtn.addEventListener("click", () => {
        window.open("../Startseite/Startseite.html", "_self");
        console.log("reload");
    });
    let item;
    // Richtig Button + booleanwert
    // let buttonRight: HTMLButtonElement = <HTMLButtonElement>document.getElementById("trueAnswer");
    // let booleanButtonRight: boolean = true;
    // // Falsch Button + booleanwert 
    // let buttonFalse: HTMLButtonElement = <HTMLButtonElement>document.getElementById("falseAnswer");
    // let booleanButtonFalse: boolean = false;
    // //SpanBox in welche Richtig! oder Falsch! geusht werden soll
    // let headerBox: HTMLSpanElement = <HTMLSpanElement>document.getElementById("trueOrFalse");
    // //SpanBox in welche ein Kommentar gepusht wird wenn Antwort richtig / Antwort gepusht wird wenn Antwort Falsch ist
    // let resolutionBox: HTMLSpanElement = <HTMLSpanElement>document.getElementById("resolution");
    // Entweder so: (dann musst du immer zuerst im Link später das "?data.json" noch dazuschreiben)
    // window.addEventListener("load", handleLoad);
    // async function handleLoad(_event: Event): Promise<void> {
    //     let URL: string = location.search.substring(1);
    //     console.log(URL);
    //     let response: Response = await fetch(URL);
    //     let json: Item[] = await response.json();
    //     generateContent(json);
    // }
    window.addEventListener("load", () => {
        console.log("Page loading!");
        let jsonFile = new URLSearchParams(window.location.search).get("json");
        handleLoad(jsonFile);
    });
    // Oder so: (Dann wird das data.json file direkt eingelesen wenn die Seite lädt)
    // handleLoad("data.json");
    let data;
    async function handleLoad(_url) {
        console.log(_url);
        let response = await fetch(_url);
        let json = await response.json();
        data = json;
        generateContent(json);
    }
    async function generateContent(_data) {
        questionText.innerHTML = "";
        let ranNum = Math.floor((Math.random() * _data.length));
        console.log(_data);
        item = _data[ranNum];
        let removed = _data.splice(ranNum, 1);
        console.log(removed);
        // console.log(item.question);
        // console.log(item);
        questionText.innerHTML = item.question;
        questionDiv.appendChild(questionText);
    }
    function showAnswer(_item, _correct) {
        console.log(item);
        if (_item.booleanOfQuestion == _correct) {
            trueFalse.innerHTML = "Korrekt";
            // answer.innerHTML = _item.commentIfRight;
        }
        else {
            trueFalse.innerHTML = "Leider falsch";
            answer.innerHTML = _item.commentIfFalse;
        }
    }
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    // let span: HTMLSpanElement = <HTMLSpanElement>document.getElementsByClassName("closeModal")[0];
    // When the user clicks on the button, open the modal
    trueBtn.onclick = function () {
        modal.style.display = "block";
        showAnswer(item, true);
    };
    falseBtn.onclick = function () {
        modal.style.display = "block";
        showAnswer(item, false);
    };
    // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //     modal.style.display = "none";
    // }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (data.length == 0) {
            reloadBtn.style.display = "flex";
            console.log("Array leer");
        }
        else {
            if (event.target == modal) {
                modal.style.display = "none";
                generateContent(data);
                answer.innerHTML = "";
            }
            reloadBtn.style.display = "none";
        }
    };
})(QuizTrueFalse || (QuizTrueFalse = {}));
//# sourceMappingURL=Quiz.js.map