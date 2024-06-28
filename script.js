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


function preloadImages(sources) {
    sources.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

preloadImages(imagesData);

const startGameBtn = document.getElementById("start-btn");
const gameRules = document.getElementById("rules");
const mainPage = document.getElementById("main-page");
const titles = document.getElementById("titles");
const endMsg = document.getElementById("end-msg");
const gamePage = document.getElementById("game-page");
const dealerMenu = document.getElementById("dealer-menu");
const cardBack = document.getElementById("card-back");
const playAgainMenu = document.getElementById("play-again");
const playAgainBtn = document.getElementById("play-againBtn");
const bankMenu = document.getElementById("bank-menu");
const bank = document.getElementById("bank")
const playerMenu = document.getElementById("player-menu");
const resultMenu = document.getElementById("result-menu");
const hitButton = document.getElementById("hit-btn");
const standButton = document.getElementById("stand-btn");
const playerScoreEl = document.getElementById("player-score");
const dealerScoreEl = document.getElementById("dealer-score");

let playerScore = 0;
let dealerScore = 0;
let playerCards = [];
let dealerCards = [];
let bankAmount = 1000;


startGameBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", resetGame);

function startGame() {

    startGameBtn.hidden = true;
    gameRules.style.display = "none";
    mainPage.hidden = true;
    gamePage.hidden = false;
    bank.hidden = false;
    bankAmount -= 100;
    bank.textContent = "Bank : $" + bankAmount;

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

            playerScore += randomCard.value;
            playerScoreEl.textContent = "Player Score : " + playerScore;

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

        dealerScore += randomCard.value;
        dealerScoreEl.textContent = "Dealer Score : " + dealerScore;
        let imgElement = document.createElement("img");
        imgElement.src = randomCard.src;
        imgElement.classList.add("game-image");
        dealerMenu.appendChild(imgElement);
    }, 1000);
}


function initialCheck() {
    if (playerScore > 21) {
        hitButton.hidden = true;
        standButton.hidden = true;
        endPlayer();
    } else if (playerScore === 21) {
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

    playerScore += randomCard.value;
    playerScoreEl.textContent = "Player Score : " + playerScore

    let imgElement = document.createElement("img");
    imgElement.src = randomCard.src;
    imgElement.classList.add("game-image");
    playerMenu.appendChild(imgElement);

    if (playerScore >= 21) {
        hitButton.hidden = true;
        standButton.hidden = true;
        setTimeout(endPlayer, 1500);
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

    dealerScore += randomCard.value;
    dealerScoreEl.textContent = "Dealer Score : " + dealerScore;

    let imgElement = document.createElement("img");
    imgElement.src = randomCard.src;
    imgElement.classList.add("game-image");
    dealerMenu.appendChild(imgElement);

    resultDeclare();
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

        dealerScore += randomCard.value;
        dealerScoreEl.textContent = "Dealer Score : " + dealerScore;

        let imgElement = document.createElement("img");
        imgElement.src = randomCard.src;
        imgElement.classList.add("game-image");
        dealerMenu.appendChild(imgElement);

        if (dealerScore < 17) {
            dealerGame();
        } else {
            resultDeclare();
        }
    }, 1000);
}

standButton.addEventListener("click", function () {
    hitButton.hidden = true;
    standButton.hidden = true;
    dealerGame()
})

function resultDeclare() {
    if (playerScore === 21) {
        resultMenu.textContent = " Player got Blackjack! ";
        bankAmount += 250;
    } else if (playerScore > 21) {
        resultMenu.textContent = " Dealer wins. Player busts. ";
    } else if (dealerScore > 21) {
        resultMenu.textContent = " Player wins! Dealer busts. ";
        bankAmount += 200;
    } else if (playerScore > dealerScore) {
        resultMenu.textContent = " Player wins! ";
        bankAmount += 200;
    } else if (playerScore < dealerScore) {
        resultMenu.textContent = " Dealer wins. ";
    } else {
        resultMenu.textContent = " PUSH ";
        bankAmount += 100;
    }

    bank.textContent = "Bank : $" + bankAmount;
    setTimeout(gameEnd, 3000);
}

function gameEnd() {
    if (bankAmount < 100) {
        gamePage.hidden = true;
        mainPage.hidden = false;
        gameRules.hidden = true;
        endMsg.hidden = false;
        startGameBtn.hidden = true;
    } else {
        playAgain();
    }
}

function playAgain() {
    gamePage.hidden = true;
    mainPage.hidden = false;
    gameRules.hidden = true;
    startGameBtn.hidden = true;
    playAgainBtn.hidden = false;
    bank.hidden = false;
}

function resetGame() {
    playAgainBtn.hidden = true;
    bank.hidden = true;
    playerScore = 0;
    dealerScore = 0;
    playerCards = [];
    dealerCards = [];
    playerMenu.innerHTML = '';
    dealerMenu.innerHTML = '';
    playerScoreEl.textContent = "Player Sum : " + playerScore;
    dealerScoreEl.textContent = "Dealer Sum : " + dealerScore;
    resultMenu.textContent = "🃁 ...... 🃁";
    startGame();

}

