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
          onClick={this.search}>
        Search
        </button>
      </div>
    )
  }

}

class SearchResults extends Component {
  constructor() {
    super()
    this.state = {
      trackId: ''
    }
  }

  getTrackId(track) {
    this.setState({trackId: track})
  }

  render() {
    return (
      <div className="searchresults">
        {this.props.tracks.map((track, i) => {
          return (
            <Track
              key={i}
              track={track}
              
            />         
          );
        })}
      </div>
    )
  }
  
}

// DONT FUCKING CHANGE THIS
class Track extends Component {
  constructor () {
    super()
    this.state = {
      trackId: ''
    }
  } 

  handleClick() {
    this.setState({trackId: this.props.track.id})
  }

  render() {
    return (
      
      <div>
        <p><strong>{this.props.track.name}</strong> - {this.props.track.artist}</p>
        <button
          onClick={() => this.handleClick()}>
          Analysis
        </button>
        
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super() 
    this.state = {
      tracks: [],
      trackId: ''
    }
    this.search = this.search.bind(this);
  }

  search(searchQuery) { 
    Spotify.search(searchQuery).then((searchResults) => {
      this.setState({ tracks: searchResults });
    });
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
          />
      </div>

    )

  };

}


export default App;
