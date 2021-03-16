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

const INIT_STATE = {
  data: [],
  error: null,
  isLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUBMIT_NEW_SCHOOL_REQUEST:
    case DELETE_SCHOOL_REQUEST:
    case UPDATE_SCHOOL_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case SUBMIT_NEW_SCHOOL_SUCCESS:
    case DELETE_SCHOOL_SUCCESS:
    case UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SUBMIT_NEW_SCHOOL_ERROR:
    case DELETE_SCHOOL_ERROR:
    case UPDATE_SCHOOL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
