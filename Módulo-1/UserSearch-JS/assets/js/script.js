let globalUser = []

window.addEventListener('load', () => {
  request();
})

async function request() {
  const res = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
  globalUser = await res.json();

  globalUser = globalUser.results.map(person => {
    const { name, picture, gender } = person;

    return {
      name: name.first + " " + name.last,
      picture,
      age: person.dob.age,
      gender
    }
  })
  constructionPage();
}
function constructionPage() {
  const search = document.querySelector("#seekers");
  const buttonSearch = document.querySelector("#searchUsers");

  buttonSearch.addEventListener('click', validated);
  search.addEventListener('keyup', searchToUser);

}

function searchToUser(event) {
  if (event.key === "Enter"  && event.target.value !== "") {validated();}
  
}

function validated() {
  let dadoUser = null
  const search = document.querySelector("#seekers").value;
  
  dadoUser = globalUser.filter(person => {
    return person.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  })
  mountedPageSearch(dadoUser);
  mountedPageStatistic(dadoUser);
}
//

function mountedPageSearch(eventUser) {
  const results = document.querySelector("#results");
  const titleResults = document.querySelector("#title-results");

  let tableHTML = "<div>";

  eventUser.forEach(search => {
    const { name, age, picture, gender } = search;
    let divHTML = `
    <div class="container-dadoUser">
      <div>
        <img src="${picture.medium}" alt="${name}"/>
      </div>
      <div>
        <p>${name}, ${age} anos</p>
      </div>
    </div>
    `
    tableHTML += divHTML
  });
  titleResults.textContent = `Foram encontrado ${eventUser.length} usuário(s). `
  tableHTML += "</div>"
  results.innerHTML = tableHTML
}


function mountedPageStatistic(eventUser) {
  const pageFather = document.querySelector("#statistic");
  let medAge = 0;
  // 
  const genderMale = eventUser.filter(gender => {
    return gender.gender === "male"
  });
  const genderFemale = eventUser.filter(gender => {
    return gender.gender === "female"
  });
  // Sum&med
  const sumAge = eventUser.reduce((accurrent, current) =>{
    return accurrent + current.age;
  }, 0)

  medAge = sumAge / eventUser.length;

  //
  let divHTML = `
  <div>
    <h2>Estatísticas</h2>
    <div>
      <p>Sexo masculino: ${genderMale.length}</p>
    </div>
    <div>
      <p>Sexo feminino: ${genderFemale.length}</p>
    </div>
    <div>
      <p>Soma das Idades: ${sumAge}</p>
    </div>
    <div>
      <p>Média das Idades: ${medAge.toFixed(2)}</p>
    </div>
  </div>
  `
  pageFather.innerHTML = divHTML;

}