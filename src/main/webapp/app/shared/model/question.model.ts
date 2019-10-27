import { IAnswer } from 'app/shared/model/answer.model';
import { ISurvey } from 'app/shared/model/survey.model';

export interface IQuestion {
  id?: number;
  text?: string;
  order?: number;
  answers?: IAnswer[];
  survey?: ISurvey;
}

export const defaultValue: Readonly<IQuestion> = {};
