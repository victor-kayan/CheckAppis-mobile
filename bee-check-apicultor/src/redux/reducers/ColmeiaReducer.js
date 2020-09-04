import {
  DELETE_COLMEIA,
  CREATE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA,
  GET_COUNT_COLMEIAS_BY_APIARIOS_APICULTOR
} from "../actions/colmeiaActions/actionsType";

const initialState = {
  colmeias: {}, // Objeto com arrays de colmeias por apiários
  loading: false,
  countColmeias: 0
};

export const ColmeiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COLMEIA:
    // TODO: Remover a colmeia deletada do estado também sem precisar fazer outra requisição para pegar a lista
      return {
        ...state,
        loading: action.payload.loading
      };
      
    case CREATE_COLMEIA:
      const colmeiasListWithNewColmeia = {
        [action.payload.apiarioId]: [
          action.payload.colmeia,
          ...state.colmeias[action.payload.apiarioId]
        ]
      };

      return {
        ...state,
        loading: false,
        colmeias: Object.assign({}, state.colmeias, colmeiasListWithNewColmeia)
      };

    case LOADING_COLMEIA:
      return {
        ...state,
        loading: action.payload.loading
      };

    case GET_COLMEIA_BY_APIARIO:
      const updatedApiarioColmeiasList = {
        [action.payload.apiarioId]: action.payload.colmeias
      };

      return {
        ...state,
        loading: false,
        colmeias: Object.assign({}, state.colmeias, updatedApiarioColmeiasList)
      };

    case GET_COUNT_COLMEIAS_BY_APIARIOS_APICULTOR:
      return {
        ...state,
        loading: false,
        countColmeias: action.payload.countColmeias
      };

    case EDIT_COLMEIA:
    // TODO: Atualizar colmeias editada no estado sem precisar fazer outra requisição para pegar a lista
      return {
        ...state,
        loading: action.payload.loading
      };
      
    default:
      return state;
  }
};
