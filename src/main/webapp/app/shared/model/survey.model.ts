import { IQuestion } from 'app/shared/model/question.model';

export interface ISurvey {
  id?: number;
  text?: string;
  questions?: IQuestion[];
}

export const defaultValue: Readonly<ISurvey> = {};
