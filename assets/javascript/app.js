var panel = $('#quiz-area');
var countStartNumber = 30;
console.log(document);

//Events

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


//You'll create a trivia form with multiple choice or true/false options (your choice).
//Trivia questions

var questions = [ {
  question: "What was the first National Park",
  answers: ["Yosemite", "Yellowstone", "Sequoia", "Grand Canyon"],
  correctAnswer: "Yellowstone"
}, {
  question: "Which national park gets the most visitors every year?",
  answers: ["Yellowstone", "Grand Canyon", "Yosemite", "Great Smokey Mountains"],
  correctAnswer: "Great Smokey Mountains"
}, {
  question: 'What state has the most national parks"?',
  answers: ["Utah", "Alaska", "Colorado", "California"],
  correctAnswer: "California"
}, {
  question: 'Which national park is the largest? ',
  answers: ["St. Elias", "Denali", "Glacier Bay", "Death Valley"],
  correctAnswer: "St. Elias"
}, {
  question: 'Which national park covers large areas of the Mojave Desert?',
  answers: ["Grand Canyon", "Badlands", "Death Valley", "Joshua Tree"],
  correctAnswer: "Joshua Tree"
}, {
  question: "Which national park features over 2,000 natural sandstone arches?",
  answers: ["Arches", "Canyonlands", "Zion", "Gateway Arch"],
  correctAnswer: "Arches"
}, {
  question: "What national park is home to 36 protected species including the panther?",
  answers: ["North Cascades", "Redwood", "Everglades", "Pinnacles"],
  correctAnswer: "Everglades"
}];



//The player will have a limited amount of time to finish the quiz.
//Don't let the player pick more than one answer per question.
//Don't forget to include a countdown timer
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
}; 
