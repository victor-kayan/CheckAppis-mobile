import {
  GET_ALL_APIARIOS_BY_USER_SUCCESS,
  LOADING_APIARIO,
  GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_SUCCESS,
  GET_COUNT_APIARIOS_BY_APICULTOR_SUCCESS,
  GET_ALL_APIARIOS_BY_USER_ERROR,
  GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_ERROR,
} from "./actionsType";
import { Api } from "../../../../services";
import { URLS } from "../../../../assets";
import { Toast } from "native-base";

export const fetchApiariosByUser = (showToast = false) => {
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
          type: GET_ALL_APIARIOS_BY_USER_SUCCESS,
          payload: {
            apiarios: response.data.apiarios
          }
        });
      })
      .catch(error => {
        if (showToast) {
          Toast.show({
            text: "Verifique sua conexão com a internet",
            textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
            type: "warning"
          });
        }
        dispatch({
          type: GET_ALL_APIARIOS_BY_USER_ERROR,
          payload: {
            error: error
          }
        });
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
          type: GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_SUCCESS,
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
          type: GET_APIARIOS_WITH_INTERVENCOES_IN_COLMEIAS_ERROR,
          payload: {
            error
          }
        });
      });
  };
};

export const updateAllApiariosByApicultor = (apiarios, countApiarios) => {
  return dispatch => {
    dispatch({
      type: GET_COUNT_APIARIOS_BY_APICULTOR_SUCCESS,
      payload: { countApiarios }
    });
    
    dispatch({
      type: GET_ALL_APIARIOS_BY_USER_SUCCESS,
      payload: { apiarios }
    });
  }
}