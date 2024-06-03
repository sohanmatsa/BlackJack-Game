let cards = []
let sum = 0
let isAlive = false
let hasBlackJack = false
let message = ""
let titleEl = document.getElementById("title")
let cardsEl = document.getElementById("cards")
let sumEl = document.getElementById("sum")

function getRandomCard(){
    let randomNum = Math.floor( Math.random()*13 ) + 1
    if ( randomNum > 10 ){
        return 10
    } else if ( randomNum === 1){
        return 11
    } else {
        return randomNum
    }
}

function startGame(){
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard , secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame(){
    cardsEl.textContent = "Cards : "
    for (let i = 0 ; i < cards.length ; i++ ){
        cardsEl.textContent += cards[i] + " , "
    }
    sumEl.textContent = "Sum : " + sum
    if ( sum <= 20){
        message = "Do you want another card ? "
    } else if ( sum === 21) {
        hasBlackJack = true
        message = " You got BlackJack !! "
    } else {
        isAlive = false
        message = " You are out of the Game "
    }

    titleEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()        
    }
}

