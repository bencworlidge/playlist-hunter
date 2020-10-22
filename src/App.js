import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';

class SearchBar extends Component {
  render() {
    return (
      <div className='searchbar'>
        <h3>Search For Playlists containing:</h3>
        <input type="text"/>
      </div>
    )
  }
}

class Aggregate extends Component {
  render() {
    return (
      <div className="aggregate">
        <p>NUMBER Playlists found containing SEARCH NAME</p>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div className="playlist">
        <p>Playlist Name</p>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Playlist Hunter</h1>
      </header>
      <SearchBar/>
      <Aggregate/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
    </div>
    )
  };
}

export default App;
