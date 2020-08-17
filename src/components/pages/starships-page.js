import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from '../error-boundary';
import { StarshipList } from '../sw-components';

const StarshipsPage = ({ history }) => {
  return (
    <ErrorBoundary>
      <StarshipList
        onItemClick={(itemId) => history.push(itemId)}
      />
    </ErrorBoundary>
  );
};

export default withRouter(StarshipsPage);
