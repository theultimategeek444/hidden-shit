class JokeApp {
    constructor() {
        this.jokes = [
            { text: "Why don't scientists trust atoms? Because they make up everything!", category: "Science" },
            { text: "Why did the scarecrow win an award? Because he was outstanding in his field!", category: "Farm" },
            { text: "What do you call fake spaghetti? An impasta!", category: "Food" },
            { text: "Why don't skeletons fight each other? They don't have the guts.", category: "Halloween" },
            { text: "What did the grape say when it got stepped on? Nothing, it just let out a little wine.", category: "Food" },
            { text: "Why was the math book sad? Because it had too many problems.", category: "School" },
            { text: "How does a penguin build its house? Igloos it together.", category: "Animal" },
            { text: "What do you call a belt made out of watches? A waist of time.", category: "Time" },
            { text: "Why can't you give Elsa a balloon? Because she will let it go.", category: "Movie" },
            { text: "What did the zero say to the eight? Nice belt!", category: "Math" },
            { text: "Why did the bicycle fall over? It was two-tired.", category: "Vehicle" },
            { text: "What do you call a fish wearing a bowtie? Sofishticated.", category: "Animal" },
            { text: "Why did the golfer bring two pairs of pants? In case he got a hole in one.", category: "Sport" },
            { text: "What did the buffalo say to his son when he left for college? Bison.", category: "Animal" },
            { text: "Why did the computer go to the doctor? Because it had a virus.", category: "Tech" },
            { text: "What do you call a parade of rabbits hopping backwards? A receding hare line.", category: "Animal" },
            { text: "Why don't eggs tell jokes? They'd crack each other up.", category: "Food" },
            { text: "What did the big flower say to the little flower? 'Hey, bud!'", category: "Nature" },
            { text: "Why did the picture go to jail? Because it was framed.", category: "Crime" },
            { text: "What do you call a bear with no teeth? A gummy bear.", category: "Animal" },
            { text: "Why did the tomato turn red? Because it saw the salad dressing!", category: "Food" },
            { text: "What do you call a sleeping bull? A bulldozer.", category: "Animal" },
            { text: "What do you call a parade of rabbits hopping backwards? A receding hare line.", category: "Animal" },
            { text: "Why did the bicycle fall over? Because it was two-tired.", category: "Vehicle" },
            { text: "What did the grape say when it got stepped on? Nothing, it just let out a little wine.", category: "Food" },
            { text: "Why don't scientists trust atoms? Because they make up everything!", category: "Science" },
            { text: "What do you call fake spaghetti? An impasta!", category: "Food" }
        ];
        
        this.currentJoke = '';
        this.favorites = JSON.parse(localStorage.getItem('jokeFavorites')) || [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.populateCategories();
        this.updateFavoritesDisplay();
        this.switchTab('home');
    }
    
    bindEvents() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Tab switching
        document.getElementById('homeTab').addEventListener('click', () => this.switchTab('home'));
        document.getElementById('favoritesTab').addEventListener('click', () => this.switchTab('favorites'));
        document.getElementById('searchTab').addEventListener('click', () => this.switchTab('search'));
        
        // Joke generation
        document.getElementById('jokeButton').addEventListener('click', () => this.generateJoke());
        
        // Actions
        document.getElementById('shareButton').addEventListener('click', () => this.shareJoke());
        document.getElementById('favoriteButton').addEventListener('click', () => this.toggleFavorite());
        document.getElementById('searchJokesInput').addEventListener('input', (e) => this.searchJokes(e.target.value));
        
        // Clear favorites
        document.getElementById('clearFavorites').addEventListener('click', () => this.clearFavorites());
    }
    
    populateCategories() {
        const categories = [...new Set(this.jokes.map(joke => joke.category))];
        const select = document.getElementById('categorySelect');
        select.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        });
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark');
        const toggle = document.getElementById('themeToggle');
        toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    }
    
    switchTab(tabName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        
        // Show selected section
        document.getElementById(tabName + 'Section').classList.add('active');
        document.getElementById(tabName + 'Tab').classList.add('active');
    }
    
    generateJoke() {
        const category = document.getElementById('categorySelect').value;
        
        let filteredJokes = this.jokes;
        
        if (category !== 'all') {
            filteredJokes = filteredJokes.filter(joke => joke.category === category);
        }
        
        if (filteredJokes.length === 0) {
            this.showJoke("No jokes found for that category. Try 'All Categories'!");
            return;
        }
        
        // Show loading
        this.showLoading();
        
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * filteredJokes.length);
            this.currentJoke = filteredJokes[randomIndex].text;
            this.typeWriter(this.currentJoke, document.getElementById('jokeDisplay'));
            document.getElementById('jokeButton').disabled = false;
            document.getElementById('jokeButton').textContent = 'Generate Another Shit Joke';
        }, 1500);
    }
    
    showLoading() {
        const display = document.getElementById('jokeDisplay');
        display.classList.add('loading');
        display.textContent = '';
        document.getElementById('jokeButton').disabled = true;
        document.getElementById('jokeButton').textContent = 'Cooking...';
        document.getElementById('shareButton').style.display = 'none';
        document.getElementById('favoriteButton').style.display = 'none';
        document.getElementById('rating').style.display = 'none';
    }
    
    typeWriter(text, element, speed = 20) {
        element.textContent = '';
        element.classList.remove('show', 'loading');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.classList.add('show');
                document.getElementById('shareButton').style.display = 'inline-block';
                document.getElementById('favoriteButton').style.display = 'inline-block';
                document.getElementById('rating').style.display = 'flex';
                this.updateFavoriteButton();
                this.createConfetti();
            }
        }, speed);
    }
    
    showJoke(text) {
        const display = document.getElementById('jokeDisplay');
        display.classList.remove('loading');
        display.classList.add('show');
        display.textContent = text;
        document.getElementById('shareButton').style.display = 'inline-block';
        document.getElementById('favoriteButton').style.display = 'inline-block';
        document.getElementById('rating').style.display = 'flex';
        this.updateFavoriteButton();
    }
    
    shareJoke() {
        navigator.clipboard.writeText(this.currentJoke).then(() => {
            const btn = document.getElementById('shareButton');
            btn.textContent = '📋 Copied!';
            setTimeout(() => btn.textContent = '📤 Share', 2000);
        });
    }
    
    toggleFavorite() {
        if (this.favorites.includes(this.currentJoke)) {
            this.favorites = this.favorites.filter(j => j !== this.currentJoke);
        } else {
            this.favorites.push(this.currentJoke);
        }
        localStorage.setItem('jokeFavorites', JSON.stringify(this.favorites));
        this.updateFavoriteButton();
        this.updateFavoritesDisplay();
    }
    
    updateFavoriteButton() {
        const btn = document.getElementById('favoriteButton');
        if (this.favorites.includes(this.currentJoke)) {
            btn.classList.add('favorited');
            btn.textContent = '💖 Favorited';
        } else {
            btn.classList.remove('favorited');
            btn.textContent = '❤️ Favorite';
        }
    }
    
    rateJoke(rating) {
        document.querySelectorAll('.star').forEach((star, index) => {
            star.classList.toggle('selected', index < rating);
        });
        console.log(`Rated ${rating} stars`);
    }
    
    searchJokes(searchTerm) {
        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '';
        
        if (searchTerm.length < 2) return;
        
        const results = this.jokes.filter(joke => 
            joke.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        results.forEach(joke => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.textContent = joke.text;
            div.addEventListener('click', () => {
                this.currentJoke = joke.text;
                this.switchTab('home');
                this.showJoke(joke.text);
            });
            resultsDiv.appendChild(div);
        });
    }
    
    updateFavoritesDisplay() {
        const list = document.getElementById('favoritesList');
        list.innerHTML = '';
        
        if (this.favorites.length === 0) {
            list.innerHTML = '<p>No favorites yet. Generate some jokes and favorite them!</p>';
            return;
        }
        
        this.favorites.forEach((joke, index) => {
            const div = document.createElement('div');
            div.className = 'favorite-item';
            div.textContent = joke;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-fav';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => {
                this.favorites.splice(index, 1);
                localStorage.setItem('jokeFavorites', JSON.stringify(this.favorites));
                this.updateFavoritesDisplay();
            });
            
            div.appendChild(removeBtn);
            list.appendChild(div);
        });
    }
    
    clearFavorites() {
        this.favorites = [];
        localStorage.removeItem('jokeFavorites');
        this.updateFavoritesDisplay();
    }
    
    createConfetti() {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
        
        const confettiContainer = document.getElementById('confetti');
        confettiContainer.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.animationDelay = Math.random() * 3 + 's';
            confettiContainer.appendChild(piece);
        }
        setTimeout(() => confettiContainer.innerHTML = '', 4000);
    }
}

// Initialize the app
const jokeApp = new JokeApp();