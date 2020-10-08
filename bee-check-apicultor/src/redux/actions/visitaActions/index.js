import {
  GET_VISITAS_BY_APIARIO_URL,
  VISITA_LOADING,
  VISITA_APIARIO_DELETE_SUCCESS,
  INITIATE_CREATE_VISITA,
  CREATE_VISITA_COMMIT,
  CREATE_VISITA_ROLLBACK,
  UPDATE_ALL_VISITAS
} from "./actionsTypes";
import { URLS } from "../../../../assets";
import { Api } from "../../../../services";
import { Toast } from "native-base";

export const getVisitasByApiario = (id, showToast = false) => {
  return dispatch => {
    dispatch({
      type: VISITA_LOADING,
      payload: {
        visitaIsLoading: true
      }
    });
    Api.instance
      .get(URLS.formattedURL(URLS.GET_VISITAS_BY_APIARIO_URL, { apiario_id: id }))
      .then(function(response) {
        dispatch({
          type: GET_VISITAS_BY_APIARIO_URL,
          payload: {
            visitas: response.data.visitas,
            visitaIsLoading: false,
            apiarioId: id
          }
        });
      })
      .catch(function(error) {
        if (showToast) {
          Toast.show({
            text: "Verifique sua conexão com a internet",
            textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
            type: "warning"
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

// TODO: Tornar função de deletar visita offline-first
export const deleteVisita = ({ visita_id, apiario_id }) => {
  return dispatch => {
    Api.instance
      .delete(
        URLS.formattedURL(URLS.DELETE_VISITA_URL, { visita_id: visita_id })
      )
      .then(response => {
        dispatch(getVisitasByApiario(apiario_id));
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
          textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
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

export const updateAllVisitasByApicultor = allVisitas => {
  return dispatch => {
    dispatch({
      type: UPDATE_ALL_VISITAS,
      payload: { allVisitas }
    });
  };
}

export const createVisita = data => {
  return dispatch => {
    dispatch({
      type: INITIATE_CREATE_VISITA,
      payload: {
        newVisitaData: data,
        apiaryId: data.apiario_id
      },
      meta: {
        offline: {
          effect: {
            method: 'POST',
            url: URLS.CREATE_VISITA_URL,
            data
          },
          commit: { 
            type: CREATE_VISITA_COMMIT,
          },
          rollback: {
            type: CREATE_VISITA_ROLLBACK,
            meta: { 
              visitUuid: data.uuid,
              apiaryId: data.apiario_id
            }
          },
        }
      }
    });
  };
};