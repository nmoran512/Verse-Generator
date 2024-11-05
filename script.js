const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let loaderTimeout;
let apiQuotes = [];
// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
loading();
//Hide loading
function complete () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
loaderTimeout = setTimeout(() => {
        if(!loader.hidden == true) {loading();       
    }
}, 2000);
// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json';
    try{
        const quote = await fetch(apiUrl);
        apiQuotes = await quote.json();

        const bibleVerse = apiQuotes[0];
        clearTimeout(loaderTimeout);
        
        if(bibleVerse.text.length > 200) {
            quoteText.classList.add('long-quote');

        } else{
            quoteText.classList.remove('long-quote'); 
        }
        //Set Quote, Hide Loader
        complete();
        quoteText.textContent = bibleVerse.text;
        authorText.textContent = `${bibleVerse.bookname} ${bibleVerse.chapter}:${bibleVerse.verse}`;

    

    }catch (error) {
        //Catch Error Here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
