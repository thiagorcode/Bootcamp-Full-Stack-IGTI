
//Adicionar os favoritos mover para direita e ao remover deve retornar para esquerda
//A lista de paises devem se inseridas em ordem alfabetica
//Pesquisar por int
let allCountries = [];
let favoriteCountries = [];
let tabCountries = document.querySelector("#listCountry")
let tabFavorites = document.querySelector("#addCountry")

window.addEventListener("load", () => {
  requesition();//:14
  numberFormat = Intl.NumberFormat('pt-BR');
})

async function requesition() {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const json = await res.json();

  transformArray(json)
}
//

function transformArray(json) {
  allCountries = json.map(country => {
    const {translations, flag, population, numericCode} = country
    return{
      name: translations.br,
      flag,
      population,
      formattedPopulation: formatNumber(population),
      id: numericCode
    }
  })
  construtionPage()
  
  
}
//
function construtionPage() {
  CountryList();
  addCountryFavorites();
  Sumary();
  handleCountryButtons();
}
function CountryList() {
  const divSearch = document.querySelector("#listCountry"); // Caso de erro colocar global
  let listHTML = `<div>`;
  
  allCountries.forEach(country => {
    const {name, flag, id, formattedPopulation} = country;
    const divHTML =  `
    <div class="country">
      <div>
        <a id="${id}" class="addCountry btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}"/>
      </div>
      <div>
        <h3>${name}</h3>
        <p>(${formattedPopulation})</p>
      </div>
    </div>
      
    `
    listHTML += divHTML;
  })
  listHTML += "</div>";
  divSearch.innerHTML = listHTML
}
function addCountryFavorites() {
  const favoriteCountry = document.querySelector("#addCountry")
  let favoritesHTML = "<div>"

  favoriteCountries.forEach(country => {
    const {name, flag, id, formattedPopulation} = country;

    const divHTML =  `
    <div class="country">
      <div>
        <a id="${id}" class="addCountry btn">-</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}"/>
      </div>
      <div>
        <h3>${name}</h3>
        <p>(${formattedPopulation})</p>
      </div>
    </div>
      
    `
    favoritesHTML += divHTML;
  })

  favoritesHTML += "</div>"
  favoriteCountry.innerHTML = favoritesHTML;
}
function Sumary() {
  const countryAmount = document.querySelector("#countryAmount");
  const countCountries = document.querySelector("#favoriteCountries");

  const showTotalPopulation = document.querySelector("#populationAmount");
  const showFavoitePopulation = document.querySelector("#favorite-population");

  
  countryAmount.textContent = allCountries.length;
  countCountries.textContent = favoriteCountries.length

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0 )

  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0 )
  
  showTotalPopulation.textContent =  formatNumber(totalPopulation);
  showFavoitePopulation.textContent =  formatNumber(totalFavorites);
}

// Manipulação dos array
function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll(".btn"))
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll(".btn"))
  countryButtons.forEach(button => {
    button.addEventListener('click', () =>  addToFavorites(button.id));
  })

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () =>  removeFromFavorites(button.id));
  })
}
function addToFavorites(id) {
  const countryToAdd = allCountries.find(country => country.id === id);
  favoriteCountries = [...favoriteCountries, countryToAdd];// :6 Pega o que está dentro da variável favoriteCountries e espalha e adiciona um novo elemento.

  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name); 
  })

  allCountries = allCountries.filter(country => country.id !== id );
  construtionPage();// Chama a função para construir a página novamente.

}
function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(country => country.id === id);
  allCountries = [...allCountries, countryToRemove];// :6 Pega o que está dentro da variável favoriteCountries e espalha e adiciona um novo elemento.

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name); 
  })

  favoriteCountries = favoriteCountries.filter(country => country.id !== id );
  construtionPage();// Chama a função para construir a página novamente.

}
function formatNumber(number) {
  return numberFormat.format(number)
}