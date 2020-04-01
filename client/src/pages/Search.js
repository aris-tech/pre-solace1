import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    let searchResults;
    if (this.props.search.searchResults) {
      searchResults = this.props.search.searchResults.map((item) => {
        return <li>{item.name}</li>;
      });
    } else {
      searchResults = <p>No results!</p>;
    }
    return (
      <p>
        Hi this is search
        <ul>{searchResults}</ul>
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(mapStateToProps)(Profile);
