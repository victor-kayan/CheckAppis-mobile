import {INTERVENCAO_GET_ALL_BY_APIARIO, INTERVENCAO_LOADING, INTERVENCAO_CONCLUIR} from "../actions/intervencaoActions/actionsType";

const initialState = {
  intervencoes: null,
  loading: false
};

export const IntervencaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERVENCAO_GET_ALL_BY_APIARIO:
      return {
        ...state,
        loading: action.payload.loading,
        intervencoes: action.payload.intervencoes
      };
    case INTERVENCAO_CONCLUIR:
      return {
        ...state,
        loading: action.payload.loading
      }
    case INTERVENCAO_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};
