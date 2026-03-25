const quotes= [
    "Success is not final, failure is not fatal.",
    "Believe in yourself.",
    "Never give up.",
    "Hard work always pays off.",
    "Stay positive and strong."
];
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
module.exports= getRandomQuote;