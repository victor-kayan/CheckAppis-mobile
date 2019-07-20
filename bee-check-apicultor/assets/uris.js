const uris = {
  // BASE_URL: "https://bee-check-api.herokuapp.com/api/",
  BASE_URL: "http://192.168.200.232/api/",

  LOGIN: "auth/login/apicultor",
  LOGOUT: "auth/logout",

  GET_APIARIO_BY_USER: "apiarios/user",

  DELETE_COLMEIA_BY_ID: "colmeia/",
  POST_COLMEIA: "colmeia",
  GET_COLMEIAS_BY_APIARIO: "colmeias/apiario/",
  PUT_COLMEIA: "colmeia/",

  GET_VISITAS_BY_APIARIO: "visita/apiario/apiario/",
  POST_VISITA_APIARIO: "visita/apiario",
  DELETE_VISITA_APIARIO: "visita/apiario/",

  POST_VISITA_COLMEIA: "visita/colmeia",
  GET_VISITAS_COLMEIA_BY_VISITA_APIARIO: "visitas/colmeias/visita/apiario/",

  GET_INTERVENCOES_BY_APICULTOR: 'intervencoes/user',
  GET_INTERVENCAO_APIARIO_CONCLUIR: 'intervencao/apiario/concluir/',

  GET_INTERVENCAO_COLMEIA_BY_INTERVENCAO_APIARIO: 'intervencao/colmeia/intervencao/',
  GET_INTERVENCAO_COLMEIA_CONCLUIR: 'intervencao/colmeia/concluir/'
};

export default uris;
