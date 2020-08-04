import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: 1,
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

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
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

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonClick={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
};
