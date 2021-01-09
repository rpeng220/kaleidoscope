window.addEventListener('load', function() {
  
/*setTimeout(function(){ 
    var lname = document.getElementById("lname");
    lname.value = "ab";
}, 3000);*/

function saveChanges(resumeValue) {
  
  if (!resumeValue) {
    console.log('Error: No value specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.local.set({'resume': resumeValue}, function() {
    // Notify that we saved.
    console.log('Settings saved');
  });
  
  chrome.storage.local.get('resume', function(result) {
        console.log('Value currently is ' + result.resume);
    });
}

var button = document.getElementById("submit");

const fileSelector = document.getElementById('options_button');
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file);
    var reader = new FileReader();
  reader.onload = function(e) {
    // The file's text will be printed here
    console.log(e.target.result);
    saveChanges(e.target.result);
  };

  reader.readAsText(file);
  });
  
    button.addEventListener("click", function() {

    chrome.runtime.sendMessage({MESSEGE_TYPE: RESUME_MES}, function(response) {
    });
}, false);
    
});



