document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('edit_profile').onclick = function() {
        chrome.runtime.openOptionsPage();
    };
});