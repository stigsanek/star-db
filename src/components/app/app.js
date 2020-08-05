import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorBoundry from '../error-boundry';

export default class App extends Component {
  state = {
    showRandomPlanet: true
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  }

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
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
      </ErrorBoundry>
    );
  }
};
