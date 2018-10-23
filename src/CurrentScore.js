import React from 'react';
import PropTypes from 'prop-types';

const CurrentScore = props => {


  return (
    <div>

      <span>Correct: {props.currentScore.correct} </span>
      <span>Incorrect: {props.currentScore.incorrect} </span>
      <span>Unanswered: {props.currentScore.unanswered} </span>

    </div>
  )
}

CurrentScore.propTypes = {
  currentScore: PropTypes.object.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired
}

export default CurrentScore;
