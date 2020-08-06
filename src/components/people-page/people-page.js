import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import Record from '../record';

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
      <ItemDetails
        itemId={this.state.selectedPerson}
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage}
      >
        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth Year" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}
