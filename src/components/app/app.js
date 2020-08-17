import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SwapiService from '../../services/swapi-service';
import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import ErrorBoundary from '../error-boundary';
import { SwapiServiceProvider } from '../swapi-service-context';

export default class App extends Component {
  swapiService = new SwapiService();

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.swapiService}>
          <Router>
            <div className="container">
              <Header />
              <RandomPlanet />

              <Route
                path="/"
                render={() => <h2>Welcome to Star DB</h2>}
                exact={true}
              />
              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};
