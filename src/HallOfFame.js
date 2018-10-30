import React from 'react';
// import PropTypes from 'prop-types';

class HallOfFame extends React.Component {

  constructor(props){
    super();
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <h2>Hall of Fame</h2>
        <p>TODO: add a table here of scores. name, score, time, category, sortable by column using https://react-table.js.org/#/story/simple-table perhaps. react bootstrap tables not sortable. or paginated. click a player to se their info at hall/playerId. shows name (only user created visible data item), Fact Collection (preview with ellipsis of question with details link that shows in collapse maybe, the full q and answers with correct anwer in green. also shows table of their scores.)</p>
      </div>
    )
  }

}

// HallOfFame.propTypes = {
// }

export default HallOfFame;
