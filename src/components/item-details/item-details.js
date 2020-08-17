import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-details.css';

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
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
      image: this.props.getImageUrl(item),
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
    const { itemId, getData } = this.props;

    if (!itemId) {
      return
    }

    getData(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  }

  render() {
    const { item, image, loading, error } = this.state;

    if (!item) {
      return <p>Select a item from a list</p>
    }

    const isData = !(loading || error);

    const spinnerBox = loading ? <Spinner /> : null;
    const errorBox = error ? <ErrorIndicator /> : null;
    let contentBox = null;

    if (isData) {
      contentBox = (
        <ItemView item={item} image={image}>
          {this.props.children}
        </ItemView>
      );
    }

    return (
      <React.Fragment>
        {spinnerBox}
        {errorBox}
        {contentBox}
      </React.Fragment>
    );
  }
}

const ItemView = ({ item, image, children }) => {
  const { name } = item;

  return (
    <div className="item-details card">
      <img className="item-image" src={image} alt="Logo" />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { item });
            })
          }
        </ul>
      </div>
    </div>
  );
}
