import {
  GET_VISITAS_BY_APIARIO,
  VISITA_LOADING,
  VISITA_APIARIO_CREATE_SUCCESS,
  VISITA_APIARIO_DELETE_SUCCESS
} from "./actionsTypes";
import { uris } from "../../../../assets";
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
    // axios.get(uris.BASE_URL+ uris.GET_VISITAS_BY_APIARIO + apiario_id)
    Api.instance
      .get(uris.GET_VISITAS_BY_APIARIO + apiario_id)
      .then(function(response) {
        console.log(response);
        dispatch({
          type: GET_VISITAS_BY_APIARIO,
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
      .post(uris.POST_VISITA_APIARIO, {
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
      .delete(uris.DELETE_VISITA_APIARIO + visita_id)
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
