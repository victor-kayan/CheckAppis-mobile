import { LOGIN, LOGOUT, LOADING_LOGIN } from "./actionsType";
import { Api } from "../../../../services";
import { uris, constants } from "../../../../assets";
import { AsyncStorage } from "react-native";

export const login = ({ email, password }) => {
  console.log("LOGIN");  
  return dispatch => {
    dispatch({
      type: LOADING_LOGIN,
      payload: {
        loading: true
      }
    });
    Api.instance.post(uris.LOGIN, { email, password })
      .then(response => {
        if (response) {
          console.log(response);
        }
        Api.instance.defaults.headers.Authorization = `Bearer ${
          response.data.token
        }`;
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            logged: true,
            token: response.data.token
          }
        });
      })
      .catch(error => {
        console.log(error);
        
        if (error.response) {

          // console.log(error.response.data);
          // console.log(error.response.status);
        }
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
  console.log("LOGOUT");

  return dispatch => {
    dispatch({
      type: LOADING_LOGIN,
      payload: {
        loading: false
      }
    });

    Api.instance.post(uris.LOGOUT)
      .then(response => {
        // if (response) {
          console.log(response);
        // }
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
        console.log(error);
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
