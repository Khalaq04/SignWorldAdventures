const aslLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const engLetterImg = {
    'A': '../static/images/A.png',
    'B': '../static/images/B.png',
    'C': '../static/images/C.png',
    'D': '../static/images/D.png',
    'E': '../static/images/E.png',
    'F': '../static/images/F.png',
    'G': '../static/images/G.png',
    'H': '../static/images/H.png',
    'I': '../static/images/I.png',
    'J': '../static/images/J.png',
    'K': '../static/images/K.png',
    'L': '../static/images/L.png',
    'M': '../static/images/M.png',
    'N': '../static/images/N.png',
    'O': '../static/images/O.png',
    'P': '../static/images/P.png',
    'Q': '../static/images/Q.png',
    'R': '../static/images/R.png',
    'S': '../static/images/S.png',
    'T': '../static/images/T.png',
    'U': '../static/images/U.png',
    'V': '../static/images/V.png',
    'W': '../static/images/W.png',
    'X': '../static/images/X.png',
    'Y': '../static/images/Y.png',
    'Z': '../static/images/Z.png',

};

const words = ['HELLO', 'WORLD', 'GOOD', 'MORNING','LOVE']; 
let currentWordIndex = 0;
let score = 0;

function generateRandomLetter() {
    const currentWord = words[currentWordIndex].toUpperCase();
    const aslLettersContainer = document.getElementById('aslLetters');
    //const imageContainer = document.querySelector('.image-container');
    var imgcont = document.getElementById("ques")
    
    // Clear previous content
    aslLettersContainer.innerHTML = '';
    imgcont.innerHTML = '';
    
    imgcont.style.borderColor = "rgb(55, 98, 44)";
    imgcont.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    
    for (let i = 0; i < currentWord.length; i++) {
        const currentLetter = currentWord[i];
        const img = document.createElement('img');
        img.src = engLetterImg[currentLetter];
        img.alt = currentLetter; 
        img.width = 50; 
        img.height = 50; 
        aslLettersContainer.appendChild(img);
    }
    
}

function checkAnswer() {
    const userInput = document.getElementById('userInput').value.toUpperCase();
    const currentWord = words[currentWordIndex].toUpperCase();

    if (userInput === currentWord) { 
        score++;
        document.getElementById('points').textContent = score;
        document.getElementById('result').textContent = "Correct!";

        currentWordIndex++;
        if (currentWordIndex < words.length) {
            generateRandomLetter();
        } else {
            document.getElementById('result').textContent = "Game Over";
        }
    } else {
        document.getElementById('result').textContent = "Incorrect. Moving to the next word.";
        currentWordIndex++;
        if (currentWordIndex < words.length) {
            generateRandomLetter();
        } else {
            document.getElementById('result').textContent = "Game Over";
        }
    }

    document.getElementById('userInput').value = '';
}
window.onload = generateRandomLetter;
