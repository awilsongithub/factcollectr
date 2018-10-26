// paste back into app.js render
// used before router implementation
//
//
<div className="App">


  {/* adds local storage via plugin. See:
  https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2 */}
  {/* TODO: RE IMPLEMENT with other app.js components at top SO DOESNT BREAK APP <SimpleStorage parent={this} /> */}

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

    {this.state.showStart && StartScreen
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
