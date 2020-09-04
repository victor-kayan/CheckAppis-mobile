import {
  INTERVENCAO_LOADING,
  INTERVENCAO_GET_ALL_BY_APICULTOR,
  INTERVENCAO_CONCLUIR_SUCCESS,
  INTERVENCAO_GET_ALL_BY_APIARIO,
  INTERVENCAO_COLMEIA_CONCLUIR_SUCCESS,
  INTERVENCAO_COLMEIA_CONCLUIR_ERROR,
  GET_COUNT_INTERVENCOES_BY_APICULTOR
} from "./actionsType";
import { URLS } from "../../../../assets";
import { Toast } from "native-base";
import { Api } from "../../../../services";
import {Alert} from "react-native";

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
    Alert.alert(
      'Concluir Intervenção',
          'Tem certeza que deseja concluir esta intervenção?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              onPress: () => {
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
                    Alert.alert(
                      'Intervenção Concluída',
                      'Intervenção concluída com sucesso.',
                      [
                        {
                          text: 'Cancelar',
                          style: 'cancel',
                        },
                        {
                          text: 'OK', 
                          style: 'cancel'
                        },
                      ],
                      {cancelable: false},
                    );
                    dispatch(fecthIntervencoesByApicultor());
                    dispatch({
                      type: INTERVENCAO_CONCLUIR_SUCCESS,
                      payload: {}
                    });
                  })
                  .catch(error => {
                    Alert.alert(
                      'Erro',
                      error.response && error.response.data.message,
                      [
                        {
                          text: 'Cancelar',
                          style: 'cancel',
                        },
                        {
                          text: 'OK', 
                          style: 'cancel'
                        },
                      ],
                      {cancelable: false},
                    );
                    dispatch({
                      type: INTERVENCAO_CONCLUIR_SUCCESS,
                      payload: {}
                    });
                    throw error;
                  });
              }
            },
          ],
          {cancelable: false},
    )
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
    Alert.alert(
      'Concluir Intervenção',
          'Tem certeza que deseja concluir esta intervenção?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              onPress: () => {
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
              }
            },
          ],
          {cancelable: false},)
  };
};

export const getCountIntervencoesByApicultor = () => {
  return dispatch => {
    dispatch({
      type: INTERVENCAO_LOADING,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(URLS.GET_COUNT_INTERVENCOES_URL)
      .then(response => {
        dispatch({
          type: GET_COUNT_INTERVENCOES_BY_APICULTOR,
          payload: {
            coutIntervencoes: response.data.count_intervencoes
          }
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "warning"
        });
        dispatch({
          type: INTERVENCAO_LOADING,
          payload: {
            loading: false
          }
        });
      });
  };
};
