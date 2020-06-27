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
 * criando novas <li>'s
 */
function buttonClick() {
  /**
   * Mapeando <ul> do HTML
   */
  const ul = document.querySelector('#clicks');

  const timestamp = getFormattedTimeStamp();
  arrayDateTime.push(timestamp);

  /**
   * Criando <li> e adicionando o conteúdo
   * referente à data/hora do clique no
   * botão
   */
  const li = document.createElement('li');
  li.textContent = `O botão foi clicado em ${timestamp}`;

  ul.appendChild(li);
}
