import React, { Component } from "react";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import Background from "./background.mp4";
import { Spotify } from "./util/Spotify";

/* TO DO:
1. Button For Log In 
7. Look up CCS Modules in React https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
11. Fix weird white thing
12. Loading Positioning
13. Refresh Search
14. Not returning all keys
15. Enter for search
16. Little dancing SVG based on the results. Danceability/Energy alters the charcter mood.
17. Look up accessibility
18. The DOTS social network
19. Different file for each component
*/

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      tracks: [],
      trackId: "",
      show: "",
    };
    this.search = this.search.bind(this);
  }

  search(searchQuery) {
    Spotify.search(searchQuery).then((searchResults) => {
      this.setState({ tracks: searchResults });
    });
    this.setState({ previousSearch: true });
  }

  render() {
    return (
      <div className="App">
        <video
          autoPlay
          loop
          muted
          className="video"
          style={{
            position: "fixed",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={Background} type="video/mp4" />
        </video>
        <header className="App-header">
          <h1>
            <i class="fab fa-spotify"></i> Spotify Track Analysis
          </h1>
        </header>
        <SearchBar
          onSearch={this.search}
          searchQuery={this.state.searchQuery}
          newSearch={this.handleTermChange}
        />
        <SearchResults tracks={this.state.tracks} show={this.state.show} />
      </div>
    );
  }
}

export default App;
