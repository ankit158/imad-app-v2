//counter code

var button = document.getElementById("counter");



button.onclick = function(){

 //create a request object
 var request = new XMLHttpRequest();
  
 //capture the response
 request.onreadystatechange = function(){
    if(request.readystate === XMLHttpRequest.DONE){
    //take action
    if(request.status===200){
        var counter = request.responseText;
        var span = document.getElementById("count");
        span.innerHTML = counter.toString();
    }
    } 
 };
    //take no action.wait.
 };
 //make the request
 request.open('GET','http://ankit158.imad.hasura-app.io/counter',true);
 request.send(null);
