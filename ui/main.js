console.log('Loaded!');

var mainTxt = document.getElementById('main-txt');
mainTxt.innerHTML = 'Hi! Modified...';

var img = document.getElementById('madi');

var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
    setInterval(moveRight, 50);
};

var counter = 0;

var button = document.getElementById('clickme');
button.onclick = function(){
    counter = counter + 1;
    var span = document.getElementById('counter-txt');
    span.innerHTML = counter.toString();
};