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
import { 
  groupArrayItemsByEqualProperty,
  updateObjectOnInitiateItemCreation,
  updateObjectOnCreationCommit,
  updateObjectOnCreationRollback
} from '../../../utils';

const initialState = {
  colmeias: {}, // Objeto com arrays de colmeias por apiários
  loading: false,
  countColmeias: 0
};

export const ColmeiaReducer = (state = initialState, action) => {
  const { payload, meta } = action;

  function getFailedHivesByApiary(apiaryId) {
    const failedHives = state.colmeias[apiaryId]
      ? state.colmeias[apiaryId].filter(hive => {
          return hive.permanentlyFailed && !hive.isSynced;
        })
      : [];

    return failedHives;
  }

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
      const updatedHivesFromCurrentApiary = {
        [payload.apiarioId]: [
          ...payload.colmeias, ...getFailedHivesByApiary(payload.apiarioId)
        ]
      };

      return {
        ...state,
        loading: false,
        colmeias: Object.assign({}, state.colmeias, updatedHivesFromCurrentApiary)
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
      let allFailedHives = [];

      Object.entries(state.colmeias)[0].forEach(apiaryId =>
        allFailedHives.push(...getFailedHivesByApiary(apiaryId))
      );

      const allHives = [...payload.allColmeias, ...allFailedHives];

      return {
        ...state,
        colmeias: groupArrayItemsByEqualProperty(allHives, 'apiario_id')
      };

    case INITIATE_CREATE_COLMEIA:
      const { newHiveData, apiaryId } = payload;

      return {
        ...state,
        loading: false,
        countColmeias: state.countColmeias + 1,
        colmeias: updateObjectOnInitiateItemCreation(
          newHiveData, apiaryId, state.colmeias
        )
      };

    case CREATE_COLMEIA_COMMIT:
      if (meta.completed && meta.success && payload.data.colmeia.isSynced) {
        const newHive = payload.data.colmeia;
        const apiaryId = newHive.apiario_id;

        return {
          ...state,
          colmeias: updateObjectOnCreationCommit(newHive, apiaryId, state.colmeias),
        };
      }
      return state;

    case CREATE_COLMEIA_ROLLBACK:
      if (meta.completed && !meta.success) {
        const { hiveUuid, apiaryId } = meta;

        return { 
          ...state,
          countColmeias: state.countColmeias - 1,
          colmeias: updateObjectOnCreationRollback(
            hiveUuid, apiaryId, state.colmeias
          )
        };
      }
      return state;
      
    default:
      return state;
  }
};
