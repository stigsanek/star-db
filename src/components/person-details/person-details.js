import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      });

      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePerson() {
    const { personId } = this.props;

    if (!personId) {
      return
    }

    this.swapiService.getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  render() {
    const { person, loading, error } = this.state;

    const isData = !(loading || error);

    const spinnerBox = loading ? <Spinner /> : null;
    const errorBox = error ? <ErrorIndicator /> : null;
    const contentBox = isData ? <PersonView person={person} /> : null;

    return (
      <React.Fragment>
        {spinnerBox}
        {errorBox}
        {contentBox}
      </React.Fragment>
    );
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <div className="person-details card">
      <img className="person-image"
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
