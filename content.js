

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
var taleoflag = false;

window.addEventListener('load', function() {
  console.log(document.readyState);
  isWorkdayload = false;
  var currenturl = window.location.toString();
  if (existsquery("input[id='first_name']")) {
    console.log("success2");
    greenhouse();
  }
  if (window.location.toString().includes("myworkdayjobs")) {
    console.log("workday detected");
    setTimeout(function() {workday()}, 15000);
  }
  if (window.location.toString().includes("taleo") && taleoflag == false) {
    console.log("taleo detected");
    setTimeout(function() {taleo()}, 8000);
  }
  if (currenturl.includes('lever.co') && currenturl.includes('/apply')) {
    console.log("lever detected")
    setTimeout(function() {lever()}, 5000);
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
