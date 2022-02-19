const quotes = [
    "Get to Del Taco. They got a new thing called freesha… free… freeshavaca-do.", 
    "Hi, welcome to Chili's.",  
    "Im in my mums car. Broom broom!",
    "I dont have enough money for chicken nuggets.",
    "Happy birthday Raven!",
    "Say, Colorado. Im a giraffe!",
    "It's Wednesday, my dudes. The weekend is here.",
    "And they were roommates. Mah God, they were roommates.",
    "I spilled lipstick in your Valentino bag.",
    "Road work ahead? Uh yeah, I sure hope it does.",
];

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let wordQueue;
let highlightPosition;
let startTime; 

function startGame() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    highlightPosition = 0;
    wordQueue = quoteText.split(' ');

    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

    quote.childNodes[highlightPosition].className = 'highlight';

    input.focus();
    input.value = '';
    message.innerText = '';

    startTime = new Date().getTime();

    document.body.className = "";
    start.className = 'started';
    setTimeout(() => {start.className = "button";}, 2000);
}

function checkInput(){
    const currentWord = wordQueue[0].replaceAll(".","").replaceAll(",",""); 
    const typedValue = input.value.trim(); 

    if (currentWord !== typedValue){
        input.className = currentWord.startsWith(typedValue) ? '' : 'error';
        return;
    }

    wordQueue.shift(); 
    input.value = ''; 
    quote.childNodes[highlightPosition].className = '';

    if (wordQueue.length === 0) {
        gameOver();
        return;
    }

    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver() {
    const elapsedTime = new Date().getTime() - startTime;
    message.innerHTML = `<span class="congrats">Vine Pro!</span>
    <br>You reminisced in ${elapsedTime/1000} seconds.`;
    document.body.className = 'winner';
}

start.addEventListener('click', startGame);
input.addEventListener('input',checkInput);