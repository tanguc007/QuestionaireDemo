import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserSurvey from './user-survey';
import UserSurveyDetail from './user-survey-detail';
import UserSurveyUpdate from './user-survey-update';
import UserSurveyDeleteDialog from './user-survey-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserSurveyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserSurveyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserSurveyDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserSurvey} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserSurveyDeleteDialog} />
  </>
);

export default Routes;
