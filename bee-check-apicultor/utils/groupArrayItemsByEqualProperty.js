/** Agrupar itens de um array, composto por objetos, em um novo objeto.
 * Os itens são agrupados de acordo com uma propriedade específica, passada via parâmetro.
 * Note que a propriedade pode ser aninhada, desde que siga a notação de pontos (".").
 * @param {array} completeArray O array com todos os items
 * @param {string} prop A propriedade ou cadeia de propriedades (ex.: "prop_escolhida" ou "foo.bar.id")
 */
function groupArrayItemsByEqualProperty(completeArray, prop) {
  let groupedObject = {};
  
  completeArray.forEach(item => {
    const propKey = resolve(item, prop);

    if (!groupedObject.hasOwnProperty(propKey)){
      groupedObject[propKey] = [];
    }

    groupedObject[propKey].push(item);
  });

  return groupedObject;
}

function resolve(obj, path) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null
  }, obj || self)
}

export default groupArrayItemsByEqualProperty;