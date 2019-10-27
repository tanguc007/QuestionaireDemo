import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './applicant.reducer';
import { IApplicant } from 'app/shared/model/applicant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Applicant extends React.Component<IApplicantProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { applicantList, match } = this.props;
    return (
      <div>
        <h2 id="applicant-heading">
          <Translate contentKey="questionaireDemoApp.applicant.home.title">Applicants</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="questionaireDemoApp.applicant.home.createLabel">Create a new Applicant</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {applicantList && applicantList.length > 0 ? (
            <Table responsive aria-describedby="applicant-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="questionaireDemoApp.applicant.name">Name</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {applicantList.map((applicant, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${applicant.id}`} color="link" size="sm">
                        {applicant.id}
                      </Button>
                    </td>
                    <td>{applicant.name}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${applicant.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${applicant.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${applicant.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="questionaireDemoApp.applicant.home.notFound">No Applicants found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ applicant }: IRootState) => ({
  applicantList: applicant.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Applicant);
