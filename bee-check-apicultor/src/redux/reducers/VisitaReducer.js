import * as VisitaTypes from "../actions/visitaActions/actionsTypes";
import { getKeyByValue } from "../../../helps";

import tron from '../../config/ReactotronConfig'

const initialState = {
  visitas: [],
  visitaIsLoading: false,

  storeMessages: null,
  storeError: null
};
export const VisitaReducer = (state = initialState, action) => {
  const { type, payload, meta } = action;

  // Global states
  if (getKeyByValue(VisitaTypes, type)) {
    state = {
      ...state,
      storeError:
        payload.storeError && payload.storeError
          ? payload.storeError
          : null,
      storeMessages:
        payload.storeMessages && payload.storeMessages
          ? payload.storeMessages
          : null
    };
  }

  switch (type) {
    case VisitaTypes.GET_VISITAS_BY_APIARIO_URL:
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

    case VisitaTypes.INITIATE_CREATE_VISITA:
      return {
        ...state,
        visitas: [...state.visitas, payload.newVisitaData]
      };

    case VisitaTypes.CREATE_VISITA_COMMIT:
      if (meta.success && meta.completed && payload.message === 'Visita registrada com sucesso') {
        const updatedVisitas = state.visitas.map(visita => {
          if(visita.id === payload.visita.id) {
            return Object.assign({}, visita, { isSynced: true })
          }
          return visita;
        });

        tron.log(updatedVisitas)

        return {
          ...state,
          visitas: updatedVisitas
        }
      }
      return state;

    case VisitaTypes.CREATE_VISITA_ROLLBACK:
      return state;
    
    default:
      return state;
  }
};
