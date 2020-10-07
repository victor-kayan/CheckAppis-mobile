import {
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_LOADING,
  INTERVENCAO_CONCLUIR_ERROR,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
  INTERVENCAO_COLMEIA_CONCLUIR_ERROR,
  INITIATE_CONCLUIR_INTERVENCAO_APIARIO,
  CONCLUIR_INTERVENCAO_APIARIO_COMMIT,
  CONCLUIR_INTERVENCAO_APIARIO_ROLLBACK,
  UPDATE_COUNT_INTERVENCOES_BY_APICULTOR,
  UPDATE_ALL_INTERVENCOES_APIARIOS,
  UPDATE_ALL_INTERVENCOES_COLMEIAS
} from "../actions/intervencaoActions/actionsType";
import { groupArrayItemsByEqualProperty } from '../../../utils';

const initialState = {
  intervencoes: null, // Lista de intervenções por apiários
  intervencoesByApiario: null, // Lista de intervenções nas colmeias por apiários
  loading: false,
  concluirIntervencaoSuccess: false,
  countIntervencoes: 0,  // Número de intervenções gerais (aos apiários e às colmeias) pendentes
  interventionConclusionFailed: false
};

export const IntervencaoReducer = (state = initialState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case INTERVENCAO_GET_ALL_BY_APICULTOR:
      return {
        ...state,
        loading: false,
        intervencoes: payload.intervencoes
      };

    case INTERVENCAO_GET_ALL_BY_APIARIO:
      const updatedColmeiasIntervencoesFromCurrentApiario = {
        [payload.apiaryId]: payload.intervencoesByApiario
      };
      
      return {
        ...state,
        loading: false,
        intervencoesByApiario: Object.assign(
          {},
          state.intervencoesByApiario,
          updatedColmeiasIntervencoesFromCurrentApiario
        )
      };

    case INITIATE_CONCLUIR_INTERVENCAO_APIARIO:
      const apiariesInterventionsWithNewConclusion = state.intervencoes.map(intervention => {
        if (intervention.id === payload.interventionData.id) {
          return Object.assign({}, intervention, { 
            is_concluido: true, // Determina se a intervenção foi concluída.
            isConclusionSynced: false // Determina se a solicitação de conclusão da intervenção foi bem sucedida. Por padrão, inicialmente, será false, pois será salvo apenas localmente.
          });
        }
        return intervention;
      });  
    
      return {
        ...state,
        intervencoes: apiariesInterventionsWithNewConclusion
        // countIntervencoes: state.countIntervencoes - 1,
      };

    case CONCLUIR_INTERVENCAO_APIARIO_COMMIT:
      if (meta.completed && meta.success) {
        const apiariesInterventionsWithConclusionSynced = state.intervencoes.map(intervention =>
          intervention.id === meta.interventionId
            ? Object.assign({}, intervention, { isConclusionSynced: true })
            : intervention
        );

        return {
          ...state,
          intervencoes: apiariesInterventionsWithConclusionSynced
        }
      }
      return state;

    case CONCLUIR_INTERVENCAO_APIARIO_ROLLBACK:
      if (meta.completed && !meta.success) {
        const apiariesInterventionsRollbacked = state.intervencoes.map(intervention =>
          intervention.id === meta.interventionId
            ? Object.assign({}, intervention, { is_concluido: false })
            : intervention
        );

        return {
          ...state,
          intervencoes: apiariesInterventionsRollbacked,
          interventionConclusionFailed: true
          // countIntervencoes: state.countIntervencoes + 1
        }
      }
      return state;


    case INTERVENCAO_CONCLUIR_ERROR:
      return {
        ...state,
        loading: false,
        concluirIntervencaoSuccess: false
      };

    case INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS:
      return {
        ...state,
        loading: false,
        concluirIntervencaoSuccess: true,
      };

    case INTERVENCAO_COLMEIA_CONCLUIR_ERROR:
      return {
        ...state,
        loading: false,
        concluirIntervencaoSuccess: false
      };

    case INTERVENCAO_LOADING:
      return {
        ...state,
        loading: payload.loading,
        concluirIntervencaoSuccess: false
      };

    case UPDATE_COUNT_INTERVENCOES_BY_APICULTOR:
      return {
        ...state,
        loading: false,
        countIntervencoes: payload.countIntervencoes
      };

    case UPDATE_ALL_INTERVENCOES_APIARIOS:
      return {
        ...state,
        intervencoes: payload.intervencoesNosApiarios
      }

    case UPDATE_ALL_INTERVENCOES_COLMEIAS:
      return {
        ...state,
        intervencoesByApiario: groupArrayItemsByEqualProperty(
          payload.intervencoesNasColmeias, 'colmeia.apiario_id'
        )
      }

    default:
      return state;
  }
};
