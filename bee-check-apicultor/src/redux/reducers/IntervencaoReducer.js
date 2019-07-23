import {INTERVENCAO_GET_ALL_BY_APICULTOR, INTERVENCAO_LOADING, INTERVENCAO_CONCLUIR} from "../actions/intervencaoActions/actionsType";

const initialState = {
  intervencoes: null,
  loading: false
};

export const IntervencaoReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case INTERVENCAO_GET_ALL_BY_APICULTOR:
      return {
        ...state,
        loading: payload.loading,
        intervencoes: payload.intervencoes
      };
    case INTERVENCAO_CONCLUIR:
      return {
        ...state,
        loading: payload.loading
      }
    case INTERVENCAO_LOADING:
      return {
        ...state,
        loading: payload.loading
      };
    default:
      return state;
  }
};
