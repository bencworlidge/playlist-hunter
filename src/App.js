import React, { Component } from 'react'
import './App.css';
import {Spotify, getTrackFeatures, getTrackAnalysis} from './util/Spotify'

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

  async componentDidMount() {
      this.setState({
        audioAnalysis: await getTrackAnalysis(this.props.trackId),
        audioFeatures:  await getTrackFeatures(this.props.trackId),
      })
      
  }

  componentDidUpdate() {
    console.log(this.state.audioAnalysis)
    console.log(this.state.audioFeatures)
  }

    render() {
      return (
        <div>
          {/* <p>tempo: {this.audioFeatures.tempo}</p> */}
          <p>Length: {this.state.audioFeatures.duration_ms}</p>
          <p>BPM: {this.state.audioFeatures.tempo}</p>
          <p>Key: {this.state.audioFeatures.key} {this.state.audioFeatures.mode}</p>
          <p>Danceability: {this.state.audioFeatures.danceability}</p>
          <p>Energy: {this.state.audioFeatures.energy}</p>
          <p>Acousticness {this.state.audioFeatures.acousticness}</p>
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

console.log(getTrackAnalysis("4JE6agBLHGA5TaF6FlqfBD"))
export default App;
