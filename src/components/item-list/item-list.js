import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    peopleList: [],
    loading: true,
    error: false
  }

  componentDidMount() {
    this.swapiService.getAllPeople()
      .then(this.onPeopleListLoaded)
      .catch(this.onError);
  }

  onPeopleListLoaded = (peopleList) => {
    this.setState({
      peopleList,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  renderItems(arr) {
    const items = arr.map(({ id, name }) => {
      return (
        <li className="list-group-item"
          key={id}
          onClick={() => { this.props.onPersonClick(id) }}>
          {name}
        </li>
      );
    });

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }

  render() {
    const { peopleList, loading, error } = this.state;
    const isData = !(loading || error);

    const spinnerBox = loading ? <Spinner /> : null;
    const errorBox = error ? <ErrorIndicator /> : null;
    const contentBox = isData ? this.renderItems(peopleList) : null;

    return (
      <React.Fragment>
        {spinnerBox}
        {errorBox}
        {contentBox}
      </React.Fragment>
    );
  }
}

