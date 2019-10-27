import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import sessions, { SessionsState } from 'app/modules/account/sessions/sessions.reducer';
// prettier-ignore
import question, {
  QuestionState
} from 'app/entities/question/question.reducer';
// prettier-ignore
import answer, {
  AnswerState
} from 'app/entities/answer/answer.reducer';
// prettier-ignore
import survey, {
  SurveyState
} from 'app/entities/survey/survey.reducer';
// prettier-ignore
import applicant, {
  ApplicantState
} from 'app/entities/applicant/applicant.reducer';
// prettier-ignore
import userSurvey, {
  UserSurveyState
} from 'app/entities/user-survey/user-survey.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly sessions: SessionsState;
  readonly question: QuestionState;
  readonly answer: AnswerState;
  readonly survey: SurveyState;
  readonly applicant: ApplicantState;
  readonly userSurvey: UserSurveyState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sessions,
  question,
  answer,
  survey,
  applicant,
  userSurvey,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
