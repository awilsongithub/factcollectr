import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Score = props => {

  const quizScore = {};
  quizScore.decimal = props.currentQuiz.correct/props.questions.length;
  quizScore.percentString = quizScore.decimal * 100 + '%';
  quizScore.category = props.currentQuiz.category;
  // TODO save as number of seconds? or usable format? use moment?
  quizScore.time = props.currentQuiz.time;
  quizScore.date = 'fake date'
  quizScore.userName = props.user.displayName;
  quizScore.userEmail = props.user.email;
  quizScore.userPhotoURL = props.user.photoURL;
  console.log('quizScore', quizScore);

  return (
    <div>

    <div className="card" >
      <div className="card-body">

        <div class='row'>

          <div class='col-sm-12 col-md-4'>
            <h2 className="card-title">
              Score: {quizScore.percentString}
            </h2>
          </div>

          <div class='col-sm-12 col-md-4 text-center'>
            <h2 className="card-title">
              Time: TODO
            </h2>
          </div>

          <div class='col-sm-12 col-md-4 text-right'>
            <NavLink to='/hall' className="btn btn-primary" onClick={(e) => props.saveScore(quizScore, e)}>
            Save to Hall of Fame
            </NavLink>
          </div>

        </div>

      </div>
    </div>

    </div>
  )
}

Score.propTypes = {
  saveScore: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  currentQuiz: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired
}

export default Score;
