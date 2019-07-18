import { Api } from "../../../../services";
import { uris } from "../../../../assets";
import {
  DELETE_COLMEIA,
  CREATE_COLMEIA,
  LOADING_COLMEIA,
  GET_COLMEIA_BY_APIARIO,
  EDIT_COLMEIA
} from "./actionsType";
import { Toast } from "native-base";

export const createColemia = ({ descricao, nome, foto, apiario_id }) => {
  console.log("COLMEIA CREATE");
  return dispatch => {
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });

    Api.instance
      .post(uris.POST_COLMEIA, {
        nome,
        descricao,
        apiario_id,
        foto
      })
      .then(response => {
        console.log(response);
        Toast.show({
          text: "Colmeia criada com sucesso.",
          buttonText: "",
          type: "success"
        });
        dispatch({
          type: CREATE_COLMEIA,
          payload: {
            loading: false,
            colmeia: response.data.colmeia
          }
        });
      })
      .catch(error => {
        // console.log(error);
        if (error.response) {
          console.log(error);
          Toast.show({
            text: error.response.data.message,
            buttonText: "",
            type: "danger"
          });
        }
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
  console.log("COLMEIA EDIT");
  return dispatch => {
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });

    Api.instance
      .put(uris.PUT_COLMEIA + id, {
        nome,
        descricao,
        apiario_id,
        foto
      })
      .then(response => {
        console.log(response);
        Toast.show({
          text: "Edição realizada com sucesso.",
          buttonText: "",
          type: "success"
        });
        dispatch(getColemiasByApiario({ id: apiario_id }));
        dispatch({
          type: EDIT_COLMEIA,
          payload: {
            loading: false
          }
        });
      })
      .catch(error => {
        // console.log(error);
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
          type: LOADING_COLMEIA,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const getColemiasByApiario = ({ id }) => {
  console.log("GET COLMEIAS" + id);
  return dispatch => {
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });

    Api.instance
      .get(uris.GET_COLMEIAS_BY_APIARIO + id)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_COLMEIA_BY_APIARIO,
          payload: {
            loading: false,
            colmeias: response.data.colmeias
          }
        });
      })
      .catch(error => {
        // console.log(error);
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
          type: LOADING_COLMEIA,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const deleteColmeiaById = ({ id, apiario_id }) => {
  console.log("COLMEIA");

  return dispatch => {
    dispatch({
      type: LOADING_COLMEIA,
      payload: {
        loading: true
      }
    });
    Api.instance
      .delete(uris.DELETE_COLMEIA_BY_ID + id)
      .then(response => {
        console.log(response);
        Toast.show({
          text: "Colmeia deletada com sucesso",
          buttonText: "",
          type: "success"
        });
        dispatch({
          type: DELETE_COLMEIA,
          payload: {
            loading: false
          }
        });
        dispatch(getColemiasByApiario({ id: apiario_id }));
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          Toast.show({
            text: error.response.data.message,
            buttonText: "",
            type: "danger"
          });
        }
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
