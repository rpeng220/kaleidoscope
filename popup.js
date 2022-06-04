document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('edit_profile').onclick = function() {
        chrome.runtime.openOptionsPage();
    };
    document.getElementById('autofill').onclick = function() {
      chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'content.js'}, function() {
          chrome.tabs.sendMessage(tabs[0].id, {message: "hello"});
        });
    });
  }
    var y = document.getElementById("support_page");
    y.addEventListener("click", openIndex);
});

function openIndex() {
chrome.tabs.create({active: true, url: "https://chrome.google.com/webstore/detail/kumquat/mkjkimankkfhefaabddppkhbobffaadp"});
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-188515357-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();