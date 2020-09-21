import {
  DELETE_COLMEIA,
  CREATE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA,
  UPDATE_COUNT_COLMEIAS_BY_APICULTOR,
  UPDATE_ALL_COLMEIAS
} from "../actions/colmeiaActions/actionsType";
import { groupArrayItemsByEqualProperty } from '../../../utils';

const initialState = {
  colmeias: {}, // Objeto com arrays de colmeias por apiários
  loading: false,
  countColmeias: 0
};

export const ColmeiaReducer = (state = initialState, action) => {
  const { payload, meta } = action;

  switch (action.type) {
    case DELETE_COLMEIA:
    // TODO: Remover a colmeia deletada do estado também sem precisar fazer outra requisição para pegar a lista
      return {
        ...state,
        loading: payload.loading
      };
      
    case CREATE_COLMEIA:
      const colmeiasListWithNewColmeia = {
        [payload.apiarioId]: [
          payload.colmeia,
          ...state.colmeias[payload.apiarioId]
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
        loading: payload.loading
      };

    case GET_COLMEIA_BY_APIARIO:
      const updatedApiarioColmeiasList = {
        [payload.apiarioId]: payload.colmeias
      };

      return {
        ...state,
        loading: false,
        colmeias: Object.assign({}, state.colmeias, updatedApiarioColmeiasList)
      };

    case UPDATE_COUNT_COLMEIAS_BY_APICULTOR:
      return {
        ...state,
        loading: false,
        countColmeias: payload.countColmeias
      };

    case EDIT_COLMEIA:
    // TODO: Atualizar colmeias editada no estado sem precisar fazer outra requisição para pegar a lista
      return {
        ...state,
        loading: payload.loading
      };

    case UPDATE_ALL_COLMEIAS:
      return {
        ...state,
        colmeias: groupArrayItemsByEqualProperty(
          payload.allColmeias, 'apiario_id'
        )
      }
      
    default:
      return state;
  }
};
