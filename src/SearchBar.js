import React, { Component } from "react";

export class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.state.searchQuery
      ? this.props.onSearch(this.state.searchQuery)
      : alert("Please Enter A Track Title");
  }

  handleTermChange(event) {
    this.setState({ searchQuery: event.target.value });
    this.props.newSearch();
  }

  render() {
    return (
      <div>
        <div className="searchbar">
          <h2>Track For Analysis:</h2>
          <input
            type="text"
            placeholder="Track Title..."
            onChange={this.handleTermChange}
          />
          <br></br>
          <button onClick={this.search}>SEARCH</button>
        </div>
      </div>
    );
  }
}
