var isWorkdayload = false;
var taleoflag = false;


function createPopup(system) {
  let overlayDiv = document.createElement('DIV');
  overlayDiv.id = "kumquatOverlay";
  document.body.insertBefore(overlayDiv, document.body.firstChild);
  let kumquatTree = document.createElement('IMG');
  kumquatTree.id = "kumquatTree";
  kumquatTree.src = chrome.extension.getURL("kumquat_tree.png");
  let popupCTA = document.createElement('DIV');
  popupCTA.id = "popupText";
  popupCTA.innerHTML = "Kumquat Compatible!"
  let buttonText = document.createElement('BUTTON');
  buttonText.id = "kumquatButton";
  buttonText.innerHTML = 'Autofill Application'
  let popupClose = document.createElement('DIV');
  popupClose.id = "popupClose";
  popupClose.innerHTML = "Try Later"
  overlayDiv.appendChild(kumquatTree);
  overlayDiv.appendChild(popupCTA);
  overlayDiv.appendChild(buttonText);
  overlayDiv.appendChild(popupClose);
  popupClose.onclick = function() { overlayDiv.remove(); };
  buttonText.onclick = function() {
    overlayDiv.remove();
    chrome.storage.local.get('profile', function(result) {
      if (typeof result.profile == 'undefined') {
        alert("You must save your Kumquat profile before autofilling.")
      } else {
        PROFILE = JSON.parse(result.profile);
        switch(system) {
          case "workday":
          return workday();
          break;
        case "taleo":
          return taleo();
          break;
        case "greenhouse":
          return greenhouse();
          break;
        case "lever":
          return lever();
          break;
        }
      }
    }) 
  }
}

window.addEventListener('load', function() {
  isWorkdayload = false;
  var currenturl = window.location.toString();
  if (existsquery("input[id='first_name']")) {
    createPopup("greenhouse")
    // greenhouse();
  }
  if (window.location.toString().includes("myworkdayjobs")) {
    createPopup("workday");
    // setTimeout(function() {workday()}, 15000);
  }
  if (window.location.toString().includes("taleo") && taleoflag == false) {
    createPopup("taleo");
    // setTimeout(function() {taleo()}, 8000);
  }
  if (currenturl.includes('lever.co') && currenturl.includes('/apply')) {
    createPopup("lever");
    // setTimeout(function() {lever()}, 5000);
  }
});

// Autofill activated manually via popup
chrome.runtime.onMessage.addListener(function(request, sender) {
    isWorkdayload = false;
    var currenturl = window.location.toString();
    chrome.storage.local.get('profile', function(result) {
      if (typeof result.profile == 'undefined') {
        alert("You must save your Kumquat profile before autofilling.")
      } else {
        PROFILE = JSON.parse(result.profile)
        if (existsquery("input[id='first_name']")) {
          greenhouse();
        }
        if (window.location.toString().includes("myworkdayjobs")) {
          workday()
        }
        if (window.location.toString().includes("taleo") && taleoflag == false) {
          taleo()
        }
        if (currenturl.includes('lever.co') && currenturl.includes('/apply')) {
          lever()
        }
      }
    });
 });


function completeNotification() {
  chrome.runtime.sendMessage('', { 
      type: 'notification',    
      options: {      
        title: 'Autofill Complete!',     
        message: 'Thanks for using Kumquat.',      
        iconUrl: '/kumquat48.png',      
        type: 'basic'    
      }  
  });
}