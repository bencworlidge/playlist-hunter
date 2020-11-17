import React, { Component } from "react";
import { Analysis } from "./Analysis";

export class Track extends Component {
  constructor() {
    super();
    this.state = {
      trackId: "",
      isActive: null,
    };
  }

  handleClick() {
    this.setState({ trackId: this.props.track.id });
    this.setState({ isActive: true });
  }

  closeAnalysis() {
    this.setState({ isActive: false });
  }

  render() {
    return (
      <div className="track">
        <p>
          <strong>{this.props.track.name}</strong> - {this.props.track.artist}
        </p>
        {this.state.isActive ? (
          <button onClick={() => this.closeAnalysis()}>
            Close Analysis <i class="fa fa-plus close"></i>
          </button>
        ) : (
          <button onClick={() => this.handleClick()}>
            Show Analysis <i class="fas fa-plus "></i>
          </button>
        )}
        {this.state.isActive ? (
          <div className="analysis">
            <Analysis trackId={this.state.trackId} />
          </div>
        ) : null}
      </div>
    );
  }
}
