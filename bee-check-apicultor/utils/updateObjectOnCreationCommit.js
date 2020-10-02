/** Função padrão de commit para criação de um novo item no redux. 
 * 
 * Atualiza o objeto salvo no estado com base no novo, recebido na resposta do servidor. 
 * Além disso, todo o objeto que contém os arrays, agrupados por apiários, será atualizado.
 * Note que o novo item cadastrado precisará ter a propriedade "uuid". 
 * @param {string} newItem Novo item cadastrado, objeto vindo da resposta do servidor
 * @param {string} apiaryId Id do apiário o qual o novo item pertence 
 * @param {array} completeObject O objeto com todos os itens, organizados por apiários
 */
function updateObjectOnCreationCommit(newItem = {}, apiaryId = -1, completeObject = {}) {
  const updatedArray = completeObject[apiaryId].map(item => {
    if(item.uuid === newItem.uuid) {
      return Object.assign({}, item, newItem);
    }
    return item;
  });

  const updatedArrayListFromCurrentApiary = {
    [apiaryId]: updatedArray
  };

  const updatedCompleteObject = Object.assign(
    {}, completeObject, updatedArrayListFromCurrentApiary
  );

  return updatedCompleteObject;
}

export default updateObjectOnCreationCommit;