import React, { Component } from 'react';
import Title from './components/Title';
import Station from './components/Station';
import Podcast from './components/Podcast';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedStation: '0.00',
      selectedPodcast: {},
      podcasts: [],
    };
  }

  async componentDidMount() {
    const resource = await fetch('http://localhost:3001/podcasts');
    const json = await resource.json();

    this.setState({ podcasts: json, selectedStation: '88.5' });
  }

  componentDidUpdate(_, previousState) {
    const { selectedStation: oldStation } = previousState;
    const { selectedStation, podcasts } = this.state;

    if (oldStation !== selectedStation) {
      const selectedPodcast = podcasts.find(
        (podcast) => podcast.id === selectedStation
      );

      this.setState({ selectedPodcast });
    }
  }

  handleStationChange = (station) => {
    this.setState({ selectedStation: station });
  };

  render() {
    const { selectedStation, selectedPodcast } = this.state;

    return (
      <div className='container'>
        <Title>React Radio Podcasts</Title>

        <Station
          station={selectedStation}
          onStationChange={this.handleStationChange}
        />

        <Podcast podcast={selectedPodcast} />
      </div>
    );
  }
}
