import React, { Component } from "react";
import {
  getTrackFeatures,
  getTrackAnalysis,
  getTrackKey,
} from "./util/Spotify";

export class Analysis extends Component {
  constructor() {
    super();
    this.state = {
      audioAnalysis: "",
      audioFeatures: "",
      trackKey: "",
    };
  }

  async componentDidMount() {
    this.setState({
      audioAnalysis: await getTrackAnalysis(this.props.trackId),
      audioFeatures: await getTrackFeatures(this.props.trackId),
      trackKey: await getTrackKey(this.props.trackId),
    });
  }

  render() {
    return (
      <div>
        {this.state.audioFeatures ? (
          <div>
            <p>Tempo: {Math.round(this.state.audioFeatures.tempo)} bpm</p>
            <p>Key: {this.state.trackKey}</p>
            <p>
              Danceability:{" "}
              {Math.round(this.state.audioFeatures.danceability * 100)}%
            </p>
            <p>Energy: {Math.round(this.state.audioFeatures.energy * 100)}%</p>
            <p>
              Acousticness:{" "}
              {Math.round(this.state.audioFeatures.acousticness * 100)}%
            </p>
          </div>
        ) : (
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        )}
      </div>
    );
  }
}
