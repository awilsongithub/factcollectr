import React from 'react';
import PropTypes from 'prop-types';

const CurrentScore = props => {


  return (
    <div>

      Animals (Easy)
    </div>
  )
}

CurrentScore.propTypes = {
  currentScore: PropTypes.object.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired
}

export default CurrentScore;
