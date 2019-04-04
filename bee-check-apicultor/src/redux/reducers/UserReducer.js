import { LOGIN, LOGOUT, LOADING_LOGIN } from "../actions/userActions/actionsType";

const initialState = {
  user: {},
  loading: false,
  logged: false,
  token: '',
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: action.payload.loading,
        logged: action.payload.logged,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: action.payload.user,
        loading: action.payload.loading,
        logged: action.payload.logged,
        token: action.payload.token
      };
    case LOADING_LOGIN:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};
