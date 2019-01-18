import React from 'react';
import PropTypes from 'prop-types';
import firebase from './firebase';
import $ from 'jquery';
import Table from './Table';

class HallOfFame extends React.Component {

  constructor(props){
    super();
    this.state = { }
  }

  render() {
    return (
      <div className='hall-of-fame'>
        <h2 className='d-inline-block'>Top Scores</h2>
        <Table allScores={this.props.allScores} />
      </div>
    )
  }

}

HallOfFame.propTypes = {
  allScores: PropTypes.array.isRequired
}

export default HallOfFame;
