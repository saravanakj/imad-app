console.log('Loaded!');

var mainTxt = document.getElementById('main-txt');
mainTxt.innerHTML = 'Hi! Modified...';

var img = document.getElementById('madi');

var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
    setInterval(moveRight, 100);
};