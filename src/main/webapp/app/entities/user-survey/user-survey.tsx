import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-survey.reducer';
import { IUserSurvey } from 'app/shared/model/user-survey.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSurveyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserSurvey extends React.Component<IUserSurveyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userSurveyList, match } = this.props;
    return (
      <div>
        <h2 id="user-survey-heading">
          <Translate contentKey="questionaireDemoApp.userSurvey.home.title">User Surveys</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="questionaireDemoApp.userSurvey.home.createLabel">Create a new User Survey</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {userSurveyList && userSurveyList.length > 0 ? (
            <Table responsive aria-describedby="user-survey-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="questionaireDemoApp.userSurvey.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="questionaireDemoApp.userSurvey.survey">Survey</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userSurveyList.map((userSurvey, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${userSurvey.id}`} color="link" size="sm">
                        {userSurvey.id}
                      </Button>
                    </td>
                    <td>{userSurvey.user ? <Link to={`applicant/${userSurvey.user.id}`}>{userSurvey.user.id}</Link> : ''}</td>
                    <td>{userSurvey.survey ? <Link to={`survey/${userSurvey.survey.id}`}>{userSurvey.survey.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${userSurvey.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userSurvey.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userSurvey.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="questionaireDemoApp.userSurvey.home.notFound">No User Surveys found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userSurvey }: IRootState) => ({
  userSurveyList: userSurvey.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSurvey);
