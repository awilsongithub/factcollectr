import React from 'react';
import PropTypes from 'prop-types';
import CurrentScore from './CurrentScore';
import Timer from './Timer';
import Carousel from './Carousel';
import Score from './Score';

/**
 * QUIZSCREEN RENDERS EITHER SCORE OR QUIZ
 * TODO refactor play mode jsx into a component so
 * we have 2 components here: score and play
 */

class QuizScreen extends React.Component {

  constructor(props){
    super();
    this.state = {
    }
  }

  componentDidMount(){
    var page = document.body;
    console.log(page)
    page.scrollTop = 0;
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
        <div className='max-width-600'>
          <div className='stats'>

            <div className='text-left'>
              {/* show icon on sm-down */}
              <span className='hidden-md-up category-icon-container'>
                <i className={`flaticon-${this.props.icon}`}></i>
              </span>
              {/* show name on md-up */}
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
  currentCategory: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired
}

export default QuizScreen;
