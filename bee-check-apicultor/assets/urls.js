// BASE_URL: "https://bee-check-api.herokuapp.com/api/",
export const BASE_URL = "http://192.168.200.232/api";

export const LOGIN_URL = "/auth/login/apicultor";
export const LOGOUT_URL = "/auth/logout";

export const GET_APIARIOS_BY_USER_URL = "/apiarios/user";

export const DELETE_COLMEIA_URL = "/colmeia/{colmeia_id}";
export const CREATE_COLMEIA_URL = "/colmeia";
export const GET_COLMEIAS_BY_APIARIO_URL = "/apiario/{apiario_id}/colmeias";
export const UPDATE_COLMEIA_URL = "/colmeia/{colmeia_id}";

export const GET_VISITAS_BY_APIARIO_URL = "/apiario/{apiario_id}/visitas";
export const CREATE_VISITA_URL = "/visita";
export const DELETE_VISITA_URL = "/visita/{visita_id}";

export const GET_INTERVENCOES_BY_APICULTOR_URL = "/intervencoes/user";
export const CONCLUIR_INTERVENCAO_APIARIO_URL = "/intervencao/{intervencao_id}/concluir";

export const GET_INTERVENCOES_COLMEIAS_BY_APIARIO_URL = "/apiario/{apiario_id}/intervencoes/colmeias";
export const CONCLUIR_INTERVENCAO_COLMEIA_URL = "/intervencao/colmeia/{intervencao_id}/concluir";

export const formattedURL = (url, params = {}) => {
  if (url) {
    if (params) {
      let _formattedURI = url;

      for (var prop in params) {
        var key = prop;
        var value = params[prop];

        if (params.hasOwnProperty(key)) {
          _formattedURI = _formattedURI
            .split(`{${key && key}}`)
            .join(value && value);
        }
      }
      return _formattedURI;
    }
    return url;
  }
};
