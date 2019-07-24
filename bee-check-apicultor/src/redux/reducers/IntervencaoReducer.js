import {
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_LOADING,
  INTERVENCAO_CONCLUIR,
  INTERVENCAO_CONCLUIR_SUCCESS,
  INTERVENCAO_CONCLUIR_ERROR
} from "../actions/intervencaoActions/actionsType";

const initialState = {
  intervencoes: null,
  loading: false,
  concluirIntervencaoSuccess: false
};

export const IntervencaoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INTERVENCAO_GET_ALL_BY_APICULTOR:
      return {
        ...state,
        loading: payload.loading,
        intervencoes: payload.intervencoes
      };
    case INTERVENCAO_CONCLUIR_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        concluirIntervencaoSuccess: true
      };
    case INTERVENCAO_CONCLUIR_ERROR:
      return {
        ...state,
        loading: payload.loading,
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
