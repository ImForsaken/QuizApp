let currentQuestion = 0;
let rightAnswerCounter = 0;
let audioSuccess = new Audio('audio/success.mp3');
let audioWrong = new Audio('audio/wrong.mp3')

function init() {
    showQuestionsLength();
    showQuestion()
}

function showQuestionsLength() { //Shows total amount of questions
    document.getElementById('questionLength').innerHTML = questions.length;
}

function showQuestion() { //manages the game content
    if (gameIsOver()) {
        //show End Screen
        showEndScreen();
    } else { // Show question
        updateToNextQuestion();
        updateProgressbar();
    }
}

function disableAllAnswers() { //disable all buttons after input
    document.getElementById('answer1Button').disabled = true;
    document.getElementById('answer2Button').disabled = true;
    document.getElementById('answer3Button').disabled = true;
    document.getElementById('answer4Button').disabled = true;

}

function enableAnswerButtons() {
    document.getElementById('answer1Button').disabled = false;
    document.getElementById('answer2Button').disabled = false;
    document.getElementById('answer3Button').disabled = false;
    document.getElementById('answer4Button').disabled = false;
}

function answer(selection) {
    let question = questions[currentQuestion]
    let answerNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${question['right_answer']}`
    if (rightAnswerSelected(answerNumber, question)) { //right answer
        rightAnswerProcess(selection);
        disableAllAnswers();
    } else { //answer is wrong
        wrongAnswerProcess(selection, idOfRightAnswer);
        disableAllAnswers();
    }
    document.getElementById('nextButton').disabled = false;
}

function rightAnswerProcess(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    rightAnswerCounter++
    audioSuccess.play();
}

function wrongAnswerProcess(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    audioWrong.play();
}

function rightAnswerSelected(answerNumber, question) {
    return answerNumber == question['right_answer'];
}

function updateProgressbar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    console.log('Fortschritt', percent)
    document.getElementById('progressBar').innerHTML = `${percent}%`;
    document.getElementById('progressBar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('currentQuestionNumber').innerHTML = currentQuestion + 1
    let questionText = document.getElementById('questionText');
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];
    questionText.innerHTML = `${question['question']}`
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    showQuestionsLength()
    resetAnswerButtons()
    showQuestion()
    enableAnswerButtons()
}

function gameIsOver() {
    return currentQuestion >= questions.length
}

function resetAnswerButtons() {
    document.getElementById('answer1').parentNode.classList.remove('bg-success');
    document.getElementById('answer1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer2').parentNode.classList.remove('bg-success');
    document.getElementById('answer2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer3').parentNode.classList.remove('bg-success');
    document.getElementById('answer3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer4').parentNode.classList.remove('bg-success');
    document.getElementById('answer4').parentNode.classList.remove('bg-danger');
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amountOfQuestions').innerHTML = rightAnswerCounter;
    document.getElementById('countOfAllAnswers').innerHTML = questions.length;
    document.getElementById('headerImage').src = 'img/winner.png';
    document.getElementById('result').innerHTML += '<img src="img/brain result.png">';
}

function restartGame() {
    document.getElementById('headerImage').src = "img/question.jpg";
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none;';
    currentQuestion = 0;
    rightAnswerCounter = 0;
    init();
}