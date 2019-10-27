import { IApplicant } from 'app/shared/model/applicant.model';
import { ISurvey } from 'app/shared/model/survey.model';

export interface IUserSurvey {
  id?: number;
  user?: IApplicant;
  survey?: ISurvey;
}

export const defaultValue: Readonly<IUserSurvey> = {};
