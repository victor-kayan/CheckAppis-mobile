import {
  VISITA_COLMEIA_LOADING,
  VISITA_COLMEIA_GET_ALL_BY_VISITA_APIARIO,
  VISITA_COLMEIA_CREATE
} from "./actionsTypes";
import { uris } from "../../../../assets";
import { Api } from "../../../../services";
import moment from "moment";
import { Toast } from "native-base";

export const fecthVisitasColmeiaByVisitaApiario = ({ visita_apiario_id }) => {
  console.log("GET VISITAS DA COLMEIA  BY VISITA_APIARIO" + visita_apiario_id);
  return dispatch => {
    dispatch({
      type: VISITA_COLMEIA_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(uris.GET_VISITAS_COLMEIA_BY_VISITA_APIARIO + visita_apiario_id)
      .then(response => {
        console.log(response);
        dispatch({
          type: VISITA_COLMEIA_GET_ALL_BY_VISITA_APIARIO,
          payload: {
            loading: false,
            visitasColmeia: response.data.visitas
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
          type: VISITA_COLMEIA_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const createVisitaColmeia = ({
  qtd_quadros_mel,
  qtd_quadros_polen,
  tem_abelhas_mortas,
  qtd_cria_aberta,
  qtd_cria_fechada,
  tem_postura,
  visita_apiario_id,
  colmeia_id,
  observacao
}) => {
  console.log("CREATE VISITA COLMEIA " + colmeia_id);
  var data_visita = moment().format("YYYY-MM-DD HH:mm:ss");

  return dispatch => {
    dispatch({
      type: VISITA_COLMEIA_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .post(uris.POST_VISITA_COLMEIA, {
        qtd_quadros_mel,
        qtd_quadros_polen,
        tem_abelhas_mortas,
        qtd_cria_aberta,
        qtd_cria_fechada,
        tem_postura,
        visita_apiario_id,
        colmeia_id,
        observacao,
        data_visita
      })
      .then(response => {
        console.log(response);
        dispatch({
          type: VISITA_COLMEIA_CREATE,
          payload: {
            loading: false
          }
        });
        Toast.show({
          text: "Visita Registrada",
          buttonText: "",
          type: "success"
        });
      })
      .catch(error => {
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
          type: VISITA_COLMEIA_LOADING,
          payload: {
            logged: false,
            loading: false
          }
        });
        throw error;
      });
  };
};
