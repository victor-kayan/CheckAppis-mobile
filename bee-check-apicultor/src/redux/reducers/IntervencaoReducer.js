import {
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_LOADING,
  INTERVENCAO_CONCLUIR_SUCCESS,
  INTERVENCAO_CONCLUIR_ERROR,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
  INTERVENCAO_COLMEIA_CONCLUIR_ERROR,
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
  countIntervencoes: 0
};

export const IntervencaoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INTERVENCAO_GET_ALL_BY_APICULTOR:
      return {
        ...state,
        loading: false,
        intervencoes: payload.intervencoes
      };

    case INTERVENCAO_GET_ALL_BY_APIARIO:
      return {
        ...state,
        loading: false,
        intervencoesByApiario: payload.intervencoesByApiario
      };

    case INTERVENCAO_CONCLUIR_SUCCESS:
      return {
        ...state,
        loading: false,
        concluirIntervencaoSuccess: true
      };

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
        concluirIntervencaoSuccess: true
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
        intervencoes: groupArrayItemsByEqualProperty(
          payload.intervencoesNosApiarios, 'apiario_id'
        )
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
