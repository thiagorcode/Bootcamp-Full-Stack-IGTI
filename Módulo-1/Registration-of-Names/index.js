window.addEventListener('load', () => {

  inputName = document.querySelector('#inputName')
  preventSubmit();
  activateInput();
  render();
});

var globalNames = [];
var inputName = null;
var isEditing = false;
var currentIndex = null;
//

//
function preventSubmit(){
  function preventforSubmit(event){
    event.preventDefault();// Passa o parametro que a page não deve ser recarregada passando um paranmetro
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', preventforSubmit)
}
//
function activateInput(){
  function insertName(newName){
   // globalNames.push(newName);    Usando Spread
   globalNames= [...globalNames, newName];
  }

  function updateName(newName){
    globalNames[currentIndex] = newName;
  }
  function handleTyping(event){
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if(!hasText){
      inputName = document.getElementById('inputName');
      inputName.value = ""
      return;
    }
    if(event.key === "Enter"){

      if(isEditing){
        updateName(event.target.value)
      }else{
        insertName(event.target.value);
      }
      render();
      isEditing = false;
    }
    
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}
//
function render(){
  function createDeleteButton(index){
    function deleteName(){
      //globalNames.splice(index, 1) Utilizando o filter
      // globalNames = globalNames.filter((name, i) => {//O i é indice como se for o i no for o que controla quantas vezes o for deve executar com incrementação
      //   if(i === index) {
      //     return false; 
      //   }
      //   return true;
      // })
      
      globalNames = globalNames.filter((_, i) => i !== index);

      render();
    }
    var button = document.createElement("button");
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName)
    return button;
  }
  function renameSpan(name, index){
    function editItem(){
      inputName.value = name
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span')
    span.textContent = currentName;
    span.classList.add('clickable')
    span.addEventListener('click', editItem)

    return span;
  }

  var divNames = document.getElementById('names');// Pega o Id names
  divNames.innerHTML = '';
  var ul = document.createElement('ul');// Para criar elementos é necessário usar o document.createElement
  
  for(var i = 0; i < globalNames.length;i++){
    var currentName = globalNames[i]
    var li = document.createElement('li');// Para criar o elemento li
    var span = renameSpan(currentName, i)
    var button = createDeleteButton(i);
    
    li.appendChild(button);
    li.appendChild(span);
    /*li.textContent = currentName*/// O testo do vetor será passado conforme a posição de [i] 
    ul.appendChild(li);// appendChild(li) determina quem são os elementos filhos a parti de outra elemento pai. No caso informa que a váriável li é filha da variável ul.
  }
  divNames.appendChild(ul);// O mesmo acontece aqui *
  inputName = document.getElementById('inputName');
  inputName.value = ""
  inputName.focus();
}