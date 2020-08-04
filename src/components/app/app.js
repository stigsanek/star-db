import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    isError: false
  }

  componentDidCatch() {
    this.setState({
      isError: true
    });
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  }

  render() {
    if (this.state.isError) {
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div className="container">
        <Header />
        {planet}

        <button
          className="btn btn-warning btn-lg mb-4"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>

        <PeoplePage />
      </div>
    );
  }
};
