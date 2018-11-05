import React from 'react';
import PropTypes from 'prop-types';

const Score = props => {

  // calculations
  const quizScore = {};
  quizScore.decimal = props.currentQuiz.correct/props.questions.length;
  quizScore.percentString = quizScore.decimal * 100 + '%';
  quizScore.category = props.currentQuiz.category;
  // TODO save as number of seconds? or usable format
  // import moment?
  quizScore.time = props.currentQuiz.time;
  quizScore.date = 'fake date'
  quizScore.user = 'fake user';

  console.log('quizScore', quizScore);

  return (
    <div>

    <div className="card" >
      <div className="card-body">

        <h5 className="card-title">Quiz Score</h5>
        <p className="card-text">Category: {quizScore.category}</p>
        <p className="card-text">Score: {quizScore.percentString}</p>
        <p className="card-text">Time: don't have time yet...</p>
        <a
          href="#"
          className="btn btn-primary"
          onClick={(e) => props.saveScore(quizScore, e)}
        >Save Score to Hall of Fame
        </a>


        <h5 className="card-title">Questions</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Cats have whiskers under their paws and the quistion could be longer than this.
            <br />
            <small>answer</small>
          </li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>





      </div>
    </div>








    </div>
  )
}

Score.propTypes = {
  saveScore: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  currentQuiz: PropTypes.object.isRequired
}

export default Score;
