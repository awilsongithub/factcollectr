import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList';
import CurrentScore from './CurrentScore';
import Timer from './Timer';
import Carousel from './Carousel';
import Score from './Score';

class QuizScreen extends React.Component {

  constructor(props){
    super();
    this.state = {}
  }

  // TODO PUT timer component back in beforre <CurrentScore />
  // took it out as it had a bug.

  // TODO refactor play mode jsx into a component so
  // we have 2 components here: score and play
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
              <span>Category: </span>
              {this.props.currentCategory}
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
  currentCategory: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
}

export default QuizScreen;
