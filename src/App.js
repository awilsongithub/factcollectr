// react stuff
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// TODO add local storage back?
// import SimpleStorage from 'react-simple-storage';
// other
import $ from 'jquery';
import './App.css';
// firebase config-init and auth modules
import firebase, { auth, provider } from './firebase';
// App components
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import Header from './Header';
import HallOfFame from './HallOfFame';
// trivia question categories
import categoriesArray from './categories.json';
// TODO NOT WORKING!
// import GoogleCustomSearch from './GoogleCustomSearch';

class App extends Component {

  constructor() {
    super();
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);

    // most of state is handled here at the top level of our app
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

  // TODO: alphabetize categories 
  categories = categoriesArray; // imported


  /**===============================================
                  LIFECYCLE METHODS
  ================================================== */

  // fetch data here
  // top level component should handle most data and behavior
  // Keep presentational components de-coupled
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    this.getAndSetAllScores();
  }

  /**===============================================
                    OTHER METHODS
  ================================================== */

  // This uses firebase Authentication
  // provider = Google Auth Provider
  // which gives us access to google acct email, name, photo
  // some features like saving a score are conditional on authentication
  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({ user });
        this.alertLoginSuccess(); 
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({ user: null });
      });
  }

  alertLoginSuccess = () => {
    let alert = $('.login-success-alert');
    alert.show(500);
    setTimeout(function () {
      alert.hide(500);
    }, 3000);
  }

  getAndSetAllScores = () => {
    const scoresRef = firebase.database().ref('scores');
    scoresRef.once('value', (snapshot) => {
      let t = snapshot.val();
      let newAllScores = [];
      for (let s in t) {
        newAllScores.push({
          id:             s,
          category:       t[s].category,
          date:           t[s].date,
          decimal:        t[s].decimal,
          percentString:  t[s].percentString,
          time:           t[s].time,
          userName:       t[s].userName,
          userEmail:      t[s].userEmail
        })
      }
      this.setState({
        allScores: newAllScores
      });
    })
  }

  // Save scores to firebase 
  saveScore = quizScore => {
    if (!this.state.user) {
      alert('please Log before saving.');
      this.login();
    } else {
      const scoresRef = firebase.database().ref('scores');
      scoresRef.push(quizScore);
      this.getAndSetAllScores(); 
      this.alertScoreSaved(); 
    }
  } 

  alertScoreSaved = () => {
    let alert = $('.new-score-alert');
    alert.show(500);
    setTimeout(function () {
      alert.hide(500);
    }, 3000);
  }

  // handle user click on a quiz category
  handleCategorySelection = (categoryObj) => {
    this.setState({
      questions: []
    })
    this.startQuiz(categoryObj);
  }

  // start quiz. call helper getQuestiosn and reset stats/score values
  startQuiz = (categoryObj) => {
    this.getQuestions(categoryObj);
    this.setState({
      loading: true,
      showStart: false,
      showQuiz: true,
      currentQuiz: {
        ...this.state.currentQuiz,
        category: categoryObj.name,
        icon: categoryObj.icon,
        answered: 0,
        correct: 0,
        incorrect: 0,
        time: ''
      }
    })
    // NOTE: using links instead of history.push
    // this.props.history.push('/game');
  }

  // call the api with several dynamic values in the url:
  // 1. quiz quizLength
  // 2. user selected category
  // on api response, set questions, categ on state
  getQuestions = (categoryObj) => {
    const len = this.state.currentQuiz.quizLength;
    const cat = categoryObj.id;
    const apiUrl = `https://opentdb.com/api.php?amount=${len}&category=${cat}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(response => response.results)
      .then(results => {
        this.setState({
          currentCategory: categoryObj.name,
          questions: results,
          loading: false
        });
      });
  }

  // provide green and/or red animated feedback to user
  provideSubmissionFeedback = (target, guess, indexOfCorrect) => {
    const userGuessBtn = $(target);
    const allBtns = userGuessBtn.siblings().addBack();
    const correctAnswerBtn = allBtns.get(indexOfCorrect);
    if(guess === 'correct'){
      userGuessBtn.addClass('btn-correct-animate');
    } else {
      userGuessBtn.addClass('btn-wrong');
        $(correctAnswerBtn).addClass('btn-correct-animate');
    }
    $('.flaticon-dice').addClass('rotate-center');
  }

  // called when user has answered the final question
  // showScore: true will cause render of Score component
  setShowScore = (value) => {
    // setTimeout is a method of Window Object
    // use arrow fn so this = app (not Window)
    setTimeout( () => {
      this.setState({showScore: value});
    }, 3000)
  }

  // reset these each time we come back to StartScreen
  // so when start another quiz it doesn't skip ahead to showing Score
  resetShowValues = () => {
    this.setState({
      showQuiz: true,
      showScore: false
    })
  }

  // check user guess against correct
  // call helper fn to provide feedback
  // set value for correct so we can provide user score
  // if this was the final question, show Score
  handleAnswerSubmission = (indexOfGuess, indexOfCorrect, questionNumber, e) => {
    e.preventDefault();

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

     if(questionNumber >= this.state.currentQuiz.quizLength) {
       this.setShowScore(true);
     } else {
        setTimeout(function(){
          $('.carousel').carousel('next');
        }, 2000)
     }
  }

  // render using React Router v4
  // various component screens are rendered based on url (path)
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

          {/* ALERTS */}
		  <div class="container position-relative">
 			<span className='login-success-alert alert alert-success' role='alert'>Login successful</span>
            <span className='new-score-alert alert alert-success' role='alert'>New score saved</span>
		  </div>
         
  
          <Switch>

            <Route exact path="/" render={() => <StartScreen
                startQuiz={this.startQuiz}
                categories={this.categories}
                handleCategorySelection={this.handleCategorySelection}
                resetShowValues={this.resetShowValues}
                allScores={this.state.allScores}
              />}
            />

            <Route path="/play" render={() =>   <QuizScreen
                showScore={this.state.showScore}
                currentQuiz={this.state.currentQuiz}
                currentCategory={this.state.currentQuiz.category}
                icon={this.state.currentQuiz.icon}
                currentTime='1:42'
                questions={this.state.questions}
                handleAnswerSubmission={this.handleAnswerSubmission}
                saveScore={this.saveScore}
                user={this.state.user}
              />}
            />

            <Route path='/hall' render={() => <HallOfFame
              allScores={this.state.allScores}
            />} 
            />

          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
