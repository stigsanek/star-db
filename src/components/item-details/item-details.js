import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-details.css';

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true
      });

      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({
      item,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updateItem() {
    const { itemId } = this.props;

    if (!itemId) {
      return
    }

    this.swapiService.getPerson(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  }

  render() {
    const { item, loading, error } = this.state;

    const isData = !(loading || error);

    const spinnerBox = loading ? <Spinner /> : null;
    const errorBox = error ? <ErrorIndicator /> : null;
    const contentBox = isData ? <ItemView item={item} /> : null;

    return (
      <React.Fragment>
        {spinnerBox}
        {errorBox}
        {contentBox}
      </React.Fragment>
    );
  }
}

const ItemView = ({ item }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <div className="item-details card">
      <img className="item-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender:</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year:</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color:</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}