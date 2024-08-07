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

const backgroundAudio = new Audio ('audio/background2.mp3');
backgroundAudio.loop = true;
const buttonAudio = new Audio ('audio/buttons.mp3');
const cardsAudio = new Audio ('audio/light-card2.mp3');
const playerWinAudio = new Audio ('audio/player-win2.mp3');
const dealerWinAudio = new Audio ('audio/dealer-win2.mp3');


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
const betMenu = document.getElementById("bet-menu");
const dealBtn1 = document.getElementById("deal-btn1");
const dealBtn2 = document.getElementById("deal-btn2");
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


startGameBtn.addEventListener("click", letsPlay);
dealBtn1.addEventListener("click",startGame);
dealBtn2.addEventListener("click", resetGame);

function letsPlay() {
    backgroundAudio.play();
    buttonAudio.play();
    gamePage.hidden = true;
    mainPage.hidden = false;
    gameRules.style.display = "none";
    startGameBtn.hidden = true;
    betMenu.hidden = false;
    dealBtn2.hidden = true;
    bank.hidden = false;
}

function startGame() {

    backgroundAudio.play();
    buttonAudio.play();
    startGameBtn.hidden = true;
    gameRules.style.display = "none";
    mainPage.hidden = true;
    betMenu.hidden = true;
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

            cardsAudio.play();

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
    cardsAudio.play()
    cardBack.style.display = "inline-block";
    setTimeout(function () {
        
        cardsAudio.play();

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

    buttonAudio.play();

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
    cardsAudio.play();

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
    cardsAudio.play();

    resultDeclare();
}


function dealerGame() {
    setTimeout(function () {
        cardBack.style.display = "none";
        cardsAudio.play();

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
    buttonAudio.play();
    hitButton.hidden = true;
    standButton.hidden = true;
    dealerGame()
})

function resultDeclare() {
    if (playerScore === 21) {
        resultMenu.textContent = " Player got Blackjack! ";
        playerWinAudio.play();
        bankAmount += 250;
    } else if (playerScore > 21) {
        resultMenu.textContent = " Dealer wins. Player busts. ";
        dealerWinAudio.play();
    } else if (dealerScore > 21) {
        resultMenu.textContent = " Player wins! Dealer busts. ";
        playerWinAudio.play();
        bankAmount += 200;
    } else if (playerScore > dealerScore) {
        resultMenu.textContent = " Player wins! ";
        playerWinAudio.play();
        bankAmount += 200;
    } else if (playerScore < dealerScore) {
        resultMenu.textContent = " Dealer wins. ";
        dealerWinAudio.play();
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
    betMenu.hidden = false;
    dealBtn1.hidden = true;
    dealBtn2.hidden = false;
    bank.hidden = false;
}

function resetGame() {
    buttonAudio.play();
    betMenu.hidden = true;
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

