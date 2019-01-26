import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HallOfFame from './HallOfFame';

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
        <div className='row'>
          <div className='col-xs-12 col-sm-8 question-list'>

            <div className='hero-text'>
              <h2 className='flash-text'>Quiz yourself</h2>
            </div>
            <div className="card-deck">

              {this.props.categories.map((cat, i) =>
                <div className=''>
                  <Link to='/play'>
                    <div
                      key={i}
                      className="card card-btn"
                      onClick={(e) => this.props.handleCategorySelection(cat, e)}
                    >
                      <div className="card-body">
                        <i className={`flaticon-${cat.icon}`}></i>
                        <i className='flaticon-dice rotate-center'></i>

                        <h5 className="card-title">{cat.name}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

            </div>


          </div>
          <div className='col-xs-12 col-sm-4'>
            <HallOfFame
              allScores={this.props.allScores}
              columns={[
                { key: 'percentString', label: 'Score' },
                { key: 'userName', label: 'Player' }
              ]}
              maxPaginationBtns={3}
            />

          </div>
        </div>



        



      </div>
    )
  }
}

StartScreen.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  handleCategorySelection: PropTypes.func.isRequired,
  resetShowValues: PropTypes.func.isRequired,
  allScores: PropTypes.array.isRequired
}

export default StartScreen;
