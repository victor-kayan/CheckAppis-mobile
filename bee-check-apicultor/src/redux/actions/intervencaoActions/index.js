import {
  INTERVENCAO_LOADING,
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INITIATE_CONCLUIR_INTERVENCAO_APIARIO,
  CONCLUIR_INTERVENCAO_APIARIO_COMMIT,
  CONCLUIR_INTERVENCAO_APIARIO_ROLLBACK,
  INITIATE_CONCLUIR_INTERVENCAO_COLMEIA,
  CONCLUIR_INTERVENCAO_COLMEIA_COMMIT,
  CONCLUIR_INTERVENCAO_COLMEIA_ROLLBACK,
  UPDATE_COUNT_INTERVENCOES_BY_APICULTOR,
  UPDATE_ALL_INTERVENCOES_APIARIOS,
  UPDATE_ALL_INTERVENCOES_COLMEIAS
} from "./actionsType";
import { URLS } from "../../../../assets";
import { Toast } from "native-base";
import { Api } from "../../../../services";

// TODO: Possibilitar a exclusão local de uma intervenção já concluída e sincronizada.

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
      type: INITIATE_CONCLUIR_INTERVENCAO_APIARIO,
      payload: {
        interventionData: intervencao
      },
      meta: {
        offline: {
          effect: {
            method: 'GET',
            url: URLS.formattedURL(URLS.CONCLUIR_INTERVENCAO_APIARIO_URL, {
                  intervencao_id: intervencao.id
                })
          },
          commit: { 
            type: CONCLUIR_INTERVENCAO_APIARIO_COMMIT,
            meta: {
              interventionId: intervencao.id
            }
          },
          rollback: {
            type: CONCLUIR_INTERVENCAO_APIARIO_ROLLBACK,
            meta: {
              interventionId: intervencao.id
            }
          }
        }
      }
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
    dispatch({
      type: INITIATE_CONCLUIR_INTERVENCAO_COLMEIA,
      payload: {
        interventionData: intervencao,
        apiaryId: intervencao.colmeia.apiario_id
      },
      meta: {
        offline: {
          effect: {
            method: 'GET',
            url: URLS.formattedURL(URLS.CONCLUIR_INTERVENCAO_COLMEIA_URL, {
                  intervencao_id: intervencao.id
                })
          },
          commit: { 
            type: CONCLUIR_INTERVENCAO_COLMEIA_COMMIT,
            meta: {
              interventionId: intervencao.id,
              apiaryId: intervencao.colmeia.apiario_id
            }
          },
          rollback: {
            type: CONCLUIR_INTERVENCAO_COLMEIA_ROLLBACK,
            meta: {
              interventionId: intervencao.id,
              apiaryId: intervencao.colmeia.apiario_id
            }
          }
        }
      }
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