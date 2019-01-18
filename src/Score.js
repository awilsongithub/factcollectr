import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * SCORE IS A CARD DISPLAYING THE SCORE AT END OF A QUIZ
 * IT CALCULATES SOME HUMAN FRIENDLY DATA
 * AND FLATTENS THE USER OBJECT INTO 
 * A FEW SPECIFIC PROPS ON QUIZSCORE Object
 * THIS IS BECAUSE THE REACTABLE MODULE USED TO DISPLAY SORTABLE, FILTERABLE Data
 * SEEMS UNABLE TO USE DEEPLY NESTED DATA STRUCTURES?? (SEE TABLE COMPONENT)
 */
const Score = props => {

  const quizScore = {};
  quizScore.decimal = props.currentQuiz.correct/props.questions.length;
  quizScore.percentString = quizScore.decimal * 100 + '%';
  quizScore.category = props.currentQuiz.category;
  // TODO save as number of seconds? or usable format? use moment?
  quizScore.time = props.currentQuiz.time;
  quizScore.date = 'fake date';

  // set message
  var messageTitle;
  var c = props.currentQuiz.correct;
  if (c === 10) { 
    messageTitle = 'Polymathtacular!';
  } else if (c >= 8) {
    messageTitle = 'Factastic! Use the web while you play to go for a perfect score.';
  } else if (c < 8 && c >= 5){
    messageTitle = 'Nice Job! Search engines are a good bet for boosting your score.';
  } else {
    messageTitle = 'Tough Luck. The questions are super hard but Google is your friend.'
  }

  if (props.user) {
    quizScore.userName = props.user.displayName;
    quizScore.userEmail = props.user.email;
    quizScore.userPhotoURL = props.user.photoURL;
  }

  console.log('quizScore', quizScore);

  const authToSaveAlert = ()  => {
    alert('Please Log In to save your score.');
  }

  return (
    <div className='quiz-score-card'>
      <div className="card" >
        <div className="card-body">

          <div className='row'>
            <div className='col-12'>
              <h2 className="card-title">
                {messageTitle}
              </h2>
            </div>
          </div>

          <div className='row'>

            <div className='col-xs-12 col-sm-6'>
              <p>Score: {quizScore.percentString}</p>
              <p>Time: TODO</p>
              <p>Category: {quizScore.category}</p>
            </div>

            <div className='col-xs-12 col-sm-6'>
              {!props.user ?
                <button className="btn btn-primary mb-2" onClick={authToSaveAlert}>Save to Hall of Fame</button>
                :
                <NavLink to='/hall' className="btn btn-primary mb-2" onClick={(e) => props.saveScore(quizScore, e)} >Save to Hall of Fame</NavLink>
              }
              <NavLink className="btn btn-primary" to='/'>Take Another Quiz</NavLink>
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
