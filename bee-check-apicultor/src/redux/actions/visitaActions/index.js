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
  console.log("GET VISITAS DO APIARIO " + apiario_id);
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
        console.log(response);
        dispatch({
          type: GET_VISITAS_BY_APIARIO_URL,
          payload: {
            visitaIsLoading: false,
            visitas: response.data.visitas
          }
        });
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Toast.show({
            text: error.response.data.message,
            buttonText: "",
            type: "danger"
          });
        }
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
  console.log("CREATE VISITA " + data.apiario_id);

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
        console.log(response);
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
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
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
  console.log("DELETE VISITA APIARIO " + visita_id);

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
        console.log(response);
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
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Toast.show({
            text: error.response.data.message,
            buttonText: "",
            type: "danger"
          });
        }
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
