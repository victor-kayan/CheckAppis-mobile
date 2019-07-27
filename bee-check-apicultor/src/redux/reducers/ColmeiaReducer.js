import {
  DELETE_COLMEIA,
  CREATE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA,
  GET_COUNT_COLMEIAS_BY_APIARIOS_APICULTOR
} from "../actions/colmeiaActions/actionsType";

const initialState = {
  loading: false,
  colmeias: [],
  countColmeias: 0
};
export const ColmeiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading
      };
    case CREATE_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading,
        colmeias: [...state.colmeias, action.payload.colmeia]
      };
    case LOADING_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading
      };
    case GET_COLMEIA_BY_APIARIO:
      return {
        ...state,
        loading: action.payload.loading,
        colmeias: action.payload.colmeias
      };
    case GET_COUNT_COLMEIAS_BY_APIARIOS_APICULTOR:
      return {
        ...state,
        loading: false,
        countColmeias: action.payload.countColmeias
      };
    case EDIT_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};
