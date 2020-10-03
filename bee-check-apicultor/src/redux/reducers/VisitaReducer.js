import * as VisitaTypes from "../actions/visitaActions/actionsTypes";
import { 
  getKeyByValue, 
  groupArrayItemsByEqualProperty,
  updateObjectOnInitiateItemCreation,
  updateObjectOnCreationCommit,
  updateObjectOnCreationRollback
} from "../../../utils";

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

    case VisitaTypes.INITIATE_CREATE_VISITA:
      const { newVisitaData, apiaryId } = payload;

      return {
        ...state,
        visitas: updateObjectOnInitiateItemCreation(
          newVisitaData, apiaryId, state.visitas
        )
      };

    case VisitaTypes.CREATE_VISITA_COMMIT:
      if (meta.completed && meta.success && payload.data.visita.isSynced) {
        const newVisit = payload.data.visita;
        const apiaryId = newVisit.apiario_id;

        return {
          ...state,
          visitas: updateObjectOnCreationCommit(newVisit, apiaryId, state.visitas),
        };
      }
      return state;

    case VisitaTypes.CREATE_VISITA_ROLLBACK:
      if (meta.completed && !meta.success) {
        const { visitUuid, apiaryId } = meta;

        return { 
          ...state,
          visitas: updateObjectOnCreationRollback(
            visitUuid, apiaryId, state.visitas
          )
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
