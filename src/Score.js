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

        <div class='row'>

          <div class='col-sm-12 col-md-4'>
            <h2 className="card-title">
              Score: {quizScore.percentString}
            </h2>
          </div>

          <div class='col-sm-12 col-md-4'>
            <h2 className="card-title">
              Time: 9:99
            </h2>
          </div>

          <div class='col-sm-12 col-md-4'>
            <a href="#" className="btn btn-primary" onClick={(e) => props.saveScore(quizScore, e)}>
              Save to Hall of Fame
            </a>
          </div>

        </div>




        <h2 class="card-title">Quiz Recap</h2>
        
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small class="text-muted">Donec id elit non mi porta.</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small class="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>




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
