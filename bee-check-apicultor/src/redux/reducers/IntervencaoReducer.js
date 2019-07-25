import {
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_LOADING,
  INTERVENCAO_CONCLUIR_SUCCESS,
  INTERVENCAO_CONCLUIR_ERROR,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
  INTERVENCAO_COLMEIA_CONCLUIR_ERROR
} from "../actions/intervencaoActions/actionsType";

const initialState = {
  intervencoes: null,
  intervencoesByApiario: null,
  loading: false,
  concluirIntervencaoSuccess: false
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
    default:
      return state;
  }
};
