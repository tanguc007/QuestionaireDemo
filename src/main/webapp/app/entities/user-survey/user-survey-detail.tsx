import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-survey.reducer';
import { IUserSurvey } from 'app/shared/model/user-survey.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSurveyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserSurveyDetail extends React.Component<IUserSurveyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userSurveyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="questionaireDemoApp.userSurvey.detail.title">UserSurvey</Translate> [<b>{userSurveyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="questionaireDemoApp.userSurvey.user">User</Translate>
            </dt>
            <dd>{userSurveyEntity.user ? userSurveyEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="questionaireDemoApp.userSurvey.survey">Survey</Translate>
            </dt>
            <dd>{userSurveyEntity.survey ? userSurveyEntity.survey.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-survey" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-survey/${userSurveyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userSurvey }: IRootState) => ({
  userSurveyEntity: userSurvey.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSurveyDetail);
