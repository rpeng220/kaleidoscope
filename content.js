

// function setV() {
//     var email = document.querySelector("input[data-automation-id=email]");
    
//     email.value = "abc@gmail.com";
    
//     var event = new Event('input', {
//     bubbles: true,
//     cancelable: true,
// });

// email.dispatchEvent(event);

// }

// window.addEventListener('load', function() {  
    
//     setTimeout(function(){ 
//        console.log("AA");
//        setV();
// }, 3000);
// });


// document.addEventListener('visibilitychange', function(){
//     console.log("WW");
//     setV();
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'TabUpdated') {
      console.log(document.location.href);
      console.log("success1");
      if (existsquery("input[id='first_name']")) {
          console.log("success2");
          greenhouse();
      } else if (existsquery("input[data-automation-id=email]")) {
          console.log("success3");
          initWorkday();
      }
    }
  })