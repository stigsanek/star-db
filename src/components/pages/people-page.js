import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import Row from '../row';
import { PersonList, PersonDetails } from '../sw-components';

export default class PeoplePage extends Component {
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
          left={<PersonList onPersonClick={this.onItemSelected} />}
          right={<PersonDetails itemId={selectedItem} />}
        />
      </ErrorBoundary>
    );
  }
}
