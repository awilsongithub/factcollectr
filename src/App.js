import React, { Component } from 'react';
import './App.css';
import QuestionList from './QuestionList';

class App extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true
    }
  }

  /**===============================================
                  LIFECYCLE METHODS
  ================================================== */

  // fetch data here, in top level component which
  // should handle data and behavior
  // Keep presentational components de-coupled
  componentDidMount() {
    if(this.state.questions.length === 0){
      this.getQuestions();
    }
  }

  /**===============================================
                    OTHER METHODS
  ================================================== */

  getQuestions = () => {
    console.log('getQuestions called')
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      // .then(json => console.log(json))
      .then(json => {
        console.log('json received', json);
        this.setState({
          questions: json.results,
          loading: false
        });
      })
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

          <QuestionList
            questions={this.state.questions}
          />

        </div>
        
      </div>
    );
  }
}

export default App;
