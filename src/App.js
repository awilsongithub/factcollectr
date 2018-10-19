import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     questions: []
  //   }
  // }
  state = {
    questions: []
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
    fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy')
      .then(response => response.json())
      // .then(json => console.log(json))
      .then(json => {
        console.log('json received', json);
        this.setState({
          questions: json.results
          // loading: false
        });
      })
      .then(setTimeout(this.generateQuestionCards, 2000))

  }



  generateQuestionCards = () =>  {
    // this.output = <div>hello</div>
    console.log('generate called');
    // console.log(this.state.questions[0].category)
    this.output = (
      <div>
        {this.state.questions.map(q =>
          <div>hello </div>
        )}
      </div>
    )

    // if(this.state.questions.length === 0){
    //   output = (
    //     <div>
    //       <h4>Loading...</h4>
    //     </div>
    //   )
    // } else {
    //   output = (
    //
    //     {this.state.questions.map( (q, index) =>
    //
    //       <div className='col-sm-4'>
    //         <div className="card">
    //           <div className="card-body">
    //             <h5 className="card-title">Cats have whiskers under their paws.</h5>
    //             <button type="button" className="btn btn-outline-primary">True</button>
    //             <button type="button" className="btn btn-outline-secondary">False</button>
    //           </div>
    //         </div>
    //       </div>
    //
    //     )}
    //
    //   )
    // }
  }





  render() {

    return (
      <div className="App">


        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">FactCollectr</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="#">Home<span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link" href="#">Scores</a>
            </div>
          </div>
        </nav>


        <div className='row'>
          {this.output}
        </div>



      </div>
    );
  }
}

export default App;
