import { AsyncStorage, Alert } from "react-native";
import { RESET_STATE as RESET_STATE_OFFLINE } from "@redux-offline/redux-offline/lib/constants";

import {
  LOGIN, 
  LOGOUT, 
  LOADING_LOGIN, 
  GET_INFORMATIONS_USER, 
  RESET_STATE_ON_LOGOUT
} from "./actionsType";
import { Api } from "../../../../services";
import { URLS, constants } from "../../../../assets";

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

export const logout = user => {
  return dispatch => {
    dispatch({
      type: LOADING_LOGIN,
      payload: {
        loading: false
      }
    });

    Api.instance.post(URLS.LOGOUT_URL, { user })
      .then(response => {
        AsyncStorage.removeItem(`@checkAppisApp:${constants.ACCESS_TOKEN}`);

        dispatch({ type: RESET_STATE_ON_LOGOUT });
        dispatch({ type: RESET_STATE_OFFLINE });
      })
      .catch(error => {
        Alert.alert(
          'Erro ao sair da conta',
          'Você precisa de internet para concluir essa ação. Por favor, verifique sua conexão e tente novamente.'
        );

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
