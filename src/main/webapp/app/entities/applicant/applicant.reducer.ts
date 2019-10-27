import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplicant, defaultValue } from 'app/shared/model/applicant.model';

export const ACTION_TYPES = {
  FETCH_APPLICANT_LIST: 'applicant/FETCH_APPLICANT_LIST',
  FETCH_APPLICANT: 'applicant/FETCH_APPLICANT',
  CREATE_APPLICANT: 'applicant/CREATE_APPLICANT',
  UPDATE_APPLICANT: 'applicant/UPDATE_APPLICANT',
  DELETE_APPLICANT: 'applicant/DELETE_APPLICANT',
  RESET: 'applicant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApplicant>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ApplicantState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicantState = initialState, action): ApplicantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPLICANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICANT):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICANT):
    case REQUEST(ACTION_TYPES.DELETE_APPLICANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APPLICANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPLICANT):
    case FAILURE(ACTION_TYPES.CREATE_APPLICANT):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICANT):
    case FAILURE(ACTION_TYPES.DELETE_APPLICANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICANT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICANT):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICANT):
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

const apiUrl = 'api/applicants';

// Actions

export const getEntities: ICrudGetAllAction<IApplicant> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APPLICANT_LIST,
  payload: axios.get<IApplicant>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IApplicant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICANT,
    payload: axios.get<IApplicant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApplicant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApplicant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplicant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICANT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
