import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import Row from '../row';
import { StarshipList, StarshipDetails } from '../sw-components';

export default class StarshipPage extends Component {
  state = {
    selectedItem: 2
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
          left={<StarshipList onPersonClick={this.onItemSelected} />}
          right={<StarshipDetails itemId={selectedItem} />}
        />
      </ErrorBoundary>
    );
  }
}
