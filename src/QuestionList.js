import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';


const QuestionList = props => {
  var output;

  // decide what is our output?
  if(props.questions.length === 0 && props.loading === false) {
    output = null;
  } else if(props.questions.length === 0 && props.loading === true){
    output = (<div><h4>Loading...</h4></div>)
  } else {
    output = (
      <div className='row card-deck'>
        {props.questions.map( (question, index) =>

          <Question
            key={index}
            question={question.question}
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers}
            handleAnswerSubmission={props.handleAnswerSubmission}
          />


        )}
      </div>
    )
  }

  // return our output
  return (<div>{output}</div>)
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default QuestionList;
