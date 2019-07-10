import { GET_ALL_APIARIOS_BY_USER, LOADING_APIARIO } from "./actionsType";
import { Api } from "../../../../services";
import { uris } from "../../../../assets";
import { Toast } from "native-base";

export const fetchApiariosByUser = () => {
  console.log("GET ALL APIARIOS");

  return dispatch => {
    dispatch({
      type: LOADING_APIARIO,
      payload: {
        loading: true
      }
    });
    Api.instance
      .get(uris.GET_APIARIO_BY_USER)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_ALL_APIARIOS_BY_USER,
          payload: {
            apiarios: response.data.apiarios,
            loading: false
          }
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          Toast.show({
            text: error.response.data.message,
            buttonText: "",
            type: "warning"
          });
          // if(error.response.status === 401)
          // this.props.navigation.navigate('Login');
        }
        dispatch({
          type: LOADING_APIARIO,
          payload: {
            loading: false
          }
        });
        throw error;
      });
  };
};

export const createVisita = data => {

}
