window.addEventListener('load', start);
function start(){
  inputRange();
}

function inputRange(){
  var divcl = document.querySelector('.viwerCl');
  var boxtext = document.querySelector('.container');
  var title = document.querySelector('h1');
  var by = document.querySelector('a');
  function rangeValue(){
    function submitColor(){
      divcl.style.backgroundColor = rgb
      boxtext.style.boxShadow = "0px 0px 17px 0px " + rgb
      title.style.color = rgb
      by.style.color = rgb
    }
    inputText1.value = red.value;
    inputText2.value = green.value;
    inputText3.value = blue.value;
    let rgb = "rgb(" + red.value +","+ green.value +","+ blue.value+")"
    submitColor();
  }
  
  var red = document.getElementById('selectColor1');
  var green = document.getElementById('selectColor2');
  var blue = document.getElementById('selectColor3');

  var inputText1 = document.getElementById('showValue1');
  var inputText2 = document.getElementById('showValue2');
  var inputText3 = document.getElementById('showValue3');
  
  red.addEventListener('input', rangeValue);
  green.addEventListener('input', rangeValue);
  blue.addEventListener('input', rangeValue);

}