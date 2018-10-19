import React from 'react';
import PropTypes from 'prop-types';

const Answers = props => {

  // console.log('incorrect_answers: ', props.incorrectAnswers)
  const answers = [props.correctAnswer, ...props.incorrectAnswers];
  // console.log(answers)

  return (
    <div>
      {answers.map( (answer) =>
        <button type="button" className="btn btn-outline-secondary">{answer}</button>
      )}
    </div>
  )
}

Answers.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.array.isRequired
}

export default Answers;
