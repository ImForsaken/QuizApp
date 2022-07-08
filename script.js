let currentQuestion = 0;

function init() {
    showQuestionsLength();
    showQuestion()
}

function showQuestionsLength() {
    document.getElementById('questionLength').innerHTML = questions.length;
}

function showQuestion() {
    let question = questions[currentQuestion];
    let questionText = document.getElementById('questionText');
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];



    questionText.innerHTML = `${question['question']}`


}


function answer(selection) {
    let question = questions[currentQuestion]
    let answerNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${question['right_answer']}`
    if (answerNumber == question['right_answer']) {
        console.log('yee!')
        console.log(answerNumber)
        document.getElementById(selection).parentNode.classList.add('bg-success');

    } else {
        console.log('noo:(')
        console.log(answerNumber)
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');

    }
    document.getElementById('nextButton').disabled = false;
}