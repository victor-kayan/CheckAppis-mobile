import { Api } from "../../../../services";
import { URLS } from "../../../../assets";
import {
  DELETE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA,
  UPDATE_COUNT_COLMEIAS_BY_APICULTOR,
  UPDATE_ALL_COLMEIAS,
  INITIATE_CREATE_COLMEIA,
  CREATE_COLMEIA_COMMIT,
  CREATE_COLMEIA_ROLLBACK
} from "./actionsType";
import { Toast } from "native-base";
import { Alert } from "react-native";

export const createColmeia = data => {
  return dispatch => {
    dispatch({
      type: INITIATE_CREATE_COLMEIA,
      payload: {
        newHiveData: data,
        apiaryId: data.apiario_id
      },
      meta: {
        offline: {
          effect: {
            method: 'POST',
            url: URLS.CREATE_COLMEIA_URL,
            data
          },
          commit: { 
            type: CREATE_COLMEIA_COMMIT,
          },
          rollback: {
            type: CREATE_COLMEIA_ROLLBACK,
            meta: { 
              hiveUuid: data.uuid,
              apiaryId: data.apiario_id
            }
          },
        }
      }
    });
  };
};

export const editColmeia = ({ id, descricao, nome, foto, apiario_id }) => {
  return dispatch => {
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });

    Api.instance
      .put(URLS.formattedURL(URLS.UPDATE_COLMEIA_URL, { colmeia_id: id }), {
        nome,
        descricao,
        apiario_id,
        foto
      })
      .then(response => {
        Alert.alert(
          'Edição Concluída',
          'Colmeia editada com sucesso.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK',
              style: 'ok',
            },
          ],
          {cancelable: false},
        );
        dispatch(getColmeiasByApiario(apiario_id));
        dispatch({
          type: EDIT_COLMEIA,
          payload: {
            loading: false
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
          type: LOADING_COLMEIA,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const getColmeiasByApiario = id => {
  return dispatch => {
    Api.instance
      .get(
        URLS.formattedURL(URLS.GET_COLMEIAS_BY_APIARIO_URL, { apiario_id: id })
      )
      .then(response => {
        dispatch({
          type: GET_COLMEIA_BY_APIARIO,
          payload: {
            colmeias: response.data.colmeias,
            apiarioId: id
          }
        });
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        throw error;
      });
  };
};

export const deleteColmeiaById = (id, apiario_id) => {
  return dispatch => {
    Api.instance
      .delete(URLS.formattedURL(URLS.DELETE_COLMEIA_URL, { colmeia_id: id }))
      .then(response => {
        dispatch({
          type: DELETE_COLMEIA,
          payload: {
            loading: false
          }
        });
        dispatch(getColmeiasByApiario(apiario_id));
      })
      .catch(error => {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        dispatch({
          type: LOADING_COLMEIA,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const updateAllColmeiasByApicultor = (allColmeias, countColmeias) => {
  return dispatch => {
    dispatch({
      type: UPDATE_COUNT_COLMEIAS_BY_APICULTOR,
      payload: { countColmeias }
    });
    
    dispatch({
      type: UPDATE_ALL_COLMEIAS,
      payload: { allColmeias }
    });
  }
}