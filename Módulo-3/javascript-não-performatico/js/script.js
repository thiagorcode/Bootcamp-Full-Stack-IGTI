/**
 * Array para guardar as datas
 * inseridas
 */
const arrayDateTime = [];

/**
 * Definido evento para o fim do carregamento
 * total da página */

window.addEventListener('load', start);

/**
 * Função executada após o carregamento
 * total da página
 */
function start() {
  /**
   * Mapeando botão
   */
  const button = document.querySelector('#button');

  /**
   * Definindo evento para o clique do botão
   */
  button.addEventListener('click', buttonClick);
}

/**
 * Função para responder ao clique do botão
 * montando toda a estrutura de <ul> e <li>'s
 * novamente
 */
function buttonClick() {
  /**
   * Obtendo timestamp atual
   * e guardando no vetor
   */
  const timestamp = getFormattedTimeStamp();
  arrayDateTime.push(timestamp);

  /**
   * Mapeando <ul> do HTML
   */
  const ul = document.querySelector('#clicks');

  /**
   * Limpando ul
   */
  ul.innerHTML = '';

  /**
   * Montando <li>'s
   */
  const lis = arrayDateTime
    .map((timestamp) => {
      return `<li>${timestamp}</li>`;
    })
    .join('');

  /**
   * Preenchendo conteúdo de <ul>
   */
  ul.innerHTML = lis;

  /**
   * Informando a quantidade de cliques em document.title
   */
  document.title = arrayDateTime.length.toString();
}
