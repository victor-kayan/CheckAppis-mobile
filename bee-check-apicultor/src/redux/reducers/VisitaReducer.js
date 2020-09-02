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
      const failedVisits = state.visitas.filter(visit => {
        return visit.permanentlyFailed && !visit.isSynced
      });

      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading,
        visitas: [...payload.visitas, ...failedVisits]
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
        visitas: [payload.newVisitaData, ...state.visitas]
      };

    case VisitaTypes.CREATE_VISITA_COMMIT:
      if (meta.success && meta.completed && payload.visita.isSynced) {
        const updatedVisitas = state.visitas.map(visita => {
          if(visita.uuid === payload.visita.uuid) {
            return Object.assign({}, visita, payload.visita);
          }
          return visita;
        });

        return {
          ...state,
          visitas: updatedVisitas
        };
      }
      return state;

    case VisitaTypes.CREATE_VISITA_ROLLBACK:
      if (meta.completed && !meta.success) {
        const updatedVisitas = state.visitas.map(visita => {
          if(visita.uuid === meta.visitUuid) {
            return Object.assign({}, visita, { permanentlyFailed: true })
          }
          return visita;
        }); 

        return { 
          ...state,
          visitas: updatedVisitas
        };
      }
      return state;
    
    default:
      return state;
  }
};
