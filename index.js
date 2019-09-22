"use strict"

const questionPerQuiz = 5;   /* variable for the length of quiz */
const quizMaterial = baseball;  /* variable for the content of the quiz in quiz.js*/
let questionList = [];   /* randomized list of indexes to access the quiz content */

function startNewQuiz(thisQuiz) {

	console.log("startNewQuiz");
	$('.js-start-button').click( function() {
		console.log("insideStartNewQuiz");
		initializeQuiz(thisQuiz);
		renderQuestion(quizMaterial[questionList[thisQuiz.current]]);
	});
}

function initializeQuiz(thisQuiz) {
	thisQuiz.current = 0;
	thisQuiz.right = 0;
	thisQuiz.wrong = 0;
	questionList = [];

	$('.js-start-quiz').hide();   /* hide the start button */
	$('.js-ask-question').show(); /* show the question and answer section now */
	updateScoreBoard(thisQuiz, 
					 questionPerQuiz);  /* display the scoreboard */

    /* randomize the quiz material to keep the quiz interesting */
	createListOfQuestions(questionList, quizMaterial);
	shuffleList(questionList);
}


function updateScoreBoard(thisQuiz, total) {

	let score = (thisQuiz.current === 0) ? 0 : (thisQuiz.right / (thisQuiz.right + thisQuiz.wrong)) * 100;
	$('#js-currentQuestion').html(thisQuiz.current + 1);  /*currentQuestion is an arry pointer */
	$('#js-totalQuestions').html(total);
	$('#js-correct').html(thisQuiz.right);
	$('#js-incorrect').html(thisQuiz.wrong);
	$('#js-score').html(score);
	$('.js-display-results').show();
}

/*-- RANDOMIZE question from question library to make quiz interesting --*/
function createListOfQuestions(q, m) {
	for (let i = 0; i < m.length; i++) { 
		 q.push(i); 
	}
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
/* --------------------------------------------------------------------- */


function renderQuestion (questionObject) {

	/* send the object from the quizMaterial to generate the HTML */
	const questionAnswerString = generateQuestionAnswerString(questionObject);

	/* render the HTML */
	$('.js-display-question').html(questionAnswerString);
	$('.js-display-question').show();
	$('.js-display-response').hide();
}

function generateQuestionAnswerString(q) {

	/*  randomize the radio button content to make the quiz more interesting */
	let randomAnswers = [0,1,2,3];
	shuffleList(randomAnswers);

	return 	`
 	<fieldset>
	 	<div>
			  <legend aria-live="assertive" >${q.question}</legend>
	 	</div>
		<div>
		 	<input  checked id="option1" type="radio" name="options"  value="${q.answers[randomAnswers[0]].answer}" data-item-id="${q.answers[randomAnswers[0]].aid}">
			<label         for="option1">${q.answers[randomAnswers[0]].answer}</label>
			<br/>
			<input  id="option2" type="radio" name="options"  value="${q.answers[randomAnswers[1]].answer}" data-item-id="${q.answers[randomAnswers[1]].aid}">
			<label for="option2">${q.answers[randomAnswers[1]].answer}</label>
			<br/>
			<input  id="option3" type="radio" name="options" value="${q.answers[randomAnswers[2]].answer}" data-item-id="${q.answers[randomAnswers[2]].aid}">
			<label for="option3">${q.answers[randomAnswers[2]].answer}</label>
			<br/>
			<input  id="option4" type="radio" name="options" value="${q.answers[randomAnswers[3]].answer}" data-item-id="${q.answers[randomAnswers[3]].aid}">
			<label for="option4">${q.answers[randomAnswers[3]].answer}</label></div>
  		<div class="js-submit-answer">
	 		<button class="input-button js-input-button" type="submit">Submit Answer</button>
		</div>
	</fieldset>
   `;
}

function generateResponseAnswerString(q, truth) {
 
	let truthStatement = (truth) ? 'Correct!&nbsp;&nbsp;&nbsp;':  'Incorrect:&nbsp;&nbsp;&nbsp;';

	console.log(q);

	return 	`
		<legend aria-live="rude">${truthStatement} ${q.response}</legend>
		<div class="js-next-question">
			<button class="input-button js-input-button" type="button">Next</button>
		</div>
   `;

}



function renderResponse (questionObject, truth) {

		/* send the object from the quizMaterial to generate the HTML */
		const responseAnswerString = generateResponseAnswerString(questionObject, truth);

		disableSubmittingAnotherAnswer();
		$('.js-display-response').html(responseAnswerString);
		$('.js-display-response').show();
}



function completeQuiz(thisQuiz) {

	let score = (thisQuiz.right / (thisQuiz.right + thisQuiz.wrong)) * 100;
	let finalText =  (score > 79 ) ?
		`Your score is ${score}%.  You know your baseball!  Start the quiz again to see more questions to test your knowledge.` :
		`Your score is ${score}%.  You have learned some new things about baseball. Start the quiz again to learn even more!`;

	 $('.js-start-description').html(finalText);
	 $('.js-start-quiz').show();
	 $('.js-ask-question').hide();
}



function nextQuestion(thisQuiz) {

	$('.js-display-response').on('click', 'button', function(event) {

		 ++thisQuiz.current;  /* increment the question */
		 $('.js-display-response').hide();
		
		  if ( thisQuiz.current < questionPerQuiz ) {
			    updateScoreBoard(thisQuiz, 
			    				 questionPerQuiz);  /* display the scoreboard */
				renderQuestion(quizMaterial[questionList[thisQuiz.current]]);
		  }
		  else {
			    completeQuiz(thisQuiz);
		  }

	});
}


function checkSubmittedAnswer(thisQuiz) {

		console.log($('.js-display-question'));

		
		$('#js-question').on('submit', function(event) {
			
			console.log("Inside the submit button action");

			event.preventDefault();  // ignore default responses for form 


			let answerID = $('.js-display-question input:checked').attr('data-item-id');
			let foundAnswer = false;
			let selectedIsTrue = false;

			
			for (let x = 0; x < quizMaterial[questionList[thisQuiz.current]].answers.length && !foundAnswer; x++) {

				if (quizMaterial[questionList[thisQuiz.current]].answers[x].aid === answerID) {
					foundAnswer = true;
					selectedIsTrue = quizMaterial[questionList[thisQuiz.current]].answers[x].correct;

					(selectedIsTrue) ? thisQuiz.right++ : thisQuiz.wrong++;
				}
			}

			renderResponse(quizMaterial[questionList[thisQuiz.current]],selectedIsTrue); 
			updateScoreBoard(thisQuiz, 
							 questionPerQuiz);  /* display the scoreboard */

		});
}


function disableSubmittingAnotherAnswer() {
		$('.js-display-question button').attr('disabled', true);
		$('.js-display-question input').attr('disabled', true);
}


function handleQuiz() {

	let thisQuiz = { current: 0,
					 right: 0,
					 wrong: 0
					};

	startNewQuiz(thisQuiz);
	checkSubmittedAnswer(thisQuiz);
	nextQuestion(thisQuiz);  
}

$(handleQuiz);