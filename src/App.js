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

class Track extends Component {
  constructor () {
    super()
    this.state = {
      trackId: '',
      isActive: null
    }
  } 

  handleClick() {
    this.setState({trackId: this.props.track.id})
    this.setState({ isActive: true})
  }

  closeAnalysis() {
    this.setState({ isActive: false })
  }

  render() {
    return (
      
      <div className="track">
        <p><strong>{this.props.track.name}</strong> - {this.props.track.artist}</p>
        <button
          onClick={() => this.handleClick()}>
          Show Analysis
        </button>
        {this.state.isActive ? 
          <div className="analysis">
            <Analysis 
              trackId={this.state.trackId}
              onClose={this.closeAnalysis.bind(this)}
            />
          </div> : null
        }
          
      </div>
    )
  }
}

class Analysis extends Component {
  constructor() {
    super()
    this.state = {
      audioAnalysis: '',
      audioFeatures: '',
    }
  }

componentDidMount() {
    this.setState({
      audioAnalysis: Spotify.analysis(this.props.trackId),
      audioFeatures: Spotify.features(this.props.trackId),
    })
    
}

componentDidUpdate() {
  console.log(this.state.audioFeatures)
}

  render() {
    return (
      <div>
        <p>dancibility</p>
        <p>tempo</p>
        <p>bpm</p>
        <button onClick={this.props.onClose}>close</button> 
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
