import {
  VISITA_COLMEIA_GET_ALL_BY_VISITA_APIARIO,
  VISITA_COLMEIA_LOADING,
  VISITA_COLMEIA_CREATE
} from "../actions/visitaColmeiaActions/actionsTypes";

const initialState = {
  visitasComeia: null,
  loading: false
};
export const VisitaColmeiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case VISITA_COLMEIA_GET_ALL_BY_VISITA_APIARIO:
      return {
        ...state,
        loading: action.payload.loading,
        visitasColmeia: action.payload.visitasColmeia
      };
    case VISITA_COLMEIA_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    case VISITA_COLMEIA_CREATE:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};

