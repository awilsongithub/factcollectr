import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Reactable from 'reactable';

var Table = Reactable.Table;
var Thead = Reactable.Thead;
var Th = Reactable.Th;

// OUR DATA IS AN ARRAY OF THESE OBJS
// id: s,
// category: allScores[s].category,
// date: allScores[s].date,
// decimal: allScores[s].decimal,
// percentString: allScores[s].percentString,
// time: allScores[s].time,
// user: allScores[s].user


class ScoresTable extends React.Component {

  constructor(props){
    super();
  }

  columns = [{}]

  componentDidMount() {
    const el = document.getElementsByClassName('reactable-filter-input')[0];
    el.setAttribute('placeholder', 'search scores');
    el.focus();
  }

  // tableData = {};
  //
  // setTableData = () => {
  //   let s = this.props.allScores;
  //   this.tableData.user = s.user;
  //   this.tableData.score = s.percentString;
  //   this.tableData.category = s.category;
  //   this.tableData.date = s.date;
  // }
  // setTableData();


  renderTable() {
    return (
      <div className='table-hall-of-fame'>
        <Table
          className='table'
          filterable={['category', 'user']}
          noDataText="No matching records found"
          itemsPerPage={100}
          currentPage={0}
          sortable={true}
          data={this.props.allScores}
          columns={[
            {key: 'user', label: 'user'},
            {key: 'category', label: 'category'},
            {key: 'percentString', label: 'score'},
            {key: 'date', label: 'date'}
          ]}
        >
          // TODO NO DATA SHOWS UP WHEN I ADD THEAD ELEMENT
          // <Thead>
          //   <Th column="name">ID</Th>
          //   <Th column="leader">Category</Th>
          //   <Th column="assignment">Date</Th>
          //   <Th column="members">Decimal</Th>
          //   <Th column="leader">Score</Th>
          //   <Th column="assignment">Time</Th>
          //   <Th column="members">Player</Th>
          // </Thead>
        </Table>
      </div>

    )
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    )
  }

}

ScoresTable.propTypes = {
  allScores: PropTypes.array.isRequired
}

export default ScoresTable;
