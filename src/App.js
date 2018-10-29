// react stuff
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// TODO add local storage back?
// import SimpleStorage from 'react-simple-storage';
// other
import $ from 'jquery';
import './App.css';
// App components
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import Header from './Header';
// TODO NOT WORKING!
// import GoogleCustomSearch from './GoogleCustomSearch';

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
  //   const script = document.createElement('script');
  //
  // }


  /**===============================================
                    OTHER METHODS
  ================================================== */

  handleCategorySelection = (categoryObj) => {
    console.log('handling cat string', categoryObj)
    this.startQuiz(categoryObj);

    // setState of showQuiz: true
    // in render of app, if(this.state.showQuiz === true){
    // return <Redirect to='/game' /> }
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
    // this.props.history.push('/game');
  }


  getQuestions = (categoryObj) => {
    console.log('getQuestions called with cat ', categoryObj)
    const apiUrl = `https://opentdb.com/api.php?amount=20&category=${categoryObj.key}&difficulty=easy`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(response => response.results)
      .then(results => {
        console.log('json received', results);
        this.setState({
          currentCategory: categoryObj.name,
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

  provideSubmissionFeedback = (target, guess, indexOfCorrect) => {
    const userGuessBtn = $(target);
    const allBtns = userGuessBtn.siblings().addBack();
    const correctAnswerBtn = allBtns.get(indexOfCorrect);
    allBtns.addClass('disabled');
    if(guess === 'correct'){
      userGuessBtn.addClass('btn-correct');
    } else {
      userGuessBtn.addClass('btn-wrong');
        $(correctAnswerBtn).addClass('btn-correct-animate');
    }
  }

  handleAnswerSubmission = (indexOfGuess, indexOfCorrect, e) => {
    e.preventDefault();

     if(indexOfCorrect === indexOfGuess){
       this.provideSubmissionFeedback(e.target, 'correct', indexOfCorrect);
       this.setState({
         currentScore: {
           ...this.state.currentScore,
           correct:this.state.currentScore.correct+1,
           unanswered: this.state.currentScore.unanswered-1
         }
       })
     } else {
       e.target.classList.add('btn-wrong-answer', 'disabled');
       this.provideSubmissionFeedback(e.target, 'incorrect', indexOfCorrect);
       this.setState({
         currentScore: {
           ...this.state.currentScore,
           incorrect:this.state.currentScore.incorrect+1,
           unanswered: this.state.currentScore.unanswered-1
         }
       })
     }

      // move to next carousel/question after delay
      setTimeout(function(){
        $('.carousel').carousel('next');
      }, 3000)


  }

  /**
   * IMPLEMENTING REACT ROUTER
   * npm install, import router components
   * browserRouter,
   * new Header always (with nav)
   * / (home) StartScreen, rename home?
   * /play > QuizScreen rename play?
   * /scores new
   */

  render() {

    return (

      <BrowserRouter>
        <div className="App container">
          <Route component={Header} />

          <Switch>
            <Route exact path="/" render={() => <StartScreen
                startQuiz={this.startQuiz}
                categories={this.categories}
                handleCategorySelection={this.handleCategorySelection}
              />}
            />
            <Route path="/play" render={() =>   <QuizScreen
                currentScore={this.state.currentScore}
                currentCategory={this.state.currentCategory}
                currentTime='1:42'
                questions={this.state.questions}
                handleAnswerSubmission={this.handleAnswerSubmission}
              />}
            />
          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
