document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { image: '/static/images_t6/fruits.webp', options: ['Fruits', 'Red', 'How'], answerIndex: 0 },
        { image: '/static/images_t6/anything.webp', options: ['Apple', 'Anything', 'Color'], answerIndex: 1 },
        { image: '/static/images_t6/have.webp', options: ['What', 'How', 'Have'], answerIndex: 2 },
        { image: '/static/images_t6/pear.webp', options: ['Pear', 'Apple', 'Forgot'], answerIndex: 0 },
        { image: '/static/images_t6/money', options: ['Dont Know', 'Money', 'Color'], answerIndex: 1 }
    ];

    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');

    let shuffledQuestions = shuffleArray(questions);
    let currQuestionIndx = 0;
    let score = 0;

    function loadQuestion() {
        const currQuestion = shuffledQuestions[currQuestionIndx];
        questionContainer.innerHTML = `<img src="${currQuestion.image}" alt="Question Image" class="quest-img">`;
        // Clear previous options
        optionsContainer.innerHTML = '';

        // Gen radio buttons
        currQuestion.options.forEach((option, index) => {        
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="option" value="${index}">
                ${option}
            `;
            optionsContainer.appendChild(label);
        });
        
        resultContainer.style.display = 'none';
    }

    function checkAnswer(selectedIndex) {
        const currQuestion = shuffledQuestions[currQuestionIndx];
        if (selectedIndex === currQuestion.answerIndex) {
            score++;
        }
    }

    function showResult() {
        resultContainer.textContent = `Your score: ${score}`;
        resultContainer.style.display = 'block';
        submitBtn.disabled = true; // Disable submit button
    }

    function isQuizOver() {
        return currQuestionIndx === shuffledQuestions.length - 1;
    }

    submitBtn.addEventListener('click', function () {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const selectedIndex = parseInt(selectedOption.value);
            checkAnswer(selectedIndex);
            if (!isQuizOver()) {
                currQuestionIndx++;
                loadQuestion();
            } else {
                showResult();
            }
        }
    });

    loadQuestion();

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
