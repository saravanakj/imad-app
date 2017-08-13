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

//var counter = 0;

var button = document.getElementById('clickme');
button.onclick = function(){
    //counter = counter + 1;
    //var span = document.getElementById('counter-txt');
    //span.innerHTML = counter.toString();
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('counter-txt');
                span.innerHTML = counter;
          }
      }  
    };
    
    request.open('GET', 'http://saravanakj.imad.hasura-app.io/counter', true);
    request.send(null);
};