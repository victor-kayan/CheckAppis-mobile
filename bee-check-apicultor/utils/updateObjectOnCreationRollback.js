/** Função padrão de rollback para criação de um novo item no redux. 
 * 
 * Será adicionado a propriedade "permanentlyFailed" no item que falhou.
 * Todo o objeto que contém os arrays, agrupados por apiários, será atualizado.
 * Note que o novo item que falhou precisará ter a propriedade "uuid". 
 * @param {string} itemUuid UUID do item que falhou
 * @param {string} apiaryId Id do apiário o qual o item pertence 
 * @param {array} completeObject O objeto com todos os itens, organizados por apiários
 */
function updateObjectOnCreationRollback(itemUuid = '', apiaryId = -1, completeObject = {}) {
  const updatedItemsArray = completeObject[apiaryId].map(item => {
    if(item.uuid === itemUuid) {
      return Object.assign({}, item, { permanentlyFailed: true })
    }
    return item;
  });

  const updatedItemsListFromCurrentApiary = {
    [apiaryId]: updatedItemsArray
  };

  const updatedCompleteObject = Object.assign(
    {}, completeObject, updatedItemsListFromCurrentApiary
  );

  return updatedCompleteObject;
}

export default updateObjectOnCreationRollback;