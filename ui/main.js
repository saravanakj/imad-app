console.log('Loaded!');

var mainTxt = document.getElementById('main-txt');
mainTxt.innerHTML = 'Hi! Modified...';

var img = document.getElementById('madi');

img.onclick = function(){
    img.style.marginLeft = '100px';
};