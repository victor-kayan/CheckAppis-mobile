import * as VisitaTypes from "../actions/visitaActions/actionsTypes";
import { getKeyByValue } from "../../../helps";

const initialState = {
  visitas: [],
  visitaIsLoading: false,

  storeMessages: null,
  storeError: null
};
export const VisitaReducer = (state = initialState, action) => {
  const { type, payload } = action;

  // Global states
  if (getKeyByValue(VisitaTypes, type)) {
    state = {
      ...state,
      storeError:
        payload.storeError && payload.storeError ? payload.storeError : null,
      storeMessages:
        payload.storeMessages && payload.storeMessages
          ? payload.storeMessages
          : null
    };
  }

  switch (type) {
    case VisitaTypes.GET_VISITAS_BY_APIARIO:
      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading,
        visitas: payload.visitas
      };
    case VisitaTypes.VISITA_LOADING:
      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading
      };
    case VisitaTypes.VISITA_APIARIO_CREATE_SUCCESS:
      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading,
        visitas: [...state.visitas, payload.visita]
      };
    case VisitaTypes.VISITA_APIARIO_DELETE_SUCCESS:
      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading
      };
    default:
      return state;
  }
};
