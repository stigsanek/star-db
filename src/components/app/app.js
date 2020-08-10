import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';

export default class App extends Component {
  swapiService = new SwapiService();

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
      <ErrorBoundary>
        <SwapiServiceProvider value={this.swapiService}>
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
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};
