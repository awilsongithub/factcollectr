import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * STARTSCREEN RENDERS QUIZ CATEGORIES FROM THE API
 * INTO SMALL CARDS FOR USER CATEGORY SELECTION
 */
class StartScreen extends React.Component {

  constructor(props){
    super();
    this.state = {
    }
  }

  componentDidMount() {
    this.props.resetShowValues();
  }

  render() {
    return (
      <div>
        <h2 className='hero-text'>LET THE QUEST BEGIN</h2>
        <h2 className='text-white'>Choose Category to Start Quiz</h2>
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
                  <i className={`flaticon-${cat.icon}`}></i>
                    <h5 className="card-title">{cat.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          )}

        </div>
      </div>
    )
  }
}

StartScreen.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  handleCategorySelection: PropTypes.func.isRequired,
  resetShowValues: PropTypes.func.isRequired
}

export default StartScreen;
