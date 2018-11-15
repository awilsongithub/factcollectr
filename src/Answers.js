import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {

  constructor(props){
    super();

    // Shuffle correct and incorrect answers randomly for each question
    this.randomInsertionPoint =  Math.floor( Math.random()*props.incorrectAnswers.length + 1);
    this.shuffledAnswers = props.incorrectAnswers.map(a => a); // then we'll add the correct answer...
    this.shuffledAnswers.splice(this.randomInsertionPoint, 0, props.correctAnswer)
  }

  // prevent reshuffling of answers on user guess
  shouldComponentUpdate(nextProps){
    const differentAnswers = this.props.correctAnswer !== nextProps.correctAnswer;
    return differentAnswers;
  }

  // render buttons for each answer.
  // register click handler to check user guess
 render(){
   return (
     <div>
       {this.shuffledAnswers.map( (answer, index) =>
         <button
           key={index}
           type="button"
           className="btn btn-outline-secondary"
           onClick={ (e) => this.props.handleAnswerSubmission(index, this.randomInsertionPoint, this.props.questionNumber, e)}
         >
        {answer}
       </button>
       )}
     </div>
   )
 }

}

Answers.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.array.isRequired,
  handleAnswerSubmission: PropTypes.func.isRequired
}

export default Answers;
