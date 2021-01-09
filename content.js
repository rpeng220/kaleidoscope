
function setV() {
    var email = document.querySelector("input[data-automation-id=email]");
    
    email.value = "abc@gmail.com";
    
    var event = new Event('input', {
    bubbles: true,
    cancelable: true,
});

email.dispatchEvent(event);

}

window.addEventListener('load', function() {  
    
    setTimeout(function(){ 
       console.log("AA");
       setV();
}, 3000);
});


document.addEventListener('visibilitychange', function(){
    console.log("WW");
    setV();
});