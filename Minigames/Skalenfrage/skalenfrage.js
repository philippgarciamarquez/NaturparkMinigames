"use strict";
// TypeScript code to get the question and answer from the JSON file
var Skalenfrage;
(function (Skalenfrage) {
    let questionDiv = document.getElementById("question");
    let questionText = document.createElement("p");
    let trueFalse = document.getElementById("true-false");
    let answerText = document.getElementById("answer");
    let submitBtn = document.getElementById("submit");
    let reloadBtn = document.getElementById("reload");
    reloadBtn.addEventListener("click", () => {
        window.location.reload();
        console.log("reload");
    });
    let slider = document.getElementById("slider");
    let item;
    window.addEventListener("load", () => {
        console.log("Page loading!");
        handleLoad("data.json");
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
        questionText.innerHTML = item.question;
        questionDiv.appendChild(questionText);
    }
    function showAnswer(_item) {
        if (slider.value == item.answer.toString()) {
            trueFalse.innerHTML = "Korrekt";
            answerText.innerHTML = _item.answerText;
            console.log("Korrekt");
        }
        else {
            trueFalse.innerHTML = "Falsch";
            answerText.innerHTML = _item.answerText;
            console.log("Korrekt");
        }
    }
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    // let span: HTMLSpanElement = <HTMLSpanElement>document.getElementsByClassName("closeModal")[0];
    // When the user clicks on the button, open the modal
    submitBtn.onclick = function () {
        modal.style.display = "block";
        showAnswer(item);
    };
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
            }
            reloadBtn.style.display = "none";
        }
    };
    // let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("slider");
    let rangeValue = document.querySelector(".sliderDiv .sliderValue div");
    let start = parseFloat(slider.min);
    let end = parseFloat(slider.max);
    let step = parseFloat(slider.step);
    for (let i = start; i <= end; i += step) {
        rangeValue.innerHTML += '<div>' + i + '</div>';
    }
    slider.addEventListener("input", function () {
        let top = parseFloat(slider.value) / step * -40;
        rangeValue.style.marginTop = top + "px";
    });
})(Skalenfrage || (Skalenfrage = {}));
//# sourceMappingURL=skalenfrage.js.map