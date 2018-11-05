import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {

  constructor(props){
    super();
    this.randomInsertionPoint =  Math.floor( Math.random()*props.incorrectAnswers.length + 1);
    this.shuffledAnswers = props.incorrectAnswers.map(a => a); // then we'll add the correct answer...
    this.shuffledAnswers.splice(this.randomInsertionPoint, 0, props.correctAnswer)
  }

  // this prevents recalculation of shuffledAnswers which
  // causes buttons to shuffle when click on one initiates a state change
  shouldComponentUpdate(nextProps){
    const differentAnswers = this.props.correctAnswer !== nextProps.correctAnswer;
    return differentAnswers;
  }

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
