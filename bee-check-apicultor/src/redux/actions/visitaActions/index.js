import {
  GET_VISITAS_BY_APIARIO_URL,
  VISITA_LOADING,
  VISITA_APIARIO_DELETE_SUCCESS,
  INITIATE_CREATE_VISITA,
  CREATE_VISITA_COMMIT,
  CREATE_VISITA_ROLLBACK
} from "./actionsTypes";
import { URLS } from "../../../../assets";
import { Api } from "../../../../services";
import { Toast } from "native-base";

export const getVisitasByApiario = ({ id }) => {
  return dispatch => {
    dispatch({
      type: VISITA_LOADING,
      payload: {
        visitaIsLoading: true
      }
    });
    Api.instance
      .get(URLS.formattedURL(URLS.GET_VISITAS_BY_APIARIO_URL, { apiario_id: id }))
      .then(function(response) {
        dispatch({
          type: GET_VISITAS_BY_APIARIO_URL,
          payload: {
            visitas: response.data.visitas,
            visitaIsLoading: false,
            apiarioId: id
          }
        });
      })
      .catch(function(error) {
        Toast.show({
          text: error.response && error.response.data.message,
          buttonText: "",
          type: "danger"
        });
        dispatch({
          type: VISITA_LOADING,
          payload: {
            visitaIsLoading: false,
            storeError: error,
            storeMessages: error.response && error.response.data.message
          }
        });
      });
  };
};

export const deleteVisita = ({ visita_id, apiario_id }) => { // TODO: Tornar função de deletar visita offline-first
  return dispatch => {
    dispatch({
      type: VISITA_LOADING,
      payload: {
        visitaIsLoading: true
      }
    });
    Api.instance
      .delete(
        URLS.formattedURL(URLS.DELETE_VISITA_URL, { visita_id: visita_id })
      )
      .then(response => {
        dispatch(getVisitasByApiario({ apiario_id }));
        Toast.show({
          text: "Visita deletada com sucesso",
          buttonText: "",
          type: "success"
        });
        dispatch({
          type: VISITA_APIARIO_DELETE_SUCCESS,
          payload: {
            visitaIsLoading: false,
            storeMessages: response.data.message
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
          type: VISITA_LOADING,
          payload: {
            visitaIsLoading: false,
            storeError: error,
            storeMessages: error.response && error.response.data.message
          }
        });
      });
  };
};

// Redux offline test action...
const bearerToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlNDljZjY3NjJlZjJiYmIzNjEyNWQyODY3ZGUyMGQxMjliZmY3ZDJlMmQyYjlhZTkwMmE5ZThjNmNmYTMzZDA2MTVjNDJlOTMzMWNjMDRkIn0.eyJhdWQiOiIzIiwianRpIjoiZWU0OWNmNjc2MmVmMmJiYjM2MTI1ZDI4NjdkZTIwZDEyOWJmZjdkMmUyZDJiOWFlOTAyYTllOGM2Y2ZhMzNkMDYxNWM0MmU5MzMxY2MwNGQiLCJpYXQiOjE1ODQxNDE2MTcsIm5iZiI6MTU4NDE0MTYxNywiZXhwIjoxNjE1Njc3NjE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.02UfcwZ9jfKMlfe2htj5vhB7DdZD1CwMoTfxLvxuKCckXvPBDf1OPAR26gmLB46yUJpni_rKlHGKwOtH-LFdQ9rLeRPXtzDS_vwZAjktpRaZUa_CnHZcpT_gEhtFV67Gr7M6pvIxtkVSSd-TusQahBU0L3hhi_ltxWQ4LqOZkz62LGHeN4TKmfJ-TENoKZClsAQmUA-ryV2Ib5bM83wCCnu_fHXwZ_HFqAuPg691LgiH-Ydm5sY5gYtygXAzpi22IxqH-COPJTVea2fn6xwn_iTq8RX5rueP8x0zATIUbsZV2LoS0UKU6TZh69c6iC6rxYw0_E0Yp1mlBosr5mii5Kr3zRtAM8O_SrrK0iBVIgSfKy5mdmiQPmDdxDYVH1dmDeXTrGUkQ77hGVV6lwvd2zzJCPmC9OauxD7Ymxd0TVdpx1w_Dw2wshvH8jwO2-4gl1EsGt6EbZY9tBdTKI6NNACBf5DVWvN15vySezT0ycgk7ea7P5xur9ULxfOlqnB_jgnA87deUBJUF-zLUMpzqf7JYj7Npyw8Gx9eYx4tOcGN1moFQ9V04yND_JskeCgeiKm87uHOzXm4Y9574Q_dETyde6jOEEgkDhon_hKroCZLm_hdKq378WnkQiiAPL9Quz9EEPv0X0-zHXuP_U2G0kRF9bpnNxJ8spwtWl7n8mQ';
const formattedBaseURL = URLS.BASE_URL.slice(0, URLS.BASE_URL.lastIndexOf('/'));

export const createVisita = data => {
  return dispatch => {
    dispatch({
      type: INITIATE_CREATE_VISITA,
      payload: {
        newVisitaData: data,
        apiarioId: data.apiario_id
      },
      meta: {
        offline: {
          // TODO: Realizar requisições com axios e configurar por padrão os headers
          effect: {
            url: `${formattedBaseURL}${URLS.CREATE_VISITA_URL}`,
            method: 'POST', 
            json: data,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': bearerToken
            }
          },
          commit: { 
            type: CREATE_VISITA_COMMIT,
            meta: null
          },
          rollback: {
            // TODO: Verificar se o rollback está sendo disparado quando há conexão mas o servidor está fora do ar
            type: CREATE_VISITA_ROLLBACK,
            meta: { 
              visitUuid: data.uuid,
              apiarioId: data.apiario_id
            }
          },
        }
      }
    });
  };
};