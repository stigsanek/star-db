import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {
  state = {
    itemList: [],
    loading: true,
    error: false
  }

  componentDidMount() {
    const { getData } = this.props;

    getData()
      .then(this.onItemListLoaded)
      .catch(this.onError);
  }

  onItemListLoaded = (itemList) => {
    this.setState({
      itemList,
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
    const { itemList, loading, error } = this.state;
    const isData = !(loading || error);

    const spinnerBox = loading ? <Spinner /> : null;
    const errorBox = error ? <ErrorIndicator /> : null;
    const contentBox = isData ? this.renderItems(itemList) : null;

    return (
      <React.Fragment>
        {spinnerBox}
        {errorBox}
        {contentBox}
      </React.Fragment>
    );
  }
}

