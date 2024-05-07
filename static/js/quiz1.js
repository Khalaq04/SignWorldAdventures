const aslLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const engLetterImg = {
    'A': '../../static/images/A.png',
    'B': '../../static/images/B.png',
    'C': '../../static/images/C.png',
    'D': '../../static/images/D.png',
    'E': '../../static/images/E.png',
    'F': '../../static/images/F.png',
    'G': '../../static/images/G.png',
    'H': '../../static/images/H.png',
    'I': '../../static/images/I.png',
    'J': '../../static/images/J.png',
    'K': '../../static/images/K.png',
    'L': '../../static/images/L.png',
    'M': '../../static/images/M.png',
    'N': '../../static/images/N.png',
    'O': '../../static/images/O.png',
    'P': '../../static/images/P.png',
    'Q': '../../static/images/Q.png',
    'R': '../../static/images/R.png',
    'S': '../../static/images/S.png',
    'T': '../../static/images/T.png',
    'U': '../../static/images/U.png',
    'V': '../../static/images/V.png',
    'W': '../../static/images/W.png',
    'X': '../../static/images/X.png',
    'Y': '../../static/images/Y.png',
    'Z': '../../static/images/Z.png',

};


var words = ['MERCURY', 'VENUS']
// , 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'FOX', 'QUIZ', 'WALKED', 'BAG']; 
words = shuffleArray(words);
let currentWordIndex = 0;
let score = 0;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function generateRandomLetter() {
    const currentWord = words[currentWordIndex].toUpperCase();
    const aslLettersContainer = document.getElementById('aslLetters');

    var imgcont = document.getElementById("ques")

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
        score++
        document.getElementById('points').textContent = score;
        document.getElementById('result').textContent = "Correct!";

        currentWordIndex++;
        if (currentWordIndex < words.length) {
            generateRandomLetter();
        } else {
            document.getElementById('result').textContent = "Game Over";
            document.getElementById('result').style.fontSize = "xx-large";
            document.getElementById('gameover').style.visibility = "visible";
            
        }
    } else {
        document.getElementById('result').textContent = "Incorrect. Try Again.";
        currentWordIndex;
        score -= 0.5
        if (currentWordIndex < words.length) {
            generateRandomLetter();
        } else {
            document.getElementById('result').textContent = "Game Over";
        }
    }

    document.getElementById('userInput').value = '';
}

function nexttut(){
    console.log(score)
    var id = document.getElementById("id").innerHTML
    const request = new XMLHttpRequest()
    console.log(`/quizres/${id}/1/${JSON.stringify(score)}`.toString())
    request.open('POST', `/quizres/${id}/1/${JSON.stringify(score)}`)
    request.send()
    window.location = "/home/"+id.toString()
}

window.onload = generateRandomLetter;