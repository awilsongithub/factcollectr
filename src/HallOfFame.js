import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

class HallOfFame extends React.Component {

  constructor(props){
    super();
    this.state = { }
  }

  render() {
    return (
      <div className='hall-of-fame max-width-600'>
        <h2 className='flex-space-between hero-text'>
          <span>Top Scores</span>
        </h2>
        <Table 
          allScores={this.props.allScores} 
          columns={this.props.columns}
          maxPaginationBtns={this.props.maxPaginationBtns}
        />
      </div>
    )
  }

}

HallOfFame.propTypes = {
  allScores: PropTypes.array.isRequired,
  columns: PropTypes.array,
  maxPaginationBtns: PropTypes.number
}

export default HallOfFame;
