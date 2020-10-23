import { LOGIN, LOGOUT, LOADING_LOGIN, GET_INFORMATIONS_USER } from "./actionsType";
import { Api } from "../../../../services";
import { URLS, constants } from "../../../../assets";
import { AsyncStorage } from "react-native";

export const login = ({ email, password }) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOGIN,
      payload: {
        loading: true
      }
    });
    Api.instance.post(URLS.LOGIN_URL, { email, password })
      .then(response => {
        Api.instance.defaults.headers.Authorization = `Bearer ${
          response.data.token
        }`;
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            logged: true,
            token: response.data.token,
            user: response.data.user
          }
        });
      })
      .catch(error => {
        dispatch({
          type: LOADING_LOGIN,
          payload: {
            logged: false,
            loading: false
          }
        });
        throw error;
      });
  };
};

export const logout = () => {

  return dispatch => {
    dispatch({
      type: LOADING_LOGIN,
      payload: {
        loading: false
      }
    });

    Api.instance.post(URLS.LOGOUT_URL)
      .then(response => {
        AsyncStorage.removeItem(`@beecheckApp:${constants.ACCESS_TOKEN}`);
        dispatch({
          type: LOGOUT,
          payload: {
            user: {},
            loading: false,
            logged: false,
            token: ""
          }
        });
      })
      .catch(error => {
        dispatch({
          type: LOADING_LOGIN,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const fetchDataUser = () => {
  
  return dispatch => {
    dispatch({
      type: GET_INFORMATIONS_USER,
      payload: {
        loading: true
      }
    });
    Api.instance.post(URLS.BASE_URL, constants.ACCESS_TOKEN)
      .then(response => {
        Api.instance.defaults.headers.Authorization = `Bearer ${
          response.data.token
        }`;
        dispatch({
          type: GET_INFORMATIONS_USER,
          payload: {
            loading: false,
            logged: true,
            token: response.data.token,
          }
        });
      })
      .catch(error => {
        dispatch({
          type: GET_INFORMATIONS_USER,
          payload: {
            logged: false,
            loading: false
          }
        });
        throw error;
      });
  };

};
