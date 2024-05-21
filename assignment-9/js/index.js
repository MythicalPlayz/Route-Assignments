var oldQuoteIndex;

var quotes = [
    {
        'author': 'Oscar Wilde',
        'quote': '“Be yourself; everyone else is already taken.”'
    },
    {
        'author': 'Alber Einstein',
        'quote': '“Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.”'
    },
    {
        'author': 'William Shakespeare',
        'quote': '“The fool doth think he is wise, but the wise man knows himself to be a fool.”'
    },
    {
        'author': 'Lance Armstrong',
        'quote': '“Pain is temporary. Quitting lasts forever.”'
    },
    {
        'author': 'Woody Allen',
        'quote': '“I\'m not afraid of death; I just don\'t want to be there when it happens.”'
    },
]


function getQuote() {
    var quoteIndex;
    do {
        quoteIndex = Math.floor(Math.random() * quotes.length);
    }
    while (quoteIndex === oldQuoteIndex)
    oldQuoteIndex = quoteIndex;

    document.getElementById('quote').innerHTML = quotes[quoteIndex].quote;
    document.getElementById('author').innerHTML = "― " + quotes[quoteIndex].author;
}

getQuote();

document.getElementById('button').addEventListener('click',getQuote)