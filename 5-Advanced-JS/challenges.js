/* Challenge 1
function Question(question, answers, answer) {
    this.question = question;
    this.answers = answers;
    this.correct = answer;
}

Question.prototype.displayQuestion = function () {
    console.log(this.question);
    for (var ans of this.answers) {
        console.log(ans);
    }
}

Question.prototype.isAnswer = function (ans) {

    if (this.correct === ans)
        console.log('Correct!');
    else{
        console.log('Incorrect!');
    }


}

var questions = [
    new Question('Whats 2 + 2?', [
        '9.', '7.', '4.'
    ], 2),
    new Question('What\'s a major in the army # of lines?', [
        '3', '4', '8'
    ], 0),
    new Question('What\'s considered black in Physics', [
        'absence of color', 'all colors', 'none of the above'
    ], 1)
];

var rand = Math.floor(Math.random() * (questions.length - 1));

var quest = questions[rand];
console.log(quest);
quest.displayQuestion();

var answer = parseInt(prompt('Please Select The Correct Answer'));

quest.isAnswer(answer);

*/

function Question(question, answers, answer) {
    this.question = question;
    this.answers = answers;
    this.correct = answer;
}

Question.prototype.displayQuestion = function () {
    console.log(this.question);
    for (var ans of this.answers) {
        console.log(ans);
    }
}

Question.prototype.isAnswer = function (ans, callback) {

    var sc;
    if (this.correct === ans) {
        console.log('Correct!');
        sc = callback(1);
    } else {
        console.log('Incorrect!');
        sc = callback(0);
    }

    this.displayScore(sc);

}
Question.prototype.displayScore = function(score) {
    console.log(score);
}
var questions = [
    new Question('Whats 2 + 2?', [
        '9.', '7.', '4.'
    ], 2),
    new Question('What\'s a major in the army # of lines?', [
        '3', '4', '8'
    ], 0),
    new Question('What\'s considered black in Physics', [
        'absence of color', 'all colors', 'none of the above'
    ], 1)
];

function score() {
    var sc = 0;
    return function (correct) {
        if (correct) 
            sc++;
        return sc;
    }
}

var keep = score();

(function nextQuestion() {
    var rand = Math.floor(Math.random() * (questions.length - 1));

    var quest = questions[rand];
    console.log(quest);
    quest.displayQuestion();

    var answer = prompt('Please Select The Correct Answer');

    if (answer !== 'exit') {
        quest.isAnswer(ParseInt(answer), keep);
        nextQuestion();
    }
})();
