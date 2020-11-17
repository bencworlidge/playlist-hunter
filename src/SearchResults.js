import React, { Component } from "react";
import { Track } from "./Track";

export class SearchResults extends Component {
  render() {
    return (
      <div className="searchresults">
        {this.props.tracks.map((track, i) => {
          return (
            <div>
              {this.props.show ? (
                <Track
                  key={i}
                  track={track}
                  onSearch={this.props.previousSearch}
                />
              ) : null}
              ;
            </div>
          );
        })}
      </div>
    );
  }
}
