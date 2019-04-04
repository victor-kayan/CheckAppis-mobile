import {
  FECTHALL_BY_USER, LOADING_APIARIO
} from "../actions/apiarioActions/actionsType";

const initialState = {
  apiarios: null,
  loading: false
};
export const ApiarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FECTHALL_BY_USER:
      return {
        ...state,
        apiarios: action.payload.apiarios,
        loading: action.payload.loading,
      };
    case LOADING_APIARIO:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};
