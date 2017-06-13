console.log('Loaded!');

//change the main text
 element= document.getElementById('main text');

element.innerHTML='new webpage';

//move the image
var img=document.getElementById('madi');

var moveLeft=0;
function moveRight(){
moveLeft=moveLeft+10;
img.style.moveLeft = moveLeft+'px';
}
img.onclick = function(){
var interval = setInterval(moveRight,'100');    
};
