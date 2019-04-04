import {
  INTERVENCAO_COLMEIA_GET_ALL_BY_INTERVENCAO,
  INTERVENCAO_COLMEIA_LOADING,
  INTERVENCAO_COLMEIA_CONCLUIR
} from "../actions/intervencaoColmeiaActions/actionsType";

const initialState = {
  intervencoes: null,
  loading: false
};

export const IntervencaoColmeiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERVENCAO_COLMEIA_GET_ALL_BY_INTERVENCAO:
      return {
        ...state,
        loading: action.payload.loading,
        intervencoes: action.payload.intervencoes
      };
    case INTERVENCAO_COLMEIA_CONCLUIR:
      return {
        ...state,
        loading: action.payload.loading
      };
    case INTERVENCAO_COLMEIA_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};
