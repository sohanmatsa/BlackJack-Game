const startGameBtn = document.getElementById("start-btn");
const gameRules = document.getElementById("rules");
const mainPage = document.getElementById("main-page");
const titles = document.getElementById("titles");
const gamePage = document.getElementById("game-page");
const dealerMenu = document.getElementById("dealer-menu");
const cardBack = document.getElementById("card-back");
const playAgainMenu = document.getElementById("play-again");
const playAgainBtn = document.getElementById("play-againBtn");
const playerMenu = document.getElementById("player-menu");
const resultMenu = document.getElementById("result-menu");
const hitButton = document.getElementById("hit-btn");
const standButton = document.getElementById("stand-btn");
const playerSumEl = document.getElementById("player-sum");
const dealerSumEl = document.getElementById("dealer-sum");

let playerSum = 0;
let dealerSum = 0;
let playerCards = [];
let dealerCards = [];

const imagesData = [
    { src: 'images/2.svg', value: 2 },
    { src: 'images/3.svg', value: 3 },
    { src: 'images/4.svg', value: 4 },
    { src: 'images/5.svg', value: 5 },
    { src: 'images/6.svg', value: 6 },
    { src: 'images/7.svg', value: 7 },
    { src: 'images/8.svg', value: 8 },
    { src: 'images/9.svg', value: 9 },
    { src: 'images/10.svg', value: 10 },
    { src: 'images/Ace.svg', value: 11 }
];

startGameBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", resetGame);

function startGame() {

    startGameBtn.hidden = true;
    gameRules.style.display = "none";
    mainPage.hidden = true;
    gamePage.hidden = false;

    setTimeout(beginPlayer, 1000);
    setTimeout(beginDealer, 3000);
    setTimeout(initialCheck, 5500);
}


function beginPlayer() {

    for (let i = 0; i < 2; i++) {
        setTimeout(function () {
            let randomIndex = Math.floor(Math.random() * imagesData.length);
            let randomCard = imagesData[randomIndex];
            playerCards.push({
                src: randomCard.src,
                value: randomCard.value
            });

            playerSum += randomCard.value;
            playerSumEl.textContent = "Player Sum : " + playerSum;

            let imgElement = document.createElement("img");
            imgElement.src = randomCard.src;
            imgElement.classList.add("game-image");
            playerMenu.appendChild(imgElement);

        }, i * 1000);
    }
}

function beginDealer() {
    cardBack.style.display = "inline-block";
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * imagesData.length);
        let randomCard = imagesData[randomIndex];
        dealerCards.push({
            src: randomCard.src,
            value: randomCard.value
        });

        dealerSum += randomCard.value;
        dealerSumEl.textContent = "Dealer Sum : " + dealerSum;
        let imgElement = document.createElement("img");
        imgElement.src = randomCard.src;
        imgElement.classList.add("game-image");
        dealerMenu.appendChild(imgElement);
    }, 1000);
}


function initialCheck() {
    if (playerSum > 21) {
        hitButton.hidden = true;
        standButton.hidden = true;
        endPlayer();
    } else if (playerSum === 21) {
        endPlayer();
    } else {
        hitButton.hidden = false;
        standButton.hidden = false;
        hitButton.addEventListener("click", hitCards);
    }
}


function hitCards() {

    let randomIndex = Math.floor(Math.random() * imagesData.length);
    let randomCard = imagesData[randomIndex];
    playerCards.push({
        src: randomCard.src,
        value: randomCard.value
    });

    playerSum += randomCard.value;
    playerSumEl.textContent = "Player Sum : " + playerSum

    let imgElement = document.createElement("img");
    imgElement.src = randomCard.src;
    imgElement.classList.add("game-image");
    playerMenu.appendChild(imgElement);

    if (playerSum >= 21) {
        hitButton.hidden = true;
        standButton.hidden = true;
        setTimeout(endPlayer, 1000);
    }
}

function endPlayer() {
    cardBack.style.display = "none"
    let randomIndex = Math.floor(Math.random() * imagesData.length);
    let randomCard = imagesData[randomIndex];
    dealerCards.push({
        src: randomCard.src,
        value: randomCard.value
    });

    dealerSum += randomCard.value;
    dealerSumEl.textContent = "Dealer Sum : " + dealerSum;

    let imgElement = document.createElement("img");
    imgElement.src = randomCard.src;
    imgElement.classList.add("game-image");
    dealerMenu.appendChild(imgElement);

    if (playerSum > 21) {
        resultMenu.textContent = " Dealer wins!. Player busts. ";
    } else if (playerSum === 21) {
        resultMenu.textContent = " Player got BlackJack! ";
    } else if (playerSum == dealerSum) {
        resultMenu.textContent = " PUSH ";
    }
}


function dealerGame() {
    setTimeout(function () {
        cardBack.style.display = "none";
        let randomIndex = Math.floor(Math.random() * imagesData.length);
        let randomCard = imagesData[randomIndex];
        dealerCards.push({
            src: randomCard.src,
            value: randomCard.value
        });

        dealerSum += randomCard.value;
        dealerSumEl.textContent = "Dealer Sum : " + dealerSum;

        let imgElement = document.createElement("img");
        imgElement.src = randomCard.src;
        imgElement.classList.add("game-image");
        dealerMenu.appendChild(imgElement);

        if (dealerSum <= 16) {
            dealerGame();
        }
    }, 1000);
    setTimeout(resultDeclare, 3000)
}

standButton.addEventListener("click", function () {
    hitButton.hidden = true;
    standButton.hidden = true;
    dealerGame()
})

function resultDeclare() {
    if (playerSum > dealerSum && playerSum < 22) {
        resultMenu.textContent = " Player wins! ";
    } else if (dealerSum > playerSum && dealerSum < 22) {
        resultMenu.textContent = " Dealer wins! ";
    } else if (playerSum > 21) {
        resultMenu.textContent = " Dealer wins! Player busts. ";
    } else if (dealerSum > 21) {
        resultMenu.textContent = " Player wins! Dealer busts. ";
    } else {
        resultMenu.textContent = " PUSH ";
    }
    setTimeout(playAgain, 3000);
}


function playAgain() {
    gamePage.hidden = true;
    mainPage.hidden = false;
    gameRules.hidden = true;
    startGameBtn.hidden = true;
    playAgainBtn.hidden = false;
}

function resetGame() {
    playAgainBtn.hidden = true;
    playerSum = 0;
    dealerSum = 0;
    playerCards = [];
    dealerCards = [];
    playerMenu.innerHTML = '';
    dealerMenu.innerHTML = '';
    resultMenu.textContent = "🃁 ...... 🃁";
    startGame();

}

