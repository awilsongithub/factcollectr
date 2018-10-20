import React from 'react';
import PropTypes from 'prop-types';

class StartScreen extends React.Component {

  constructor(props){
    super();
    this.state = {

    }
  }

  componentDidMount() {
  }

  // saves resources
  componentWillUnmount() {
  }

  // form Pick your challenge
  // select categ.
  // select difficulty
  // start quiz >
  // call for data
  // if data, render questionlist
  // if data/other toggle > hide StartScreen
  //
  render() {
    return (
      <div>
        <form>

          <div className="form-group">
            <label for="categorySelect">Category</label>
            <select className="form-control" id="categorySelect">
              <option>animals</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>animals</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="form-group">
            <label for="difficultySelect">Difficulty</label>
            <select className="form-control" id="difficultySelect">
              <option>Medium</option>
              <option>Gonna need help from Google</option>
              <option>Definitely gonna need help!</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.props.startQuiz}
          >
            Start Quiz
          </button>

        </form>
      </div>
    )
  }

}

StartScreen.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}

export default StartScreen;
