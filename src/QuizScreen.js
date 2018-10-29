import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList';
import CurrentScore from './CurrentScore';
import Timer from './Timer';
import Carousel from './Carousel';

class QuizScreen extends React.Component {

  constructor(props){
    super();
    this.state = {}
  }

  render() {
    return (
      <div>

        <div className='stats'>
          <div>
            <span>Category: </span>
            {this.props.currentCategory}
          </div>
          <Timer />
          <CurrentScore
            currentScore={this.props.currentScore}
            currentCategory='General'
            currentTime='1:42'
          />
        </div>


        <Carousel
          questions={this.props.questions}
          handleAnswerSubmission={this.props.handleAnswerSubmission}
        />

        {/* <QuestionList
          questions={this.props.questions}
          handleAnswerSubmission={this.props.handleAnswerSubmission}
        /> */}

      </div>
    )
  }

}

QuizScreen.propTypes = {
  currentScore: PropTypes.object.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default QuizScreen;
