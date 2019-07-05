import {
  INTERVENCAO_LOADING,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_CONCLUIR
} from "./actionsType";
import { uris } from "../../../../assets";
import { Toast } from "native-base";
import { Api } from "../../../../services";

export const fecthIntervencoesByApiario = ({ apiario_id }) => {
  console.log("GET INTERVENCOES DO APIARIO " + apiario_id);
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(uris.GET_INTERVENCOES_BY_APIARIO + apiario_id)
      .then(response => {
        console.log(response);
        dispatch({
          type: INTERVENCAO_GET_ALL_BY_APIARIO,
          payload: {
            loading: false,
            intervencoes: response.data.intervencoes
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
          type: INTERVENCAO_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const concluirIntervencao = ({ intervencao_id }) => {
  console.log("CONCLUIR INERVENCAO DO APIARIO" + intervencao_id);
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(uris.GET_INTERVENCAO_APIARIO_CONCLUIR + intervencao_id)
      .then(response => {
        console.log(response);
        if (response.data.status != 200) {
          Toast.show({
            text: response.data.message,
            buttonText: "",
            type: "success"
          });
          dispatch({
            type: INTERVENCAO_LOADING,
            payload: {
              loading: false
            }
          });
        } else {
          Toast.show({
            text: "Intervenção concluida",
            buttonText: "",
            type: "success"
          });
          dispatch({
            type: INTERVENCAO_CONCLUIR,
            payload: {
              loading: false
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          Toast.show({
            text: error.response.data.message,
            buttonText: "",
            type: "danger"
          });
        }
        dispatch({
          type: INTERVENCAO_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};
