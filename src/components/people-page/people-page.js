import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import Row from '../row';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 1,
    isError: false
  }

  componentDidCatch() {
    this.setState({
      isError: true
    });
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  }

  render() {
    if (this.state.isError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
        onPersonClick={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={(item) => item.name}
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}
