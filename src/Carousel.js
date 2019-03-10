import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';


const Carousel = props => {

  const dataRide = false;
  var output;

  // determine our output
  // TODO: not sure conditional statements are all working...
  // questions are displayed with a simple bootstrap carousel
  // with customized indicators and event based behaviors
  if(props.questions.length === 0 && props.loading === false) {
    output = null;
  } else if(props.questions.length === 0 && props.loading === true){
    output = (<div><h4>Loading...</h4></div>)
  } else {
    output = (

    <div id="carouselExampleIndicators" className="carousel slide" data-ride={dataRide} data-interval={dataRide}>

      <ol className="carousel-indicators">
        {props.questions.map( (question, index) =>
            <li
              key={index}
              data-target="#carouselExampleIndicators"
              data-slide-to={index}
              className={index === 0 ? 'active' : ''}>
                <span>{index + 1}</span>
            </li>
        )}
      </ol>

      <div className="carousel-inner">
        {props.questions.map( (question, index) =>
          <Question
            key={index}
            questionNumber={index+1}
            question={question.question}
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers}
            handleAnswerSubmission={props.handleAnswerSubmission}
          />
        )}
      </div>

    </div>
  )
}

  return (<div>{output}</div>)
}

Carousel.propTypes = {
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default Carousel;
