import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Question from './question';
import Answer from './answer';
import Survey from './survey';
import Applicant from './applicant';
import UserSurvey from './user-survey';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}/answer`} component={Answer} />
      <ErrorBoundaryRoute path={`${match.url}/survey`} component={Survey} />
      <ErrorBoundaryRoute path={`${match.url}/applicant`} component={Applicant} />
      <ErrorBoundaryRoute path={`${match.url}/user-survey`} component={UserSurvey} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
