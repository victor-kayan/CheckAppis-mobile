import {
  DELETE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA,
  UPDATE_COUNT_COLMEIAS_BY_APICULTOR,
  UPDATE_ALL_COLMEIAS,
  INITIATE_CREATE_COLMEIA,
  CREATE_COLMEIA_COMMIT,
  CREATE_COLMEIA_ROLLBACK
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
      };

    // case CREATE_COLMEIA:
    //   const colmeiasListWithNewColmeia = {
    //     [payload.apiarioId]: [
    //       payload.colmeia,
    //       ...state.colmeias[payload.apiarioId]
    //     ]
    //   };
    // 
    // return {
    //   ...state,
    //   loading: false,
    //   countColmeias: state.countColmeias + 1,
    //   colmeias: Object.assign({}, state.colmeias, colmeiasListWithNewColmeia)
    // };

    case INITIATE_CREATE_COLMEIA:
      const hivesListWithNewItem = state.colmeias[payload.apiaryId] 
        ? {
            [payload.apiaryId]: [ 
              payload.newHiveData,
              ...state.colmeias[payload.apiaryId]
            ]
          }
        : {
            [payload.apiaryId]: [ payload.newHiveData ]
          };
      
      return {
        ...state,
        loading: false,
        countColmeias: state.countColmeias + 1,
        colmeias: Object.assign({}, state.colmeias, hivesListWithNewItem)
      };

    case CREATE_COLMEIA_COMMIT:
      return {
        ...state,
      };

    case CREATE_COLMEIA_ROLLBACK:
      return {
        ...state,
      };
      
    default:
      return state;
  }
};
