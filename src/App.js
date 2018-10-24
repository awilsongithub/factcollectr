import React, { Component } from 'react';
import SimpleStorage from 'react-simple-storage';
import $ from 'jquery';
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
    {name: 'Random', key: ''},
    {name: 'Animals', key: '27'},
    {name: 'Science & Nature', key: '17'},
    {name: 'Geography', key: '22'},
    {name: 'Television', key: '14'},
    {name: 'Movies', key: '11'}
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

  handleCategorySelection = (categoryObj) => {
    console.log('handling cat string', categoryObj)
    this.startQuiz(categoryObj)
  }

  startQuiz = (categoryObj) => {
    // e.preventDefault();
    // console.log('startQuiz e', e.target)
    this.getQuestions(categoryObj);
    this.setState({
      loading: true,
      showStart: false,
      showQuiz: true
    })
  }


  getQuestions = (categoryObj) => {
    console.log('getQuestions called with cat ', categoryObj)
    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoryObj.key}&difficulty=easy`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(response => response.results)
      .then(results => {
        console.log('json received', results);
        this.setState({
          questions: results,
          loading: false
        });
      });
  }

  // TODO function to turn btn green/render
  // caled from handleAnswerSubmission
  // on that particular question
  // at the randomInsertionPoint
  // set a class
  //
  //
  //
  //
  //

  provideSubmissionFeedback = (element, guess) => {
    $(element).addClass('disabled');
    $(element).siblings().addClass('disabled');
    if(guess === 'correct'){
      $(element).addClass('btn-correct-answer');
    } else {
      $(element).addClass('btn-wrong-answer');
    }
  }


  handleAnswerSubmission = (index, randomInsertionPoint, e) => {
    e.preventDefault();
    console.log(e);

     if(randomInsertionPoint === index){
       this.provideSubmissionFeedback(e.target, 'correct');
       this.setState({
         currentScore: {
           ...this.state.currentScore,
           correct:this.state.currentScore.correct+1,
           unanswered: this.state.currentScore.unanswered-1
         }
       })
     } else {
       e.target.classList.add('btn-wrong-answer', 'disabled');
       this.provideSubmissionFeedback(e.target, 'incorrect');
       this.setState({
         currentScore: {
           ...this.state.currentScore,
           incorrect:this.state.currentScore.incorrect+1,
           unanswered: this.state.currentScore.unanswered-1
         }
       })
     }

     console.log('current score', this.state.currentScore)


  }

  render() {

    return (
      <div className="App">

        {/* adds local storage via plugin. See:
        https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2 */}
        <SimpleStorage parent={this} />

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

        <div className='container main-content'>

          {this.state.showStart &&
            <StartScreen
              startQuiz={this.startQuiz}
              categories={this.categories}
              handleCategorySelection={this.handleCategorySelection}
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
