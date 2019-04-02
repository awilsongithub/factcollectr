import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

/**
 * CALCULATE & DISPLAY GAME STATS
 */
const Score = props => {

  const quizScore = {};
  quizScore.decimal = props.currentQuiz.correct/props.questions.length;
  quizScore.percentString = quizScore.decimal * 100 + '%';
  quizScore.category = props.currentQuiz.category;
  quizScore.time = props.currentQuiz.time;
  quizScore.date = new Date().toLocaleDateString('en-US');

  var message = {};
  var c = props.currentQuiz.correct;
  if (c === 10) { 
    message.title = 'Polymathtacular!';
    message.subtitle = 'Perfect score. You either used google or could not be smarter';
    message.icon = 'joyful';
  } else if (c >= 8) {
    message.title = 'Factastic!';
    message.subtitle = 'Use the web while you play to go for a perfect score.';
    message.icon = 'happy';
  } else if (c < 8 && c >= 5){
    message.title = 'Nice Job!';
    message.subtitle = ' Search engines are a good bet for boosting your score.';
    message.icon = 'sceptic';
  } else {
    message.title = 'Tough Luck.';
    message.subtitle = 'Why does this API have such tough questions?';
    message.icon = 'angry';
  }

  if (props.user) {
    quizScore.userName = props.user.displayName;
    quizScore.userEmail = props.user.email;
    quizScore.userPhotoURL = props.user.photoURL;
  }

  const authToSaveAlert = ()  => {
    alert('Please Log In to save your score.');
  }

  const componentClasses = ['jumbotron', 'scorecard', 'show'];

  setTimeout(() => {
    var sc = document.querySelector('.scorecard');
    console.log(sc);
    sc.classList.add('show');
    console.log('slow')
  }, 100)
  
  return (
  
    <div className="jumbotron scorecard card">
      <div className="container">

        <h1 className='flex-space-between'>
          <span>{message.title}</span>
          <i className={`flaticon-${message.icon}`}></i>
        </h1>
        <p>{message.subtitle}</p>

        <table className='table'>
          <tbody>
            <tr>
              <td>Score:</td>
              <td>{quizScore.percentString}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>9:99</td>
            </tr>
          </tbody>
        </table>
        
        <p>
          {!props.user ?
            <span className="btn btn-primary btn-lg bg-purple" onClick={authToSaveAlert}>Save score</span>
            :
            <NavLink to='/hall' className="btn btn-primary btn-lg bg-purple" onClick={(e) => props.saveScore(quizScore, e)} >Save score</NavLink>
          }
          <NavLink className="btn btn-primary btn-lg bg-grey" to='/'>Take Another Quiz</NavLink>
        </p>

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
