import {
  GET_ALL_APIARIOS_BY_USER,
  LOADING_APIARIO,
  GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS,
  GET_COUNT_APIARIOS_BY_APICULTOR
} from "./actionsType";
import { Api } from "../../../../services";
import { URLS } from "../../../../assets";
import { Toast } from "native-base";

export const fetchApiariosByUser = () => {
  return dispatch => {
    dispatch({
      type: LOADING_APIARIO,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(URLS.GET_APIARIOS_BY_USER_URL)
      .then(response => {
        dispatch({
          type: GET_ALL_APIARIOS_BY_USER,
          payload: {
            apiarios: response.data.apiarios,
            loading: false
          }
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "warning"
        });
        dispatch({
          type: LOADING_APIARIO,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const fetchApiariosHasColmeiasHasIntervencoes = () => {
  return dispatch => {
    dispatch({
      type: LOADING_APIARIO,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(URLS.GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_URL)
      .then(response => {
        dispatch({
          type: GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS,
          payload: {
            apiarios: response.data.apiarios
          }
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "warning"
        });
        dispatch({
          type: LOADING_APIARIO,
          payload: {
            loading: false
          }
        });
      });
  };
};

export const getCountApiariosByApicultor = () => {
  return dispatch => {
    dispatch({
      type: LOADING_APIARIO,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(URLS.GET_COUNT_APIARIOS_URL)
      .then(response => {
        dispatch({
          type: GET_COUNT_APIARIOS_BY_APICULTOR,
          payload: {
            countApiarios: response.data.count_apiarios
          }
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "warning"
        });
        dispatch({
          type: LOADING_APIARIO,
          payload: {
            loading: false
          }
        });
      });
  };
};
