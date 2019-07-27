import {
  GET_ALL_APIARIOS_BY_USER,
  LOADING_APIARIO,
  GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS,
  GET_COUNT_APIARIOS_BY_APICULTOR
} from "../actions/apiarioActions/actionsType";

const initialState = {
  apiarios: null,
  loading: false,
  countApiarios: 0
};
export const ApiarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_APIARIOS_BY_USER:
      return {
        ...state,
        apiarios: action.payload.apiarios,
        loading: action.payload.loading
      };

    case GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS:
      return {
        ...state,
        apiarios: action.payload.apiarios,
        loading: false
      };

    case GET_COUNT_APIARIOS_BY_APICULTOR:
      return {
        ...state,
        countApiarios: action.payload.countApiarios,
        loading: false
      };

    case LOADING_APIARIO:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};
