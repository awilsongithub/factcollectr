import React from 'react';
import firebase from './firebase';
// import PropTypes from 'prop-types';

class HallOfFame extends React.Component {

  constructor(props){
    super();
    this.state = {
      allScores: []
    }
  }

  componentDidMount() {
    const scoresRef = firebase.database().ref('scores');

    // on mount and when update to scorres in db, update state
    scoresRef.on('value', (snapshot) => {
      console.log('db scores value change', snapshot.val());
      let allScores = snapshot.val();
      let newState = [];
      for (let s in allScores) {
        // NOTE: we need to push on one prop at a time like this
        newState.push({
          id: s,
          category: allScores[s].category,
          date: allScores[s].date,
          decimal: allScores[s].decimal,
          percentString: allScores[s].percentString,
          time: allScores[s].time,
          user: allScores[s].user
        })
      }
      this.setState({
        allScores: newState
      });

    });
  }
  // PROPS TO RENDER ===========================
  // id: s,
  // category: allScores[s].category,
  // date: allScores[s].date,
  // decimal: allScores[s].decimal,
  // percentString: allScores[s].percentString,
  // time: allScores[s].time,
  // user: allScores[s].user
  //==============================================

  render() {
    return (
      <div>
        <h2>Hall of Fame</h2>

        <ul>
          {this.state.allScores.map((item) => {
            return (
              <li key={item.category}>
                <h3></h3>
                <p>Category: {item.category} score: {item.percentString}, {item.decimal}</p>
              </li>
            )
          })}
        </ul>


      </div>
    )
  }

}

// HallOfFame.propTypes = {
// }

export default HallOfFame;
