// react stuff
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// TODO add local storage back?
// import SimpleStorage from 'react-simple-storage';
// other
import $ from 'jquery';
import './App.css';
// our firebase config and init export
import firebase from './firebase';

// App components
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import Header from './Header';
import HallOfFame from './HallOfFame';
// TODO NOT WORKING!
// import GoogleCustomSearch from './GoogleCustomSearch';

class App extends Component {

  constructor() {
    super();
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
    this.state = {
      username: '',
      questions: [],
      loading: false,
      showStart: true,
      showQuiz: false,
      showScore: false,
      showScores: false,
      allScores: [],
      currentQuiz: {
        category: '',
        quizLength: 10,
        correct: 0,
        incorrect: 0,
        answered: 0, // init here, reset to 0 every time we start a quiz. increment in handleAnswerSubmission
        time: ''
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

  scores = [
    {name: 'Biff', score: '99%', time: '1:22', category: 'Animals'},
    {name: 'Bob', score: '98%', time: '1:55', category: 'Science'},
    {name: 'DAve', score: '99%', time: '1:22', category: 'Animals'},
    {name: 'Dood', score: '99%', time: '1:22', category: 'Animals'},
    {name: 'What', score: '99%', time: '1:22', category: 'Random'}
  ]

  /**===============================================
                  LIFECYCLE METHODS
  ================================================== */

  // fetch data here, in top level component which
  // should handle data and behavior
  // Keep presentational components de-coupled
  componentDidMount() {
  }


  /**===============================================
                    OTHER METHODS
  ================================================== */

  saveScore = quizScore => {
    quizScore.anotherprop = 'added later';
    console.log('called saveScore', quizScore);

    // 'scores' space in db is where we want this stored
    const scoresRef = firebase.database().ref('scores');
    // send object for storage
    scoresRef.push(quizScore);
  }


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
      showQuiz: true,
      currentQuiz: {
        ...this.state.currentQuiz,
        category: categoryObj.name,
        answered: 0,
        correct: 0,
        incorrect: 0,
        time: ''
      }
    })
    // this.props.history.push('/game');
  }

  // category: '',
  // quizLength: 10,
  // correct: 0,
  // incorrect: 0,
  // answered: 0, // init here, reset to 0 every time we start a quiz. increment in handleAnswerSubmission
  // time: ''


  getQuestions = (categoryObj) => {
    console.log('getQuestions called with cat ', categoryObj)
    const apiUrl = `https://opentdb.com/api.php?amount=${this.state.currentQuiz.quizLength}&category=${categoryObj.key}&difficulty=easy`;
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

  setShowScoreToTrue = () => {
    // setTimeout is a method of Window Object
    // arrow fn uses this= app though
    setTimeout( () => {
      this.setState({showScore: true});
    }, 3000)
  }

  handleAnswerSubmission = (indexOfGuess, indexOfCorrect, questionNumber, e) => {
    e.preventDefault();

      // provide feedback, update state
     if(indexOfCorrect === indexOfGuess){
       this.provideSubmissionFeedback(e.target, 'correct', indexOfCorrect);
       this.setState({
         currentQuiz: {
           ...this.state.currentQuiz,
           correct:this.state.currentQuiz.correct+1,
           unanswered: this.state.currentQuiz.unanswered-1
         }
       })
     } else {
       e.target.classList.add('btn-wrong-answer', 'disabled');
       this.provideSubmissionFeedback(e.target, 'incorrect', indexOfCorrect);
       this.setState({
         currentQuiz: {
           ...this.state.currentQuiz,
           incorrect:this.state.currentQuiz.incorrect+1,
           unanswered: this.state.currentQuiz.unanswered-1
         }
       })
     }

     // if done, go show score
     if(questionNumber >= this.state.currentQuiz.quizLength) {
       this.setShowScoreToTrue();
     } else {
        setTimeout(function(){
          $('.carousel').carousel('next');
        }, 3000)
     }
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
                showScore={this.state.showScore}
                currentQuiz={this.state.currentQuiz}
                currentCategory={this.state.currentQuiz.category}
                currentTime='1:42'
                questions={this.state.questions}
                handleAnswerSubmission={this.handleAnswerSubmission}
                saveScore={this.saveScore}
              />}
            />

            {/* route /scores goes to component scores
              which i could just do ui, then just save to state
               */}
            <Route path='/hall' render={() => <HallOfFame
              scores={this.scores}
            />} />

          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
