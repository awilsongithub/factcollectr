import React from 'react';
import PropTypes from 'prop-types';

const Answers = props => {

  // console.log('incorrect_answers: ', props.incorrectAnswers)
  const numIncorrect = props.incorrectAnswers.length;
  const randomInsertionPoint = Math.floor(Math.random() * numIncorrect);
  console.log('rrandomInsertionPoint', randomInsertionPoint)
  // console.log(randomInsertionPoint);
  const allAnswers = props.incorrectAnswers.map(a => a); // then we'll add the correct answer...
  allAnswers.splice(randomInsertionPoint, 0, props.correctAnswer)
  // console.log('all answers: ', allAnswers)




  /**
   * splice correct into random location in array
   * incorrec.length + 1 = final array.
   * if 2, we want either 0 or 1. math.random *2 gives 0-1.999.
   * get .floor and > splice(1,0,correctAnswer) else splie(0,0,correctAnswer)
   * if 4, we want either 0,1,2,3 m.r*4 gives 0-3.99. get floor = index
   * save the index used for splice to compare wtih user guess.
   *
   * if guess is correct, tell app.js. call inherited method.
   * updateCurrentScore(correct) > correct++ .
   * display corect, incorrect, unaswered at top in component
   * component = CurrentScore
   */

  return (
    <div>
      {allAnswers.map( (answer, index) =>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={ (e) => props.handleAnswerSubmission(index, randomInsertionPoint, e)}
        >
        {answer}
      </button>
      )}
    </div>
  )
}

Answers.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default Answers;
