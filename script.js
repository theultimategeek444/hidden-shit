const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call fake spaghetti? An impasta!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What did the grape say when it got stepped on? Nothing, it just let out a little wine.",
    "Why was the math book sad? Because it had too many problems.",
    "How does a penguin build its house? Igloos it together.",
    "What do you call a belt made out of watches? A waist of time.",
    "Why can't you give Elsa a balloon? Because she will let it go.",
    "What did the zero say to the eight? Nice belt!"
];

document.getElementById('jokeButton').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    alert(jokes[randomIndex]);
});