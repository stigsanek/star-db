import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import Row from '../row';
import { PersonList, PersonDetails } from '../sw-components';

export default class PeoplePage extends Component {
  state = {
    selectedPerson: 1
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  }

  render() {
    const itemList = (
      <PersonList onPersonClick={this.onPersonSelected}>
        {({ name }) => <span>{name}</span>}
      </PersonList>
    );

    const personDetails = (
      <PersonDetails itemId={this.state.selectedPerson} />
    );

    return (
      <ErrorBoundary>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundary>
    );
  }
}
