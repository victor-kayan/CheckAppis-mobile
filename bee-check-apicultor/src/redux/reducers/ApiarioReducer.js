import {
  GET_ALL_APIARIOS_BY_USER_SUCCESS,
  LOADING_APIARIO,
  GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_SUCCESS,
  GET_COUNT_APIARIOS_BY_APICULTOR_SUCCESS,
  GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_ERROR,
  GET_ALL_APIARIOS_BY_USER_ERROR,
  GET_COUNT_APIARIOS_BY_APICULTOR_ERROR
} from "../actions/apiarioActions/actionsType";

const initialState = {
  apiarios: null,
  loading: false,
  countApiarios: 0,
  error: null
};
export const ApiarioReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_APIARIOS_BY_USER_SUCCESS:
      return {
        ...state,
        apiarios: payload.apiarios,
        loading: false
      };

    case GET_ALL_APIARIOS_BY_USER_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false
      };

    case GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_SUCCESS:
      return {
        ...state,
        apiarios: payload.apiarios,
        loading: false
      };

    case GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false
      };

    case GET_COUNT_APIARIOS_BY_APICULTOR_SUCCESS:
      return {
        ...state,
        countApiarios: payload.countApiarios,
        loading: false
      };

    case GET_COUNT_APIARIOS_BY_APICULTOR_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false
      };

    case LOADING_APIARIO:
      return {
        ...state,
        loading: payload.loading
      };
    default:
      return state;
  }
};
