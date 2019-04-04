import {
  VISITA_APIARIO_GET_ALL_BY_APIARIO,
  VISITA_APIARIO_LOADING,
  VISITA_APIARIO_CREATE,
  VISITA_APIARIO_DELETE,
} from "../actions/visitaApiarioActions/actionsTypes";

const initialState = {
  visitasApiario: null,
  loading: false,
  visitaApiario: null,
};
export const VisitaApiarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case VISITA_APIARIO_GET_ALL_BY_APIARIO:
      return {
        ...state,
        loading: action.payload.loading,
        visitasApiario: action.payload.visitasApiario
      };
    case VISITA_APIARIO_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    case VISITA_APIARIO_CREATE:
      return {
        ...state,
        loading: action.payload.loading,
        visitaApiario: action.payload.visitaApiario
      };
    case VISITA_APIARIO_DELETE:
      return {
        ...state,
        loading: action.payload.loading,
        visitaApiario: action.payload.visitaApiario
      }
    default:
      return state;
  }
};