import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


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
  //


  /**
   * GRID OF BUTTONS
   * MOBILE GOES TO SINGLE COL
   * CLICK INITS SEARCH ON THAT CATEGORY
   *
   * start GAME WITH ROUTE PARAMS
   * card is a link to url
   * /:category in url is used for fetch
   */


  render() {
    return (

      <div>
        <h2>Choose Category to Start Quiz</h2>
        <div className="row card-deck">

          {this.props.categories.map( (cat, i) =>
            <div className='col-md-6 col-lg-4 col-xl-3'>
              <Link to='/play'>
                <div
                  key={i}
                  className="card card-btn"
                  onClick={(e) => this.props.handleCategorySelection(cat, e)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{cat.name}</h5>
                    {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                  </div>
                </div>
              </Link>
            </div>
          )}

        </div> {/* end deck */}
      </div>









    )
  }

}

StartScreen.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  handleCategorySelection: PropTypes.func.isRequired
}

export default StartScreen;

/* <div>

  <form>

    <div className="form-group">
      <label htmlFor="categorySelect">Category</label>
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
      <label htmlFor="difficultySelect">Difficulty</label>
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
</div> */
