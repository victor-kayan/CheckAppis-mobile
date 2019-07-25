import {
  INTERVENCAO_LOADING,
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_CONCLUIR_SUCCESS,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
  INTERVENCAO_COLMEIA_CONCLUIR_ERROR
} from "./actionsType";
import { URLS } from "../../../../assets";
import { Toast } from "native-base";
import { Api } from "../../../../services";

export const fecthIntervencoesByApicultor = () => {
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(URLS.GET_INTERVENCOES_BY_APICULTOR_URL)
      .then(response => {
        dispatch({
          type: INTERVENCAO_GET_ALL_BY_APICULTOR,
          payload: {
            loading: false,
            intervencoes: response.data.intervencoes
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
          type: INTERVENCAO_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const concluirIntervencao = intervencao => {
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(
        URLS.formattedURL(URLS.CONCLUIR_INTERVENCAO_APIARIO_URL, {
          intervencao_id: intervencao.id
        })
      )
      .then(response => {
        Toast.show({
          text: response.data.message,
          buttonText: "",
          type: "success"
        });
        dispatch(fecthIntervencoesByApicultor());
        dispatch({
          type: INTERVENCAO_CONCLUIR_SUCCESS,
          payload: {}
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        dispatch({
          type: INTERVENCAO_CONCLUIR_SUCCESS,
          payload: {}
        });
        throw error;
      });
  };
};

export const fecthIntervencoesColmeiasByApiario = ({ apiario_id }) => {
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(
        URLS.formattedURL(URLS.GET_INTERVENCOES_COLMEIAS_BY_APIARIO_URL, {
          apiario_id: apiario_id
        })
      )
      .then(response => {
        dispatch({
          type: INTERVENCAO_GET_ALL_BY_APIARIO,
          payload: {
            intervencoesByApiario: response.data.intervencoes
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
          type: INTERVENCAO_LOADING,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const concluirIntervencaoColmeia = intervencao => {
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(
        URLS.formattedURL(URLS.CONCLUIR_INTERVENCAO_COLMEIA_URL, {
          intervencao_id: intervencao.id
        })
      )
      .then(response => {
        Toast.show({
          text: response.data.message,
          buttonText: "",
          type: "success"
        });
        dispatch(
          fecthIntervencoesColmeiasByApiario({
            apiario_id: intervencao.colmeia.apiario_id
          })
        );
        dispatch({
          type: INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
          payload: {}
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        dispatch({
          type: INTERVENCAO_COLMEIA_CONCLUIR_ERROR,
          payload: {}
        });
        throw error;
      });
  };
};
