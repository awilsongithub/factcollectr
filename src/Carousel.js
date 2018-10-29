import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';


const Carousel = props => {

  var output;

  // decide what is our output?
  if(props.questions.length === 0 && props.loading === false) {
    output = null;
  } else if(props.questions.length === 0 && props.loading === true){
    output = (<div><h4>Loading...</h4></div>)
  } else {
    output = (

    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <span>Question</span>
      <ol className="carousel-indicators">


        {props.questions.map( (question, index) =>
            <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? 'active' : ''}>
              <span>{index + 1}</span>
              {/* <span className='question-number'>{index}</span> */}

            </li>
        )}


        {/* <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}



      </ol>
      <div className="carousel-inner">



        {props.questions.map( (question, index) =>
          <Question
            questionIndex={index}
            key={index}
            question={question.question}
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers}
            handleAnswerSubmission={props.handleAnswerSubmission}
          />
        )}



      </div>

      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true">Previous</span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true">Next</span>
        <span className="sr-only">Next</span>
      </a>
    </div>



  )
}


  // return our output
  return (<div>{output}</div>)
}

Carousel.propTypes = {
  questions: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default Carousel;
