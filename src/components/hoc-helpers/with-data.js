import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component {
    state = {
      data: [],
      loading: true,
      error: false
    }

    componentDidMount() {
      this.props.getData()
        .then(this.onItemListLoaded)
        .catch(this.onError);
    }

    onItemListLoaded = (data) => {
      this.setState({
        data,
        loading: false
      });
    }

    onError = (err) => {
      this.setState({
        error: true,
        loading: false
      });
    }

    render() {
      const { data, loading, error } = this.state;
      const isData = !(loading || error);

      const spinnerBox = loading ? <Spinner /> : null;
      const errorBox = error ? <ErrorIndicator /> : null;
      const contentBox = isData ? <View {...this.props} data={data} /> : null;

      return (
        <React.Fragment>
          {spinnerBox}
          {errorBox}
          {contentBox}
        </React.Fragment>
      );
    }
  };
};

export default withData;
