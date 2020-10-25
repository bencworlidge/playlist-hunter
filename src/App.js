import React, { Component } from 'react'
import './App.css';
import Spotify from './util/Spotify'

/* TO DO:
1. Button For Log In 
2. Look up .bind
*/

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchQuery)
  }

  handleTermChange(event) {
    this.setState({ searchQuery: event.target.value })
  }

  render() {
    return (
      <div className='searchbar'>
        <h2>Track For Analysis:</h2>
        <input 
          type="text" 
          placeholder="Track Title..." 
          onChange={this.handleTermChange}
        />
        <button 
          onClick={this.search}
        >Search</button>
      </div>
    )
  }

}

class SearchResults extends Component {

  render() {
    return (
      <div className="searchresults">
        {this.props.tracks.map((track) => {
          return (
            <Track
              track={track}
              select = {this.select}
            />          
          );
        })}
      </div>
    )
  }
  
}

class Track extends Component {

  render() {
    return (
      <div>
        <button
          onClick={this.props.select}
        >
          <p><strong>{this.props.track.name}</strong> - {this.props.track.artist}</p>
        </button>
      </div>
    )
  }
}

class AnalysisPage extends Component {
  constructor(props) {
    super();
    this.state = {
      hidden: true,
    };

    render() {}

  }
}

class App extends Component {

  constructor(props) {
    super() 
    this.state = {
      tracks: [],
    }
    this.search = this.search.bind(this);
    this.select = this.select.bind(this)
  }


  search(searchQuery) { 
    Spotify.search(searchQuery).then((searchResults) => {
      this.setState({ tracks: searchResults });
      console.log(searchResults)
    });
  }

  select(trackId) {
    Spotify.select(trackId)
  }

  render() {
   
    return (
      
      <div className="App">
        <header className="App-header">
          <h1>Advanced Track Analysis</h1>
        </header>
        <SearchBar
          onSearch = {this.search}
          searchQuery = {this.state.searchQuery}
        />
      
        <SearchResults 
          tracks = {this.state.tracks}
          select = {this.select}
          />
        <AnalysisPage/>
      </div>

    )

  };

}


export default App;
