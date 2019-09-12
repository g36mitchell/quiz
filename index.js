"use strict"

const questionPerQuiz = 5;
const quizMaterial = baseball;
let questionList = [];
let currentQuestion = 0;
let correctQuestions = 0;
let incorrectQuestions = 0;


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
	 <button class="input-button" type="button" disabled>Submit Answer</button>
    </div>
   `;
}


  function renderQuestion (questionObject) {

	   /* send the object from the quizMaterial to generate the HTML */
	   console.log(questionObject);
	   const questionAnswerString = generateQuestionAnswerString(questionObject);

	   $('.js-display-question').html(questionAnswerString);
	   
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

	function toggleQuestionSection(sectionClass) {
		$('.js-ask-question').toggle();
	}

	function toggleQuizResultsSection(sectionClass) {
		$('.js-display-results').toggle();
	}	

   function toggleStartButton() {
	   $('.js-get-started').toggle();
   }

   function initializeForNewQuiz() {
		currentQuestion = 0;
		correctQuestions = 0;
		incorrectQuestions = 0;
		toggleStartButton();
		toggleQuizResultsSection();
   }

   function createListOfQuestions(q, m) {
		
	    for (let i = 0; i < m.length; i++) { 
		     q.push(i); 
        }
   }

   function enableSubmittingAnswer() {

		$('.js-display-question').on('click', 'input[type=radio]', function(event) {
			
			console.log("radio clicked answer to be selected.");

		});

   }

   function startQuiz() {

		$('.js-start-quiz').click( function() {
	
			initializeForNewQuiz();
			createListOfQuestions(questionList, quizMaterial);
			console.log(questionList);
			shuffleList(questionList);
			console.log(questionList);
        	renderQuestion(quizMaterial[questionList[0]]);
		});
   }

   function handleQuiz() {

	  startQuiz();
	  enableSubmittingAnswer();

   }

$(handleQuiz);