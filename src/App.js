// react stuff
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// TODO add local storage back?
// import SimpleStorage from 'react-simple-storage';
// other
import $ from 'jquery';
import './App.css';
// our firebase config-init and auth modules
import firebase, { auth, provider } from './firebase';


// App components
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import Header from './Header';
import HallOfFame from './HallOfFame';
// TODO NOT WORKING!
// import GoogleCustomSearch from './GoogleCustomSearch';

// trivia question categories
import categoriesArray from './categories.json';

// computers
// sports
// history
// entertainment (music)
// comics
// anime & manga
// video games
// board games
// mythology
// books     10
// art
// celebrities
// politics
// general knowledge     9
// science (gadgets)



class App extends Component {

  constructor() {
    super();
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
    this.state = {
      username: '',
      user: null, // nobody is authenticated initially
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

  categories = categoriesArray;

  // categories = [
  //   {name: 'Random', key: ''},
  //   {name: 'Animals', key: '27'},
  //   {name: 'Science & Nature', key: '17'},
  //   {name: 'Geography', key: '22'},
  //   {name: 'Television', key: '14'},
  //   {name: 'Movies', key: '11'}
  // ]






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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }


  /**===============================================
                    OTHER METHODS
  ================================================== */

  login = () => {
    alert('login called')
    auth.signInWithPopup(provider) // provider = Google Auth Provider
      .then((result) => {
        const user = result.user; // gooogle user name, photo etc.
        this.setState({ user });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({ user: null });
      });
  }

  saveScore = quizScore => {
    quizScore.anotherprop = 'added later';
    console.log('called saveScore', quizScore);
    // 'scores' space in db is where we want this stored
    const scoresRef = firebase.database().ref('scores');
    // send object for storage
    scoresRef.push(quizScore);
  }


  handleCategorySelection = (categoryObj) => {
    this.setState({
      questions: []
    })
    console.log('handling cat string', categoryObj)
    this.startQuiz(categoryObj);
  }

  startQuiz = (categoryObj) => {
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


  getQuestions = (categoryObj) => {
    console.log('getQuestions called with cat ', categoryObj)
    const len = this.state.currentQuiz.quizLength;
    const cat = categoryObj.id;
    const apiUrl = `https://opentdb.com/api.php?amount=${len}&category=${cat}`;

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

  provideSubmissionFeedback = (target, guess, indexOfCorrect) => {
    const userGuessBtn = $(target);
    const allBtns = userGuessBtn.siblings().addBack();
    const correctAnswerBtn = allBtns.get(indexOfCorrect);
    // allBtns.addClass('disabled');
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

  render() {

    return (

      <BrowserRouter>
        <div className="App container">

          <Route render={() => <Header
              user={this.state.user}
              login={this.login}
              logout={this.logout}
            />}
          />


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
