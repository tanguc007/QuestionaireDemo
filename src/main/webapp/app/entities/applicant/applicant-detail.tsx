import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './applicant.reducer';
import { IApplicant } from 'app/shared/model/applicant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApplicantDetail extends React.Component<IApplicantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { applicantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="questionaireDemoApp.applicant.detail.title">Applicant</Translate> [<b>{applicantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="questionaireDemoApp.applicant.name">Name</Translate>
              </span>
            </dt>
            <dd>{applicantEntity.name}</dd>
          </dl>
          <Button tag={Link} to="/entity/applicant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/applicant/${applicantEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ applicant }: IRootState) => ({
  applicantEntity: applicant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantDetail);
