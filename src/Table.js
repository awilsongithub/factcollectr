import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Reactable from 'reactable';

var Table = Reactable.Table;
var Thead = Reactable.Thead;
var Th = Reactable.Th;

/**
 * SCORESTABLE USES Reactable: https://github.com/glittershark/reactable
 * TO CREATE A SORTABLE, SEARCHABLE TABLE WITH CUSTOM
 * DATA AND COLUMN, HEADERS TAKEN FROM A SPECIFIED DATA SOURCE
 * IT PROVIDES LOTS OF OTHER OPTIONS WE CAN CONFIGURE
 */
class ScoresTable extends React.Component {

  constructor(props){
    super();
  }

  columns = [{}]

  componentDidMount() {
    const el = document.getElementsByClassName('reactable-filter-input')[0];
    el.setAttribute('placeholder', 'search scores');
  }

  renderTable() {
    return (
      <div className='table-hall-of-fame'>
        <Table
          className='table'
          filterable={['category', 'userName']}
          noDataText="No matching records found"
          itemsPerPage={100}
          currentPage={0}
          sortable={true}
          defaultSort={{column: 'percentString', direction: 'desc'}}
          data={this.props.allScores}
          columns={[
            {key: 'percentString', label: 'Score'},
            {key: 'userName', label: 'Player'},
            {key: 'category', label: 'Category'},
            {key: 'date', label: 'Date'}
          ]}
        >
        </Table>
      </div>
    )
  }

  // TODO: add sort icons to headers:
  // <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
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
