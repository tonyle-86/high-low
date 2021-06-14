let usedCards = [];

let currentCard;

let lastCard; 

let nextCard;

let score = 0;

let highDOM = document.querySelector('.high');
let lowDOM = document.querySelector('.low');
let drawDOM = document.querySelector('.draw');
let outcomeDOM = document.querySelector('.outcome');
let cardDOM = document.querySelector('.card-container img');

function selectCard() {
    let randomNum = Math.floor(Math.random() * cards.length);

    currentCard = cards[randomNum];

    cards.splice(randomNum, 1);
   
    usedCards.push(currentCard);

    return currentCard;    
}

function displayCards(){  
    
    selectCard();

    lastCard = usedCards[usedCards.length - 2]; 

    nextCard = usedCards[usedCards.length -1];

    cardDOM.src = `img/${nextCard.img}.svg`;

    cardDOM.removeEventListener('click',displayCards);

    if(usedCards.length >= 1){
        highDOM.addEventListener('click', high);
        lowDOM.addEventListener('click', low);
        drawDOM.addEventListener('click', draw);   
    }

    if(cards.length <= 1){
        highDOM.removeEventListener('click', high);
        drawDOM.removeEventListener('click', draw);
        lowDOM.removeEventListener('click', low);

        setTimeout(function(){
            cardDOM.src = 'img/2B.svg';
        },5000)

    }

}

cardDOM.addEventListener('click',displayCards);

function high() {    

    displayCards();

    if(nextCard.value > lastCard.value) {
        displayOutcome('CORRECT','green');

        score ++;

    } else {
        displayOutcome('INCORRECT','red');

        incorrectScore();

    }  

    updateScores()
    
}

function low() {    

    displayCards();

    if(nextCard.value < lastCard.value) {
        displayOutcome('CORRECT','green');

        score ++;

    } else {
        displayOutcome('INCORRECT','red');


        incorrectScore();

    }  

    updateScores();
    
}

function draw() {    

    displayCards();

    if(nextCard.value === lastCard.value) {
        displayOutcome('CORRECT','green');

        score ++;

    } else {
        displayOutcome('INCORRECT','red');

        incorrectScore();

    }   

    updateScores();
    
}

function displayOutcome(result,color) {
    outcomeDOM.textContent = result;
    outcomeDOM.classList.add('animated','bounceIn',color);
    outcomeDOM.addEventListener('animationend', function() { 
        this.textContent = '';
        this.classList.remove(color);
        this.classList.remove('animated','bounceIn');
    })
}

function updateScores() {
    document.querySelector('.score').textContent = score;
}

function incorrectScore() {    

    if(score === 0) {
        score = 0;
    } else {
        score --;
    }    
}

