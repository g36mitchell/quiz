# quiz

Play a baseball quiz and see how much you know about this historical game.

Pseudo Code

Event detect - Start or Restart the Quiz
   Hide the Start button.
   Results = 0;
   getQuestionIDsRandomized();  shuffle(array of the ids) /*  will only be using the first x of them */
   renderQuestion(); 
        getQuestionAnswersRandomized(1);
        maintainSummary();
        generateQuestion();

Event detect - answer selected
    enableSubmitAnswer();

Event detect - submit answer
    checkAnswer();
    displayAnswerResultText();

Event detect - next question
    maintainSummary();
    if more questions then
        generateQuestion();
    else
        displayResultAndStart(); 

