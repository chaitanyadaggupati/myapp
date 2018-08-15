import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";

import {flattenListMap} from '../utils';


class Table extends React.Component {

  constructor() {
    super();
    this.onSearchChange = this._onSearchChange.bind(this);

    this.state = {
      inputKey: ''
    };
  }

  _onSearchChange(event) {
    this.setState({inputKey: event.target.value});
  }

  render() {

  const {data} = this.props;
  const {inputKey} = this.state;

  if (!data.length) {
    return (<p>Nothing to show</p>);
  } else 
    return(
    <div className="column">
      <h2 className="subtitle">
        Total <strong>{data.length} tickets</strong>
      </h2>
      <div className="field column is-half">
        <div className="control">
        <input type='search' className="input is-normal" type="text" placeholder="Search by description/tags" onChange={this.onSearchChange}/>
        </div>
      </div>      
      <table className="table is-striped">
        <thead>
          <tr>
            {Object.entries(data[0]).map(el => <th key={key(el)}>{el[0]}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(el => {
            
            let tags = '';
            if (el.tags != undefined) {
              tags = flattenListMap(el.tags, 'title').join(',');
            }

            if (inputKey === '' ||
                (el.description && el.description.includes(inputKey)) ||
                tags.includes(inputKey))
            return (
            <tr>
              {Object.keys(el).map(elkey => {
                  if (elkey != "tags") {
                    return (<td>{el[elkey]}</td>);
                  } else {
                    return (<td>{tags}</td>);
                  }
                })}
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}
}

Table.propTypes = {
  data: PropTypes.array.isRequired
};
export default Table;
