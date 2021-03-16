import {
  SUBMIT_NEW_SCHOOL_REQUEST,
  SUBMIT_NEW_SCHOOL_SUCCESS,
  SUBMIT_NEW_SCHOOL_ERROR,
  DELETE_SCHOOL_REQUEST,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_ERROR,
  UPDATE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_ERROR,
} from '../actions';

export const submitSchool = (data, callBack) => ({
  type: SUBMIT_NEW_SCHOOL_REQUEST,
  payload: { data, callBack },
});

export const submitSchoolSuccess = (response) => ({
  type: SUBMIT_NEW_SCHOOL_SUCCESS,
  payload: { response },
});

export const submitSchoolFailure = (error) => ({
  type: SUBMIT_NEW_SCHOOL_ERROR,
  payload: { error },
});

export const deleteSchool = (id, callBack) => ({
  type: DELETE_SCHOOL_REQUEST,
  payload: { id, callBack },
});

export const deleteSchoolSuccess = (response) => ({
  type: DELETE_SCHOOL_SUCCESS,
  payload: { response },
});

export const deleteSchoolFailure = (error) => ({
  type: DELETE_SCHOOL_ERROR,
  payload: { error },
});

export const updateSchool = (id, data, callBack) => ({
  type: UPDATE_SCHOOL_REQUEST,
  payload: { id, data, callBack },
});

export const updateSchoolSuccess = (response) => ({
  type: UPDATE_SCHOOL_SUCCESS,
  payload: { response },
});

export const updateSchoolFailure = (error) => ({
  type: UPDATE_SCHOOL_ERROR,
  payload: { error },
});
