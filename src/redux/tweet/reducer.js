import {
  GET_STATISTICS_REQUEST,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
} from "../actions";

const INIT_STATE = {
  dataHandle: {},
  dataVaccine: {},
  error: null,
  isLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STATISTICS_REQUEST:
      return { ...state, isLoading: true, error: "" };
    case GET_STATISTICS_SUCCESS:
      // console.log(action);
      const { types, response } = action.payload;
      if (types === "handle") {
        return {
          ...state,
          isLoading: false,
          dataHandle: response,
          error: null,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          dataVaccine: response,
          error: null,
        };
      }
    case GET_STATISTICS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
