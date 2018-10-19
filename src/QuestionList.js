import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

const QuestionList = props => {
  var output;

  if(props.questions.length === 0){
    output = (<div><h4>Loading...</h4></div>)
  } else {
    output = (
      <div className='row'>
        {props.questions.map( (question, index) =>
          <div className='col-sm-4'>
            <div className="card">
              <div className="card-body">
                {/* <h5 className="card-title">{question.question}</h5> */}
                <p className="card-text">{question.question}</p>




                <Answers
                  correctAnswer={question.correct_answer}
                  incorrectAnswers={question.incorrect_answers}
                  handleAnswerSubmission={props.handleAnswerSubmission}
                />

              </div>
            </div>
          </div>
        )}
      </div>
    )
  }



  return (<div>{output}</div>)
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default QuestionList;
