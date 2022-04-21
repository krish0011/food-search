const loadQuotes = () => {
    fetch('https://api.kanye.rest')
        .then(res => res.json())
        .then(data => displayQuote(data))
}
const displayQuote = kanyeQuote => {
    // console.log(kanyeQuote);
    const quoteId = document.getElementById('quoteId');
    quoteId.innerText = kanyeQuote.quote ; 
    // kanyeQuote is an object and the (.quote) is it's element

}