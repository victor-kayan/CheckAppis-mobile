import {
  GET_VISITAS_BY_APIARIO_URL,
  VISITA_LOADING,
  VISITA_APIARIO_CREATE_SUCCESS,
  VISITA_APIARIO_DELETE_SUCCESS
} from "./actionsTypes";
import { URLS } from "../../../../assets";
import { Api } from "../../../../services";
import { Toast } from "native-base";

export const getVisitasByApiario = ({ apiario_id }) => {
  return dispatch => {
    dispatch({
      type: VISITA_LOADING,
      payload: {
        visitaIsLoading: true
      }
    });
    // axios.get(URLS.BASE_URL+ URLS.GET_VISITAS_BY_APIARIO_URL + apiario_id)
    Api.instance
      .get(URLS.formattedURL(URLS.GET_VISITAS_BY_APIARIO_URL, { apiario_id }))
      .then(function(response) {
        dispatch({
          type: GET_VISITAS_BY_APIARIO_URL,
          payload: {
            visitaIsLoading: false,
            visitas: response.data.visitas
          }
        });
      })
      .catch(function(error) {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        dispatch({
          type: VISITA_LOADING,
          payload: {
            visitaIsLoading: false,
            storeError: error,
            storeMessages: error.response && error.response.data.message
          }
        });
      });
  };
};

export const createVisita = data => {
  return dispatch => {
    dispatch({
      type: VISITA_LOADING,
      payload: {
        visitaIsLoading: true
      }
    });
    Api.instance
      .post(URLS.CREATE_VISITA_URL, {
        ...data
      })
      .then(response => {
        dispatch({
          type: VISITA_APIARIO_CREATE_SUCCESS,
          payload: {
            visitaIsLoading: false,
            visita: response.data.visita,
            storeMessages: response.data.message
          }
        });
      })
      .catch(error => {
        dispatch({
          type: VISITA_LOADING,
          payload: {
            visitaIsLoading: false,
            storeError: error,
            storeMessages: error.response && error.response.data.message
          }
        });
      });
  };
};

export const deleteVisita = ({ visita_id, apiario_id }) => {
  return dispatch => {
    dispatch({
      type: VISITA_LOADING,
      payload: {
        visitaIsLoading: true
      }
    });
    Api.instance
      .delete(
        URLS.formattedURL(URLS.DELETE_VISITA_URL, { visita_id: visita_id })
      )
      .then(response => {
        dispatch(getVisitasByApiario({ apiario_id }));
        Toast.show({
          text: "Visita deletada com sucesso",
          buttonText: "",
          type: "success"
        });
        dispatch({
          type: VISITA_APIARIO_DELETE_SUCCESS,
          payload: {
            visitaIsLoading: false,
            storeMessages: response.data.message
          }
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        dispatch({
          type: VISITA_LOADING,
          payload: {
            visitaIsLoading: false,
            storeError: error,
            storeMessages: error.response && error.response.data.message
          }
        });
      });
  };
};
