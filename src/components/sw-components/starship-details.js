import React from 'react';
import ItemDetails from '../item-details';
import Record from '../record';
import { withSwapiService } from '../hoc-helpers';

const StarshipDetails = ({ itemId, swapiService }) => {
  const { getStarship, getStarshipImage } = swapiService;

  return (
    <ItemDetails
      itemId={itemId}
      getData={getStarship}
      getImageUrl={getStarshipImage}
    >
      <Record field="model" label="Model" />
      <Record field="length" label="Length" />
      <Record field="costInCredits" label="Cost in credits" />
    </ItemDetails>
  );

};

export default withSwapiService(StarshipDetails);
