import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

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
      <ItemList
        onPersonClick={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {(item) => item.name}
      </ItemList>
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}
