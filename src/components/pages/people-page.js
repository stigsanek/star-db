import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from '../error-boundary';
import Row from '../row';
import { PersonList, PersonDetails } from '../sw-components';

const PeoplePage = ({ match, history }) => {
  const { id } = match.params;

  return (
    <ErrorBoundary>
      <Row
        left={<PersonList onItemClick={(itemId) => history.push(itemId)} />}
        right={<PersonDetails itemId={id} />}
      />
    </ErrorBoundary>
  );
};

export default withRouter(PeoplePage);
