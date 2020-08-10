import React from 'react';
import { withData, withSwapiService } from '../hoc-helpers';
import ItemList from '../item-list';

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    );
  };
};

const mapPersonToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};

const mapPlanetToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderNameAndModel = ({ name, model }) => <span>{name} ({model})</span>;

const PersonList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPersonToProps
);

const PlanetList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPlanetToProps
);

const StarshipList = withSwapiService(
  withData(withChildFunction(ItemList, renderNameAndModel)),
  mapStarshipToProps
);

export {
  PersonList,
  PlanetList,
  StarshipList
};
