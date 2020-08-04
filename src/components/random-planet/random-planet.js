import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePlanet();
    this.timerId = setInterval(this.updatePlanet, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  generateId() {
    return Math.floor((Math.random() * 15) + 2);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePlanet = () => {
    const id = this.generateId();
    this.swapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;
    const isData = !(loading || error);

    const spinnerBox = loading ? <Spinner /> : null;
    const errorBox = error ? <ErrorIndicator /> : null;
    const contentBox = isData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinnerBox}
        {errorBox}
        {contentBox}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population:</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period:</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter:</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
