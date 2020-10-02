/** Função padrão para inicialização da criação de um item no redux. 
 * 
 * Adiciona o novo objeto criado a lista, ordenados por apiário. 
 * @param {string} newItem Novo item cadastrado
 * @param {string} apiaryId Id do apiário o qual o novo item pertence 
 * @param {array} completeObject O objeto com todos os itens, organizados por apiários
 */
function updateObjectOnInitiateItemCreation(newItem = {}, apiaryId = -1, completeObject = {}) {
  const itemsListWithNewOne = completeObject[apiaryId] 
    ? {
        [apiaryId]: [ 
          newItem, ...completeObject[apiaryId]
        ]
      }
    : {
        [apiaryId]: [ newItem ]
      };
  
  const updatedCompleteObject = Object.assign(
    {}, completeObject, itemsListWithNewOne
  );

  return updatedCompleteObject;
}

export default updateObjectOnInitiateItemCreation;