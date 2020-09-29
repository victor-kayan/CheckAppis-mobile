import { Api } from '../../services';

const effect = (effect, _action) => {
  return Api.instance(effect); // O effect deve ser um objeto de configuração axios válido
}

const discard = (error, _action, _retries) => {
  const { request, response } = error;

  if (!request) { // Houve um erro ao criar a requisição
    throw error;
  }
  if (!response) { // Não houve resposta do servidor
    return false;
  }

  // Se o código HTTP retornado for 4xx, então hove um erro no cliente,
  // logo a requisição não deve ser feita (ou tentada) novamente
  return 400 <= response.status && response.status < 500;
};

export default {
  effect, discard
};