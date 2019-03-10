import React from 'react';
import PropTypes from 'prop-types';
import Reactable from 'reactable';

var Table = Reactable.Table;

/**
 * SCORESTABLE USES Reactable: https://github.com/glittershark/reactable
 * TO CREATE A SORTABLE, SEARCHABLE TABLE WITH CUSTOM
 * DATA AND COLUMN, HEADERS TAKEN FROM A SPECIFIED DATA SOURCE
 * IT PROVIDES LOTS OF OTHER OPTIONS WE CAN CONFIGURE
 */
class ScoresTable extends React.Component {

  constructor(props){
    super();
    this.maxPaginationBtns = props.maxPaginationBtns;
  }

  // build column objects array for reactable using props.desirecColumnNames
  // desiredColumnObjects = [];
  // allColumnObjects = desiredColumns;

  allColumns = [
    { key: 'percentString', label: 'Score' },
    { key: 'userName', label: 'Player' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' }
  ]

  // desiredColumnNames.forEach(name => {
  //   let match = null;
  //   match = allColumnObjects.find(obj => obj.label === name)
  //   if(match){
  //     desiredColumnObjects.push(match)
  //   }
  // });

  componentDidMount() {
    const el = document.getElementsByClassName('reactable-filter-input')[0];
    el.setAttribute('placeholder', 'search scores');
  }

  renderTable() {
    return (
      <div className='table-hall-of-fame'>
        <Table
          className='table table-hover'
          filterable={['category', 'userName']}
          noDataText="No matching records found"
          itemsPerPage={10}
          pageButtonLimit={this.maxPaginationBtns || 4 }
          currentPage={0}
          sortable={true}
          defaultSort={{column: 'percentString', direction: 'desc'}}
          data={this.props.allScores}
          columns={this.props.columns || this.allColumns}
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
  allScores: PropTypes.array.isRequired,
  columns: PropTypes.array,
  maxPaginationBtns: PropTypes.number
}

export default ScoresTable;
