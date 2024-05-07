let images = ["{{ url_for('static', filename='imagest2/hello.png') }}", "{{ url_for('static', filename='imagest2/bye.png') }}", "{{ url_for('static', filename='imagest2/welcome.png') }}", "{{ url_for('static', filename='imagest2/thanks.png') }}", "{{ url_for('static', filename='imagest2/sorry.png') }}", "{{ url_for('static', filename='imagest2/love.png') }}", "{{ url_for('static', filename='imagest2/yes.png') }}", "{{ url_for('static', filename='imagest2/no.png') }}", "{{ url_for('static', filename='imagest2/sorry.png') }}"]; // Image paths
let words = ["Hello", "Bye", "Welcome", "Thanks", "Sorry", "Love", "Yes", "No", "Sorry"]; // Corresponding words
let shuffledPairs = [];
let score = 0;

// Shuffle images and words into pairs
function shufflePairs() {
  let tempImages = images.slice();
  let tempWords = words.slice();
  while (tempImages.length > 0 && tempWords.length > 0) {
    let randomImageIndex = Math.floor(Math.random() * tempImages.length);
    let randomWordIndex = Math.floor(Math.random() * tempWords.length);
    shuffledPairs.push({ image: tempImages[randomImageIndex], word: tempWords[randomWordIndex] });
    tempImages.splice(randomImageIndex, 1);
    tempWords.splice(randomWordIndex, 1);
  }
}

// Render shuffled pairs
function renderPairs() {
  const gameDiv = document.getElementById('game');
  shuffledPairs.forEach(pair => {
    const pairDiv = document.createElement('div');
    pairDiv.classList.add('pair');
    const image = document.createElement('img');
    image.classList.add('image');
    image.src = pair.image;
    image.alt = pair.word;
    image.addEventListener('click', function() {
      checkMatch(pair.word);
    });
    const word = document.createElement('span');
    word.classList.add('word');
    word.textContent = pair.word;
    word.addEventListener('click', function() {
      checkMatch(pair.word);
    });
    pairDiv.appendChild(image);
    pairDiv.appendChild(word);
    gameDiv.appendChild(pairDiv);
  });
}

// Check match when clicked
function checkMatch(clickedWord) {
  const allImages = document.querySelectorAll('.image');
  const allWords = document.querySelectorAll('.word');
  let clickedImage;
  let clickedWordElement;

  allImages.forEach(image => {
    if (image.alt === clickedWord) {
      clickedImage = image;
    }
  });

  allWords.forEach(word => {
    if (word.textContent === clickedWord) {
      clickedWordElement = word;
    }
  });

  if (clickedImage && clickedWordElement) {
    if (clickedImage.alt === clickedWordElement.textContent) {
      score += 1;
      clickedImage.style.border = "2px solid green";
      clickedWordElement.style.border = "2px solid green";
    } else {
      score -= 0.5;
      clickedImage.style.border = "2px solid red";
      clickedWordElement.style.border = "2px solid red";
    }
    document.getElementById('score').textContent = "Score: " + score;
  }
}

// Check all matches
function checkMatches() {
  const allImages = document.querySelectorAll('.image');
  const allWords = document.querySelectorAll('.word');
  let allMatched = true;
  allImages.forEach(image => {
    if (image.style.border !== "2px solid green") {
      allMatched = false;
    }
  });
  allWords.forEach(word => {
    if (word.style.border !== "2px solid green") {
      allMatched = false;
    }
  });
  if (allMatched) {
    document.getElementById('result').textContent = "Congratulations! You've matched all pairs.";
  } else {
    document.getElementById('result').textContent = "Try again!";
  }
}

// Initialize the game
shufflePairs();
renderPairs();
