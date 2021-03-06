import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

/**
 * THE QUESTION COMPONENT HTML IS A BOOTSTRAP CARD
 * WE REPLACE ENCODED CHARACTERS IN QUESTIONS AND Answers
 * AND SET ACTIVE CLASS IF AT FIRST QUESTION
 * ANSWERS ARE A SEPARATE NESTED COMPONENT 
 */
const Question = props => {

  const question = props.question
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  const correct = props.correctAnswer
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  const incorrect = props.incorrectAnswers.map(function(answer){
    return answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  })

  const carouselItemClass = (props.questionNumber === 1 ) ? 'carousel-item active' : 'carousel-item';

  return (

    <div className={carouselItemClass}>
      <div className="card">
        <div className="card-body">
          <p className="card-text">{question}</p>

          <Answers
            questionNumber={props.questionNumber}
            correctAnswer={correct}
            incorrectAnswers={incorrect}
            handleAnswerSubmission={props.handleAnswerSubmission}
          />

        </div>
      </div>
    </div>


    // OLD MULTI CARD LAYOUT
    // <div className='col-sm-4'>
    //   <div className="card">
    //     <div className="card-body">
    //       <p className="card-text">{question}</p>
    //
    //       <Answers
    //         correctAnswer={correct}
    //         incorrectAnswers={incorrect}
    //         handleAnswerSubmission={props.handleAnswerSubmission}
    //       />
    //
    //     </div>
    //   </div>
    // </div>
  )
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.array.isRequired
}

export default Question;
