import { Api } from "../../../../services";
import { URLS } from "../../../../assets";
import {
  DELETE_COLMEIA,
  CREATE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA,
  UPDATE_COUNT_COLMEIAS_BY_APICULTOR,
  UPDATE_ALL_COLMEIAS,
} from "./actionsType";
import { Toast } from "native-base";
import { Alert } from "react-native";

export const createColemia = ({ descricao, nome, foto, apiario_id }) => {
  return dispatch => {
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });

    Api.instance
      .post(URLS.CREATE_COLMEIA_URL, {
        nome,
        descricao,
        apiario_id,
        foto
      })
      .then(response => {
        Alert.alert(
          'Colmeia Criada',
          'Colmeia cadastrada com sucesso.',
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
        dispatch({
          type: CREATE_COLMEIA,
          payload: {
            colmeia: response.data.colmeia,
            apiarioId: apiario_id
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
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });
    Api.instance
      .delete(URLS.formattedURL(URLS.DELETE_COLMEIA_URL, { colmeia_id: id }))
      .then(response => {
        Alert.alert(
          'Colmeia Excluída',
          'Colmeia excluída com sucesso.',
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