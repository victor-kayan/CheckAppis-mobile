import {
  INTERVENCAO_COLMEIA_LOADING,
  INTERVENCAO_COLMEIA_GET_ALL_BY_INTERVENCAO,
  INTERVENCAO_COLMEIA_CONCLUIR
} from "./actionsType";
import { uris } from "../../../../assets";
import { Api } from "../../../../services";

export const fecthIntervencoesColmeiasByIntervencao = ({ intervencao_id }) => {
  console.log("GET INTERVENCOES DAS COLMEIA DA INERVENCAO" + intervencao_id);
  return dispatch => {
    dispatch({
      type: INTERVENCAO_COLMEIA_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(uris.GET_INTERVENCAO_COLMEIA_BY_INTERVENCAO_APIARIO + intervencao_id)
      .then(response => {
        console.log(response);
        dispatch({
          type: INTERVENCAO_COLMEIA_GET_ALL_BY_INTERVENCAO,
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
          type: INTERVENCAO_COLMEIA_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const concluirIntervencaoColmeia = ({
  intervencao_colmeia_id,
  intervencao_id
}) => {
  console.log("CONCLUIR INERVENCAO DA COLMEIA " + intervencao_colmeia_id);
  return dispatch => {
    dispatch({
      type: INTERVENCAO_COLMEIA_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(uris.GET_INTERVENCAO_COLMEIA_CONCLUIR + intervencao_colmeia_id)
      .then(response => {
        console.log(response);
        Toast.show({
          text: "Intervenção concluida",
          buttonText: "",
          type: "success"
        });
        dispatch(fecthIntervencoesColmeiasByIntervencao({ intervencao_id }));
        dispatch({
          type: INTERVENCAO_COLMEIA_CONCLUIR,
          payload: {
            loading: false
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
          type: INTERVENCAO_COLMEIA_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};
