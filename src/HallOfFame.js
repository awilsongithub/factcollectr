import React from 'react';
import firebase from './firebase';
import $ from 'jquery';
import Table from './Table';

class HallOfFame extends React.Component {

  constructor(props){
    super();
    this.state = {
      allScores: []
    }
  }

  // get reference to db entity
  // on db updates, update our data in real time
  // TODO: only show "score saved" alert when new score, not on each mount
  componentDidMount() {
    const scoresRef = firebase.database().ref('scores');

    // update state on mount AND when update to scores in db
    scoresRef.on('value', (snapshot) => {
      console.log('db scores value change', snapshot.val());
      let allScores = snapshot.val();
      let newAllScores = [];
      for (let s in allScores) {
        // NOTE: we need to push on one prop at a time like this
        newAllScores.push({
          id: s,
          category: allScores[s].category,
          date: allScores[s].date,
          decimal: allScores[s].decimal,
          percentString: allScores[s].percentString,
          time: allScores[s].time,
          userName: allScores[s].userName,
          userEmail: allScores[s].userEmail,
          userName: allScores[s].userName,
        })
      }
      this.setState({
        allScores: newAllScores
      });

      const newScoreAlert = $('.new-score-alert.alert-success');
      newScoreAlert.show(500);
      setTimeout(function(){
        newScoreAlert.hide(500);
      }, 3000);

    });
  }

  render() {
    return (
      <div className='hall-of-fame'>
        <h2 className='d-inline-block'>Hall of Fame (Scores)</h2>
        <span className='new-score-alert alert alert-success' role='alert'>New score saved</span>
        <Table allScores={this.state.allScores} />
      </div>
    )
  }

}

// HallOfFame.propTypes = {}

export default HallOfFame;
