import {
  DELETE_COLMEIA,
  CREATE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA
} from "../actions/colmeiaActions/actionsType";

const initialState = {
  loading: false,
  colmeias: []
};
export const ColmeiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case CREATE_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading
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
    case EDIT_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state;
  }
};
