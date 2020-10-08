import { Alert } from 'react-native';

import {
  INTERVENCAO_LOADING,
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_CONCLUIR_SUCCESS,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
  INTERVENCAO_COLMEIA_CONCLUIR_ERROR,
  UPDATE_COUNT_INTERVENCOES_BY_APICULTOR,
  UPDATE_ALL_INTERVENCOES_APIARIOS,
  UPDATE_ALL_INTERVENCOES_COLMEIAS
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
    Api.instance
      .get(
        URLS.formattedURL(URLS.CONCLUIR_INTERVENCAO_APIARIO_URL, {
          intervencao_id: intervencao.id
        })
      )
      .then(response => {
        dispatch(fecthIntervencoesByApicultor());
        dispatch({
          type: INTERVENCAO_CONCLUIR_SUCCESS,
          payload: {}
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
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

export const fecthIntervencoesColmeiasByApiario = apiaryId => {
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
          apiario_id: apiaryId
        })
      )
      .then(response => {
        dispatch({
          type: INTERVENCAO_GET_ALL_BY_APIARIO,
          payload: {
            intervencoesByApiario: response.data.intervencoes,
            apiaryId
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
    Api.instance
      .get(
        URLS.formattedURL(URLS.CONCLUIR_INTERVENCAO_COLMEIA_URL, {
          intervencao_id: intervencao.id
        })
      )
      .then(response => {
        dispatch(
          fecthIntervencoesColmeiasByApiario(intervencao.colmeia.apiario_id)
        );
        dispatch({
          type: INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
          payload: {}
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
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

export const updateAllIntervencoesByApicultor = (
  intervencoesNosApiarios, 
  intervencoesNasColmeias, 
  countIntervencoes
) => {
  return dispatch => {
    dispatch({
      type: UPDATE_COUNT_INTERVENCOES_BY_APICULTOR,
      payload: { countIntervencoes }
    });
    
    dispatch({
      type: UPDATE_ALL_INTERVENCOES_APIARIOS,
      payload: { intervencoesNosApiarios }
    });
     
    dispatch({
      type: UPDATE_ALL_INTERVENCOES_COLMEIAS,
      payload: { intervencoesNasColmeias }
    });
  
  }
}