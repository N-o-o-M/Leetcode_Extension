document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("toggleSwitch");

  // Load the saved toggle state
  chrome.storage.sync.get("hideDifficulty", function (data) {
    toggleSwitch.checked = data.hideDifficulty ?? true; // Default to true
  });

  // Toggle difficulty tags when switch is changed
  toggleSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ hideDifficulty: toggleSwitch.checked });

    // Send a message to the content script to apply changes
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hideDifficulty: toggleSwitch.checked,
      });
    });
  });
});
