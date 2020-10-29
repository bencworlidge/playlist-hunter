import React, { Component } from 'react'
import './App.css';
import {Spotify, getTrackFeatures, getTrackAnalysis, getTrackKey} from './util/Spotify'
import Background from './background.mp4'

/* TO DO:
1. Button For Log In 
2. Look up .bind 
3. Phone compability
4. Color Scheme / Layout
7. Look up CCS Modules in React https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
8. Filter number of results
11. Fix weird white thing
12. Loading Positioning
13. Refresh Search
14. Not returning all keys
*/

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.state.searchQuery ? this.props.onSearch(this.state.searchQuery)
    : alert('Please Enter A Track Title')
  }

  handleTermChange(event) {
    this.setState({ searchQuery: event.target.value })
  }

  render() {
    return (
      <div>
        <div className='searchbar'>
          <h2>Track For Analysis:</h2>
          <input 
            type="text" 
            placeholder="Track Title..." 
            onChange={this.handleTermChange}
          />
          <br></br>
          <button 
            onClick={this.search}>
          SEARCH
          </button>
        
        </div>
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
      
      <div className="track" >
        <p><strong>{this.props.track.name}</strong> - {this.props.track.artist}</p>
        {this.state.isActive ?
        <button
          onClick={() => this.closeAnalysis()}>
          Close Analysis <i class="fa fa-plus close"></i> 
        </button> :
        <button
          onClick={() =>  this.handleClick()}>
          Show Analysis <i class="fas fa-plus "></i> 
        </button>
        }
        {this.state.isActive ? 
          <div className="analysis">
            <Analysis 
              trackId={this.state.trackId}
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
      trackKey: ''
    }
  }

  async componentDidMount() {
    this.setState({
      audioAnalysis: await getTrackAnalysis(this.props.trackId),
      audioFeatures:  await getTrackFeatures(this.props.trackId),
      trackKey: await getTrackKey(this.props.trackId)
    })    
  }

  render() {
    return (
      <div>
      {this.state.audioFeatures ?
        <div>
            <p>Tempo: {Math.round(this.state.audioFeatures.tempo)} bpm</p>
            <p>Key: {this.state.trackKey}</p>
            <p>Danceability: {Math.round(this.state.audioFeatures.danceability * 100)}%</p>
            <p>Energy: {Math.round(this.state.audioFeatures.energy * 100)}%</p>
            <p>Acousticness: {Math.round(this.state.audioFeatures.acousticness * 100)}%</p>
        </div>
      : <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      }
      </div>
    )
  };
}

class App extends Component {

  constructor(props) {
    super() 
    this.state = {
      tracks: [],
      trackId: '',
    }
    this.search = this.search.bind(this);
  }

  search(searchQuery) { 
    Spotify.search(searchQuery).then((searchResults) => {
      this.setState({ tracks: searchResults });
    });
    this.setState({ searchOn: true });
  }

  
  
  render() {
    return (
      <div className="App">
        <video autoPlay loop muted className='video'
          style={{
            position: "fixed",
            width: '100%', 
            left: '50%',
            top: '50%', 
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: '-1'
          }}
        >
          <source src={Background} type="video/mp4"/>
        </video>
        <header className="App-header">
        <h1><i class="fab fa-spotify"></i>  Spotify Track Analysis</h1>
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
