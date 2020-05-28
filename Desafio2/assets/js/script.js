//Mostrar a quantidade de países no quadro da esquerda
//Adicionar os favoritos mover para direita e ao remover deve retornar para esquerda
//A lista de paises devem se inseridas em ordem alfabetica
//Pesquisar por int
window.addEventListener("load", () => {
  requesition();
})
async function requesition() {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const json = await res.json();

  transformArray(json)
}

function transformArray(json) {
  const mappedCountry = json.map(country => {
    return{
      name: country.translations.br,
      flag: country.flag,
      population: country.population,
      id: country.numericCode
    }
  })
  console.log(mappedCountry)
  constructionPage(mappedCountry);
}

function constructionPage(countrie) {
  const {name, flag, id, population} = countrie;
  const divSearch = document.querySelector("#search");
  
  const populationAmt = document.querySelector("#populationAmount");
  const countryAmt = document.querySelector("#countryAmount");
  let populationD = null;
  let countryAmount = null;
  

  for(var i = 0; i < countrie.length; i++){
    countryAmount = countrie.length;
    let {name, flag, id, population} = countrie[i];
    populationD = population + populationD;
    const div = document.createElement("div");
    divSearch.appendChild(div);
    div.classList.add("country")

    countryAmount = countrie.length;

    div.innerHTML = `
    <div class="addCountriy"></div>
    <div class="flag" style="background: url(${flag});background-position: center;
    background-size: cover;"></div>
      <h3>${name}</h3>
      <p>(${population})</p>
    
    
    `
    

    
  }
  countryAmt.textContent = countryAmount;
  populationAmt.textContent = populationD;
}