"use strict"

const questionPerQuiz = 5;
const quizMaterial = baseball;
let questionList = [];
let thisQuiz = { currentQuestion: 0,
                 correctQuestions: 0,
                 incorrectQuestions: 0};


function generateQuestionAnswerString(q) {
 
	let randomAnswers = [0,1,2,3];
	shuffleList(randomAnswers);

	return 	`
  <legend data-item-id="${q.qid}">${q.question}</legend>
  <div>	
	<input data-item-id="${q.answers[randomAnswers[0]].aid}" type="radio" name="format" id="quiz" value="${q.answers[randomAnswers[0]].answer}" unchecked>
	<label for="quiz">${q.answers[randomAnswers[0]].answer}</label>
   </div>
   <div>	
	<input data-item-id="${q.answers[randomAnswers[1]].aid}" type="radio" name="format" id="quiz" value="${q.answers[randomAnswers[1]].answer}" unchecked>
	<label for="quiz">${q.answers[randomAnswers[1]].answer}</label>
   </div>
   <div>	
	<input data-item-id="${q.answers[randomAnswers[2]].aid}" type="radio" name="format" id="quiz" value="${q.answers[randomAnswers[2]].answer}" unchecked>
	<label for="quiz">${q.answers[randomAnswers[2]].answer}</label>
   </div>
   <div>	
	<input data-item-id="${q.answers[randomAnswers[3]].aid}" type="radio" name="format" id="quiz" value="${q.answers[randomAnswers[3]].answer}" unchecked>
	<label for="quiz">${q.answers[randomAnswers[3]].answer}</label>
   </div> 
   <div class="js-submit-answer">
	 <button class="input-button js-input-button" type="button" disabled>Submit Answer</button>
    </div>
   `;
}

function generateResponseAnswerString(q, truth) {
 
	let truthStatement = (truth) ? 'Correct!&nbsp;&nbsp;&nbsp;':  'Incorrect:&nbsp;&nbsp;&nbsp;';

	console.log(q);

	return 	`
		<legend>${truthStatement} ${q.response}</legend>
		<div class="js-next-question">
			<button class="input-button js-input-button" type="button">Next</button>
		</div>
   `;

}

function renderQuestion (questionObject) {

	   /* send the object from the quizMaterial to generate the HTML */
	   const questionAnswerString = generateQuestionAnswerString(questionObject);

	   $('.js-ask-question').show();
	   $('.js-display-question').html(questionAnswerString);
	   $('.js-display-question input').attr('disabled', false);
	  /* $('.js-display-response').html(" "); */
	   $('.js-display-question').show();
	   $('.js-display-response').hide();

}

function renderResponse (questionObject, truth) {

		/* send the object from the quizMaterial to generate the HTML */
		const responseAnswerString = generateResponseAnswerString(questionObject, truth);

		disableSubmittingAnotherAnswer();
		$('.js-display-response').html(responseAnswerString);
		$('.js-display-response').show();
}

function shuffleList(arr) {
		/* Fisher-Yates shuffle algorithm */
		for (let i = arr.length - 1; i > 0 ;  i--) {
	        let j = Math.floor(Math.random() * (i + 1));
			let t = arr[i];
			arr[i] = arr[j];
			arr[j] = t;
		}
}

function completeQuiz() {

	let finalText = ((thisQuiz.correctQuestions / (thisQuiz.correctQuestions + thisQuiz.incorrectQuestions)) > .79 ) ?
		"You know your baseball!  Start the quiz again to see more questions to test your knowledge." :
		"You have learned some new things about baseball. Start the quiz again to learn even more!";

	 $('.js-start-description').html(finalText);
	 $('.js-start-quiz').show();
	 $('.js-ask-question').hide();
}

function initializeForNewQuiz() {
		thisQuiz.currentQuestion = 0;
		thisQuiz.correctQuestions = 0;
		thisQuiz.incorrectQuestions = 0;

		$('.js-start-quiz').hide();
		displayTotals(0,0,0);
		$('.js-display-question').show();
		$('.js-display-results').show();
		$('#js-currentQuestion').html(thisQuiz.currentQuestion + 1);
		$('#js-totalQuestions').html(questionPerQuiz);
}


function createListOfQuestions(q, m) {
		
	    for (let i = 0; i < m.length; i++) { 
		     q.push(i); 
        }
}


function nextQuestion() {

	$('.js-display-response').on('click', 'button', function(event) {

		 ++thisQuiz.currentQuestion;
		 $('.js-display-response').hide();
		
		  if ( thisQuiz.currentQuestion < questionPerQuiz ) {

			    $('#js-currentQuestion').html(thisQuiz.currentQuestion + 1);
				renderQuestion(quizMaterial[questionList[thisQuiz.currentQuestion]]);
		  }
		  else {
			    completeQuiz();
		  }

	});
}


function checkSubmittedAnswer() {

		$('.js-display-question').on('click', 'button', function(event) {
					
			let answerID = $('.js-display-question input:checked').attr('data-item-id');
			let foundAnswer = false;
			let selectedIsTrue = false;

			for (let x = 0; x < quizMaterial[questionList[thisQuiz.currentQuestion]].answers.length && !foundAnswer; x++) {

				if (quizMaterial[questionList[thisQuiz.currentQuestion]].answers[x].aid === answerID) {
					foundAnswer = true;
					selectedIsTrue = quizMaterial[questionList[thisQuiz.currentQuestion]].answers[x].correct;

					(selectedIsTrue) ? thisQuiz.correctQuestions++ : thisQuiz.incorrectQuestions++;
				}
			}

			renderResponse(quizMaterial[questionList[thisQuiz.currentQuestion]],selectedIsTrue); 
			displayTotals(thisQuiz.currentQuestion, thisQuiz.correctQuestions, thisQuiz.incorrectQuestions);

		});
}

function displayTotals(total, right, wrong) {

	 $('#js-correct').html(right);
	 $('#js-incorrect').html(wrong);
	 $('#js-score').html((right/(++total) * 100).toFixed(1));
}

function enableSubmittingAnswer() {

		$('.js-display-question').on('click', 'input[type=radio]', function(event) {
			$('.js-display-question button').attr('disabled', false);
		});
}

function disableSubmittingAnotherAnswer() {
		$('.js-display-question button').attr('disabled', true);
		$('.js-display-question input').attr('disabled', true);
}

function startNewQuiz() {

		$('.js-start-quiz').click( function() {
	
			initializeForNewQuiz();
			createListOfQuestions(questionList, quizMaterial);
			shuffleList(questionList);
			renderQuestion(quizMaterial[questionList[0]]);
			$('#js-currentQuestion').html(thisQuiz.currentQuestion + 1);
			$('#js-totalQuestions').html(questionPerQuiz);
		});
}

function handleQuiz() {
	  		startNewQuiz();
	  		enableSubmittingAnswer();
			checkSubmittedAnswer();
			nextQuestion();  
}

$(handleQuiz);