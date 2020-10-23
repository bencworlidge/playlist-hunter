import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';

/*
TO DO:
1 - Each playlist has username
2 - Each playlist has othher songs included
3 - Look less shit
*/

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

class PlaylistCounter extends Component {

  render() {
    return (
      <div className="aggregate">
        <p>{this.props.playlistNumber} playlists found containing "{this.props.searchQuery}"</p>
      </div>
    )
  }

}


class Playlist extends Component {

  render() {
    return (
      <div className="playlist">
        <p>{this.props.playlistName}</p>
      </div>
    )
  }

}

class App extends Component {

  constructor() {
    super() 
    this.state = {
      searchQuery: 'MoonHooch',
      playlists: [
        {name: 'Sick Playlist'},
        {name: 'Cool Playlist'},
        {name: 'Nice Playlist'},
        {name: 'Love Playlist'},
        {name: 'Trendy Playlist'},
        {name: 'LOL Playlist'},
        {name: 'Average Playlist'},
        {name: 'Bad Playlist'},
        {name: 'Cool Playlist'},
        {name: 'Cool Playlist'},
        {name: 'Cool Playlist'},
        {name: 'Cool Playlist'},
        {name: 'Mad Playlist'},
      ],
    }
  }
 
  render() {
   
    //const returnedPlaylists = this.state.playlists.map(playlist => <li>{playlist.name}</li>)
    return (
      
    <div className="App">
      <header className="App-header">
        <h1>Playlist Hunter</h1>
      </header>
      <SearchBar/>
      <PlaylistCounter playlistNumber = {this.state.playlists.length} 
        searchQuery = {this.state.searchQuery}
      />
      {this.state.playlists.map((playlist) => 
        <Playlist playlistName = {playlist.name}/>
      )}
    </div>
    )
  };
}

export default App;
