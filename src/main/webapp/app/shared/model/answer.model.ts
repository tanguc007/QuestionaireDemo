import { IQuestion } from 'app/shared/model/question.model';

export interface IAnswer {
  id?: number;
  text?: string;
  key?: string;
  question?: IQuestion;
}

export const defaultValue: Readonly<IAnswer> = {};
