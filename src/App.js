import React, { Component } from 'react';
import './App.css';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';

class App extends Component {

  constructor() {
    super();
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
    this.state = {
      questions: [],
      loading: false,
      showStart: true,
      showQuiz: false,
      showScores: false,
      currentScore: {
        correct: 0,
        incorrect: 0,
        unanswered: 10
      }

    }
  }

  categories = [
    {name: 'Any Category', key: ''},
    {name: 'General Knowledge', key: '9'},
    {name: 'Science & Nature', key: '17'}
  ]

  /**===============================================
                  LIFECYCLE METHODS
  ================================================== */

  // fetch data here, in top level component which
  // should handle data and behavior
  // Keep presentational components de-coupled
  // componentDidMount() {
  //   if(this.state.questions.length === 0){
  //     this.getQuestions();
  //   }
  // }

  /**===============================================
                    OTHER METHODS
  ================================================== */

  startQuiz = (e) => {
    e.preventDefault();
    this.getQuestions();
    this.setState({
      loading: true,
      showStart: false,
      showQuiz: true
    })
  }


  getQuestions = () => {
    console.log('getQuestions called')
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(response => response.results)
      // .then(response => response.results)

      // .then(json => console.log(json))
      .then(results => {
        console.log('json received', results);
        this.setState({
          questions: results,
          loading: false
        });
      });
  }

  /**
   // REMOVE ENCODING FROM STRINGS IN API RESPONSE
   // iterate array and for each obj in it
   // go thru objects props. if prop is string run replace on it.
   // if prop is an array, run replace on each of its elements
   */
  removeCharacterEncodingFromResults = (results) => {
    // iterate array
    const res = results.map( (obj, index) => {
      // iterate each object in it
      for (var prop in obj){
        if (typeof obj[prop] === 'string'){
          obj[prop] = obj[prop].replace(/&quot;/g, '"');
          // return obj[prop];
        }
        if (Array.isArray(obj[prop])){
          var originalArray = obj[prop];
          // iterate subarrays
          const newArr = originalArray.map( (str, index) => {
            return str.replace(/&quot;/g, '"');
            // result[prop][index] = temp;
          });
          obj[prop] = newArr;
        }
      }

    });
    return res;
  }


  handleAnswerSubmission = (index, randomInsertionPoint, e) => {
    e.preventDefault();
    console.log('correct at', randomInsertionPoint)
    console.log('guess at', index )// accurate
    console.log(e)

    // correct if 2 params match
    //  * if guess is correct, tell app.js. call inherited method.
     // * updateCurrentScore(correct) > correct++ .
     // * display corect, incorrect, unaswered at top in component
     // * component = CurrentScore
     if(randomInsertionPoint === index){
       this.setState({
         currentScore: {
           ...this.state.currentScore,
           correct:this.state.currentScore.correct+1,
           unanswered: this.state.currentScore.unanswered-1
         }
       })
     } else {
       this.setState({
         currentScore: {
           ...this.state.currentScore,
           correct:this.state.currentScore.incorrect+1,
           unanswered: this.state.currentScore.unanswered-1
         }
       })
     }

     console.log('current score', this.state.currentScore)


  }

  render() {

    return (
      <div className="App">

        {/* TODO REFACTOR OTU NAVBAR COMPONENT  */}
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="index.js">FactCollectr</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="index.js">Home<span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link" href="index.js">Scores</a>
            </div>
          </div>
        </nav>

        <div className='container'>

          {this.state.showStart &&
            <StartScreen
              startQuiz={this.startQuiz}
              categories={this.categories}
            />
          }

          {this.state.showQuiz &&
            <QuizScreen
              currentScore={this.state.currentScore}
              currentCategory='General'
              currentTime='1:42'
              questions={this.state.questions}
              handleAnswerSubmission={this.handleAnswerSubmission}
            />
          }

        </div>

      </div>
    );
  }
}

export default App;
