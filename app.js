let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

//let player draw while yourSum < 21
let canHit = true;

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let types = ['C','D','H','S'];
    deck = [];

    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + '-' + types[i]);
        }
    }
    console.log(deck);
}

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let index = Math.floor(Math.random()*deck.length)
        let temp = deck[i];
        deck[i] = deck[index];
        deck[index] = temp;
    }
    console.log(deck);
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while(dealerSum < 17){
        //<img src ="/cards/4-C.svg">
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = '/cards/' + card +'.svg'
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImg);
    }

    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = '/cards/' + card +'.svg'
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById('your-cards').append(cardImg);
    }

    document.getElementById('hit').addEventListener('click',hit);
    document.getElementById('stay').addEventListener('click', stay);
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById('hidden-card').src = "/cards/" + hidden + ".svg";

    let message = '';
    if(yourSum > 21){
        message = 'You lose!';
    }
    else if(dealerSum > 21){
        message = 'You win!';
    }
    //both player and dealer have a sum < 21
    else if(yourSum == dealerSum){
        message = 'Tie!';
    }
    else if(yourSum > dealerSum){
        message = 'You win!';
    }
    else if(yourSum < dealerSum){
        message = 'You lose!';
    }

    document.getElementById('dealer-total').innerText = dealerSum;
    document.getElementById('your-total').innerText = yourSum;
    document.getElementById('result').innerText = message;
}

function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = '/cards/' + card +'.svg'
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById('your-cards').append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }
    
}

function getValue(card){
    let data = card.split('-'); // "4-C" -> ["4","C"]
    let value = data[0];

    if(isNaN(value)){
        if(value == 'A'){
            return 11;
        }
        return 10;
    }

    return parseInt(value);
}

function checkAce(card){
    if(card[0] == 'A'){
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}