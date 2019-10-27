import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplicant } from 'app/shared/model/applicant.model';
import { getEntities as getApplicants } from 'app/entities/applicant/applicant.reducer';
import { ISurvey } from 'app/shared/model/survey.model';
import { getEntities as getSurveys } from 'app/entities/survey/survey.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-survey.reducer';
import { IUserSurvey } from 'app/shared/model/user-survey.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserSurveyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserSurveyUpdateState {
  isNew: boolean;
  userId: string;
  surveyId: string;
}

export class UserSurveyUpdate extends React.Component<IUserSurveyUpdateProps, IUserSurveyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      surveyId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getApplicants();
    this.props.getSurveys();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userSurveyEntity } = this.props;
      const entity = {
        ...userSurveyEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/user-survey');
  };

  render() {
    const { userSurveyEntity, applicants, surveys, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="questionaireDemoApp.userSurvey.home.createOrEditLabel">
              <Translate contentKey="questionaireDemoApp.userSurvey.home.createOrEditLabel">Create or edit a UserSurvey</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userSurveyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-survey-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-survey-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="user-survey-user">
                    <Translate contentKey="questionaireDemoApp.userSurvey.user">User</Translate>
                  </Label>
                  <AvInput id="user-survey-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {applicants
                      ? applicants.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user-survey-survey">
                    <Translate contentKey="questionaireDemoApp.userSurvey.survey">Survey</Translate>
                  </Label>
                  <AvInput id="user-survey-survey" type="select" className="form-control" name="survey.id">
                    <option value="" key="0" />
                    {surveys
                      ? surveys.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-survey" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  applicants: storeState.applicant.entities,
  surveys: storeState.survey.entities,
  userSurveyEntity: storeState.userSurvey.entity,
  loading: storeState.userSurvey.loading,
  updating: storeState.userSurvey.updating,
  updateSuccess: storeState.userSurvey.updateSuccess
});

const mapDispatchToProps = {
  getApplicants,
  getSurveys,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSurveyUpdate);
