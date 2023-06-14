"use strict";
let lueckentext = document.getElementById("lueckentext");
let memory = document.getElementById("memory");
let triplett = document.getElementById("triplett");
let zuordnungAudio = document.getElementById("zuordnungAudio");
let zuordnung = document.getElementById("zuordnung");
let quizRF = document.getElementById("quizRF");
let multipleChoiceOK = document.getElementById("multipleChoiceOK");
let dragNDrop = document.getElementById("dragNDrop");
lueckentext.addEventListener("click", () => { window.open("../Lueckentext/lueckentext.html?json=dataLuecken.json", "_self"); });
memory.addEventListener("click", () => { window.open("../Memory/memory.html?json=baumkundeMemory.json", "_self"); });
triplett.addEventListener("click", () => { window.open("../triplett/triplett.html?json=baumkundeTriplett.json", "_self"); });
zuordnungAudio.addEventListener("click", () => { window.open("../AudioZuordnen/audioZuordnen.html?jsonAudio=voegelAudio.json&jsonBilder=voegelBilder.json", "_self"); });
zuordnung.addEventListener("click", () => { window.open("../paareZuordnen/paareZuordnen.html?json=dataPaare.json", "_self"); });
quizRF.addEventListener("click", () => { window.open("../Quiz_true_false/Quiz.html?json=data.json", "_self"); });
multipleChoiceOK.addEventListener("click", () => { window.open("../Quiz_MultipleChoice/multipleChoiceOK.html?json=dataChoiceOK.json", "_self"); });
dragNDrop.addEventListener("click", () => { window.open("../DragAndDrop/DragAndDrop.html?json1=dataDragAndDrop.json&json2=dataColumns.json", "_self"); });
//# sourceMappingURL=startseite.js.map