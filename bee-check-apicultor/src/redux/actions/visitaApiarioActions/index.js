import {
  VISITA_APIARIO_LOADING,
  VISITA_APIARIO_GET_ALL_BY_APIARIO,
  VISITA_APIARIO_CREATE,
  VISITA_APIARIO_DELETE
} from "./actionsTypes";
import { Alert } from "react-native";
import { uris } from "../../../../assets";
import { Api } from "../../../../services";
import moment from "moment";
import axios from "axios";

export const fecthVisitaApiarioByApiario = ({ apiario_id }) => {
  console.log("GET VISITAS DO APIARIO " + apiario_id);
  return dispatch => {
    dispatch({
      type: VISITA_APIARIO_LOADING,
      payload: {
        loading: true
      }
    });
    // axios.get(uris.BASE_URL+ uris.GET_VISITAS_BY_APIARIO + apiario_id)
    Api.instance
      .get(uris.GET_VISITAS_BY_APIARIO + apiario_id)
      .then(function(response) {
        console.log("sucesso");
        dispatch({
          type: VISITA_APIARIO_GET_ALL_BY_APIARIO,
          payload: {
            loading: false,
            visitasApiario: response.data.visitas
          }
        });
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Alert.alert(
            error.response.status + " " + error.response.data.message
          );
        }
        dispatch({
          type: VISITA_APIARIO_LOADING,
          payload: {
            logged: false,
            loading: false
          }
        });
      });
  };
};

export const createVisitaApiario = ({
  tem_agua,
  tem_sombra,
  tem_comida,
  apiario_id,
  observacao
}) => {
  console.log("CREATE VISITA APIARIO " + apiario_id);
  var data_visita = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(tem_agua + " " + tem_sombra + " " + tem_comida + " ");
  return dispatch => {
    dispatch({
      type: VISITA_APIARIO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .post(uris.POST_VISITA_APIARIO, {
        tem_agua,
        tem_sombra,
        tem_comida,
        apiario_id,
        data_visita,
        observacao
      })
      .then(response => {
        console.log(response);
        dispatch(fecthVisitaApiarioByApiario({apiario_id}));
        dispatch({
          type: VISITA_APIARIO_CREATE,
          payload: {
            loading: false,
            visitaApiario: response.data.visitaApiario
          }
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Alert.alert(
            error.response.status + " " + error.response.data.message
          );
        }
        dispatch({
          type: VISITA_APIARIO_LOADING,
          payload: {
            logged: false,
            loading: false
          }
        });
        throw error;
      });
  };
};

export const deleteVisitaApiario = ({ visita_id, apiario_id}) => {
  console.log("DELETE VISITA APIARIO " + visita_id);

  return dispatch => {
    dispatch({
      type: VISITA_APIARIO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .delete(uris.DELETE_VISITA_APIARIO + visita_id)
      .then(response => {
        console.log(response);
        dispatch(fecthVisitaApiarioByApiario({apiario_id}));
        Alert.alert("Visita deletada com sucesso");
        dispatch({
          type: VISITA_APIARIO_DELETE,
          payload: {
            loading: false,
            visitaApiario: null
          }
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Alert.alert(
            error.response.status + " " + error.response.data.message
          );
        }
        dispatch({
          type: VISITA_APIARIO_LOADING,
          payload: {
            logged: false,
            loading: false
          }
        });
        throw error;
      });
  };
};
