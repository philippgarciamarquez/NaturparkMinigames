namespace triplettGame {

    window.addEventListener("load", handleLoad);

    interface Card {
        src: string;
        text: string;
        src2: string;
    }

    let pairs: number = 6;
    let turnedCards: number = 0;
    let wonPairs: number = 0;
    let clickBoolean: boolean = true;

    let startButton: HTMLButtonElement;

    //array for comparing cards
    let cardArray: HTMLDivElement[] = [];
    //array for comparing Cards
    let compareArray: HTMLDivElement[] = [];

    function handleLoad(_event: Event): void {
        startButton = <HTMLButtonElement>document.getElementById("startButton");
        startButton.addEventListener("click", createCards);
    }

    async function getData(_url: RequestInfo): Promise<Card[]> {
        let response: Response = await fetch(_url);
        let data: Card[] = await response.json();
        return data;
    }

    //cards are created
    async function createCards(_event: MouseEvent): Promise<void> {

        let jsonFile: RequestInfo = new URLSearchParams(window.location.search).get("json");
        let cards: Card[] = await getData(jsonFile); //katrin fragen was in Klammer kommt
        //make button invisible and create gameboard

        pairs = cards.length;
        console.log("pairs: " + pairs);

        let gameBoard: HTMLDivElement = <HTMLDivElement>document.getElementById("gameBoard");
        gameBoard.innerHTML = " ";
        gameBoard.setAttribute("class", "gameGrid");

        let id: number = 0;

        //create the cards
        for (let card of cards) {

            //div wird erstellt
            for (let i: number = 0; i < 3; i++) {
                let div: HTMLDivElement = document.createElement("div");
                if (i == 0) {
                    let img: HTMLImageElement = document.createElement("img");
                    img.src = card.src;
                    div.appendChild(img);
                }
                else if (i == 1) {
                    let img: HTMLImageElement = document.createElement("img");
                    img.src = card.src2;
                    div.appendChild(img);
                }
                else {
                    div.innerHTML = card.text;
                }
                //back Klasse wird hinzugefügt 
                div.setAttribute("class", "back");
                div.setAttribute("pairID", id.toString());
                div.addEventListener("click", chooseCard);
                cardArray.push(div);
            }
            id++;
        }
        console.log(cardArray);

        while (cardArray.length > 0) {
            let index: number = Math.floor(Math.random() * cardArray.length);
            gameBoard.appendChild(cardArray.splice(index, 1)[0]);
        }

    } //createCards end

    //cards are clicked
    function chooseCard(_event: MouseEvent): void {
        if (clickBoolean == true) {
            if (_event.target instanceof HTMLImageElement != true) {
                let clickedCard: HTMLDivElement = <HTMLDivElement>_event.target;
                if (clickedCard != compareArray[0]) {
                    clickedCard.setAttribute("class", "front");
                    clickedCard.classList.remove("back");
                    turnedCards++;

                    compareArray.push(clickedCard); //push clickedCard.name
                    // console.log(turnedCards);
                    if (turnedCards == 3) {
                        clickBoolean = false;
                        setTimeout(compareCards, 2500);
                        // window.onclick = compareCards;
                    }
                    console.log(compareArray);
                }
            }

        }

    }//end chooseCards

    //cards are being compared
    function compareCards(): void {
        // console.log("comparing");
        clickBoolean = true;
        //if it's a match, cards become invisible
        if (compareArray[0].getAttribute("pairID") == compareArray[1].getAttribute("pairID") && compareArray[1].getAttribute("pairID") == compareArray[2].getAttribute("pairID")) {
            console.log("correct pair!");
            compareArray[0].setAttribute("class", "isHidden");
            compareArray[0].classList.remove("front");
            compareArray[1].setAttribute("class", "isHidden");
            compareArray[1].classList.remove("front");
            compareArray[2].setAttribute("class", "isHidden");
            compareArray[2].classList.remove("front");
            turnedCards = 0;
            wonPairs++;
            console.log("won" + wonPairs);
            compareArray.length = 0;
            //if also won:
            if (wonPairs == pairs) {
                // document.getElementById("gameBoard").innerHTML = " ";
                //message for win
                let congrats: HTMLParagraphElement = document.createElement("p");
                congrats.innerHTML = "Juhu, geschafft";
                document.getElementById("gameBoard").appendChild(congrats);

                // document.getElementById("gameBoard").innerHTML = "Juhu, geschafft!";
                //create reload button
                let neustart: HTMLButtonElement = document.createElement("button");
                neustart.innerHTML = "Neustart";
                document.getElementById("gameBoard").appendChild(neustart);
                neustart.addEventListener("click", function (): void {
                    window.location.reload();
                });

            }

        } else { //if no match, then cards show back again
            compareArray[0].setAttribute("class", "back");
            compareArray[0].classList.remove("front");
            compareArray[1].setAttribute("class", "back");
            compareArray[1].classList.remove("front");
            compareArray[2].setAttribute("class", "back");
            compareArray[2].classList.remove("front");
            turnedCards = 0;
            compareArray.length = 0;
        }
    }//end compareCards



} //end namespace