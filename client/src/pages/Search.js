import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForCounselor } from '../actions/search';

class Search extends Component {
  componentDidMount() {
    // Make action here
    const { query } = this.props.match.params;
    this.props.searchForCounselor(query, 'test', this.props.history);
  }
  render() {
    let searchResults;
    if (this.props.search.searchResults) {
      searchResults = (
        <ul className="collection">
          {this.props.search.searchResults.map((item, index) => {
            return (
              <li key={index} className="collection-item">
                {item.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      searchResults = <p>Nothing was found</p>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h4>Search Results</h4>
            {searchResults}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

const mapDispatchToProps = {
  searchForCounselor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
