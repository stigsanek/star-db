import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import Row from '../row';
import { PlanetList, PlanetDetails } from '../sw-components';

export default class PlanetsPage extends Component {
  state = {
    selectedItem: 1
  }

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id
    });
  }

  render() {
    const { selectedItem } = this.state;

    return (
      <ErrorBoundary>
        <Row
          left={<PlanetList onItemClick={this.onItemSelected} />}
          right={<PlanetDetails itemId={selectedItem} />}
        />
      </ErrorBoundary>
    );
  }
}
