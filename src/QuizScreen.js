import React from 'react';
import PropTypes from 'prop-types';
import CurrentScore from './CurrentScore';
import Timer from './Timer';
import Carousel from './Carousel';
import Score from './Score';

/**
 * QUIZSCREEN IS BASICALLY A CONTAINER THAT RENDERS EITHER
 * SCORE OR A COLLECTION OF COMPONENTS MAKING UP THE QUIZ MODE UI
 * CONDITIONALLY BASED ON SHOWSCORE: TRUE/FALSE
 *  TODO refactor play mode jsx into a component so
 *  we have 2 components here: score and play
 */
class QuizScreen extends React.Component {

  constructor(props){
    super();
    this.state = { }
  }

  render() {
    if(this.props.showScore === true) {
      return (
        <Score
          currentQuiz={this.props.currentQuiz}
          questions={this.props.questions}
          saveScore={this.props.saveScore}
          user={this.props.user}
        />
      )
    } else {
      return (
        <div>
          <div className='stats'>

            <div className='text-left'>
              
              {/* on mobile show category icon instead of name */}
              <span className='hidden-md-up'>
                <i className={`flaticon-${this.props.categories[2].icon}`}></i>
              </span>

              <span className='hidden-sm-down'>
                {this.props.currentCategory}
              </span>
            </div>

            <CurrentScore
              currentScore={this.props.currentQuiz}
              currentCategory='General'
              currentTime='1:42'
            />

            <div className='text-right'>
              <Timer />
            </div>

          </div>

          <Carousel
            questions={this.props.questions}
            handleAnswerSubmission={this.props.handleAnswerSubmission}
          />
        </div>
      )
    }

  }

}

QuizScreen.propTypes = {
  showScore: PropTypes.bool.isRequired,
  currentQuiz: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
}

export default QuizScreen;
