

// function setV() {
//     var email = document.querySelector("input[data-automation-id=email]");
    
//     email.value = "abc@gmail.com";
    
//     var event = new Event('input', {
//     bubbles: true,
//     cancelable: true,
// });

// email.dispatchEvent(event);

// }

var isWorkdayload = false;

window.addEventListener('load', function() {
    console.log(document.readyState);
    isWorkdayload = false;
    if (existsquery("input[id='first_name']")) {
      console.log("success2");
      greenhouse();
  }
    if (window.location.toString().includes("myworkdayjobs")) {
      console.log("workday detected");
      setTimeout(function () {workday()}, 7000);
  }
});


// document.addEventListener('visibilitychange', function(){
//     console.log("WW");
//     setV();
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'TabUpdated') {
      console.log(document.location.href);
    }
  })
