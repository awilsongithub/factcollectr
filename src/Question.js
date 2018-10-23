import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

const Question = props => {

  const question = props.question
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '"');

  const correct = props.correctAnswer
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '"');

  const incorrect = props.incorrectAnswers.map(function(answer){
    return answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, '"');
  })

  return (
    <div className='col-sm-4'>
      <div className="card">
        <div className="card-body">
          <p className="card-text">{question}</p>

          <Answers
            correctAnswer={correct}
            incorrectAnswers={incorrect}
            handleAnswerSubmission={props.handleAnswerSubmission}
          />

        </div>
      </div>
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.array.isRequired
}

export default Question;
