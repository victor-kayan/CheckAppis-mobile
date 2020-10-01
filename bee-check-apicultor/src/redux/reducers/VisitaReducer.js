import * as VisitaTypes from "../actions/visitaActions/actionsTypes";
import { getKeyByValue, groupArrayItemsByEqualProperty } from "../../../utils";

const initialState = {
  visitas: {}, // Objeto com arrays de visitas por apiários
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
      const failedVisitasFromCurrentApiario = state.visitas[payload.apiarioId]
        ? state.visitas[payload.apiarioId].filter(visit => {
            return visit.permanentlyFailed && !visit.isSynced;
          })
        : {};

      const updatedVisitasListFromCurrentApiario = {
        [payload.apiarioId]: [...payload.visitas, ...failedVisitasFromCurrentApiario]
      };

      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading,
        visitas: Object.assign({}, state.visitas, updatedVisitasListFromCurrentApiario)
      };

    case VisitaTypes.VISITA_LOADING:
      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading
      };

    case VisitaTypes.VISITA_APIARIO_DELETE_SUCCESS:
      return {
        ...state,
        visitaIsLoading: payload.visitaIsLoading
      };

    // TODO: Adicionar verificação se state.visitas[payload.apiarioId] é undefined ou não
    // const hivesListWithNewItem = {
    //   [payload.apiaryId]: state.colmeias[payload.apiaryId] 
    //     ? [ 
    //         payload.newHiveData,
    //         ...state.colmeias[payload.apiaryId]
    //       ]
    //     : [ payload.newHiveData ]
    // };
    case VisitaTypes.INITIATE_CREATE_VISITA:
      const newVisitasListFromCurrentApiario = {
        [payload.apiarioId]: [payload.newVisitaData, ...state.visitas[payload.apiarioId]]
      };

      return {
        ...state,
        visitas: Object.assign({}, state.visitas, newVisitasListFromCurrentApiario)
      };

    case VisitaTypes.CREATE_VISITA_COMMIT:
      if (meta.completed && meta.success && payload.data.visita.isSynced) {
        const newVisita = payload.data.visita;
        const apiarioId = newVisita.apiario_id;

        const updatedVisitas = state.visitas[apiarioId].map(visita => {
          if(visita.uuid === newVisita.uuid) {
            return Object.assign({}, visita, newVisita);
          }
          return visita;
        });

        const updatedVisitasListFromCurrentApiario = {
          [apiarioId]: updatedVisitas
        };

        return {
          ...state,
          visitas: Object.assign({}, state.visitas, updatedVisitasListFromCurrentApiario)
        };
      }
      return state;

    case VisitaTypes.CREATE_VISITA_ROLLBACK:
      if (meta.completed && !meta.success) {
        const updatedVisitas = state.visitas[meta.apiarioId].map(visita => {
          if(visita.uuid === meta.visitUuid) {
            return Object.assign({}, visita, { permanentlyFailed: true })
          }
          return visita;
        });

        const updatedVisitasListFromCurrentApiario = {
          [apiarioId]: updatedVisitas
        };

        return { 
          ...state,
          visitas: Object.assign({}, state.visitas, updatedVisitasListFromCurrentApiario)
        };
      }
      return state;
    
    case VisitaTypes.UPDATE_ALL_VISITAS:
      return {
        ...state,
        visitas: groupArrayItemsByEqualProperty(payload.allVisitas, 'apiario_id')
      }
    
    default:
      return state;
  }
};
