import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserSurvey, defaultValue } from 'app/shared/model/user-survey.model';

export const ACTION_TYPES = {
  FETCH_USERSURVEY_LIST: 'userSurvey/FETCH_USERSURVEY_LIST',
  FETCH_USERSURVEY: 'userSurvey/FETCH_USERSURVEY',
  CREATE_USERSURVEY: 'userSurvey/CREATE_USERSURVEY',
  UPDATE_USERSURVEY: 'userSurvey/UPDATE_USERSURVEY',
  DELETE_USERSURVEY: 'userSurvey/DELETE_USERSURVEY',
  RESET: 'userSurvey/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserSurvey>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserSurveyState = Readonly<typeof initialState>;

// Reducer

export default (state: UserSurveyState = initialState, action): UserSurveyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERSURVEY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERSURVEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERSURVEY):
    case REQUEST(ACTION_TYPES.UPDATE_USERSURVEY):
    case REQUEST(ACTION_TYPES.DELETE_USERSURVEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERSURVEY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERSURVEY):
    case FAILURE(ACTION_TYPES.CREATE_USERSURVEY):
    case FAILURE(ACTION_TYPES.UPDATE_USERSURVEY):
    case FAILURE(ACTION_TYPES.DELETE_USERSURVEY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSURVEY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSURVEY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERSURVEY):
    case SUCCESS(ACTION_TYPES.UPDATE_USERSURVEY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERSURVEY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-surveys';

// Actions

export const getEntities: ICrudGetAllAction<IUserSurvey> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERSURVEY_LIST,
  payload: axios.get<IUserSurvey>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserSurvey> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERSURVEY,
    payload: axios.get<IUserSurvey>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserSurvey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERSURVEY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserSurvey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERSURVEY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserSurvey> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERSURVEY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
