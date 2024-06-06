let points = 200
let cards = []
let sum = 0
let playing = false
let message = ""
let titleEl = document.getElementById("title")
let cardsEl = document.getElementById("cards")
let sumEl = document.getElementById("sum")
let pointEl = document.getElementById("point")
let startbutton = document.getElementById("start-btn")
let newbutton = document.getElementById("new-btn")
let gameMenu = document.getElementById("menu")
let endMessage = document.getElementById("end-msg")

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

function gameEnd(){
    newbutton.hidden = true
    startbutton.hidden = false
    playing = false
    if (points === 0){
        endMessage.hidden = false
        gameMenu.hidden = true

    }
}

function startGame(){
    playing = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard , secondCard]
    sum = firstCard + secondCard
    newbutton.hidden = false
    startbutton.hidden = true
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
        
        message = " You got BlackJack !! 🥳 "
        points += 20
        gameEnd() 
        
    } else {
        
        message = " You are out of the Game 😞 "
        points -= 20
        gameEnd()
        
    }

    titleEl.textContent = message
    pointEl.textContent = "Points : " + points
}

function newCard() {
    if (playing == true) {
        let card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()        
    }
}

