function removeDifficultyTags() {
  document
    .querySelectorAll(
      "div.text-difficulty-medium, div.text-difficulty-easy, div.text-difficulty-hard"
    )
    .forEach((el) => (el.style.display = "none"));
}

function restoreDifficultyTags() {
  document
    .querySelectorAll(
      "div.text-difficulty-medium, div.text-difficulty-easy, div.text-difficulty-hard"
    )
    .forEach((el) => (el.style.display = ""));
}

// Check stored toggle state and apply
chrome.storage.sync.get("hideDifficulty", function (data) {
  if (data.hideDifficulty) removeDifficultyTags();
});

// Listen for toggle changes from popup
chrome.runtime.onMessage.addListener(function (message) {
  if (message.hideDifficulty) {
    removeDifficultyTags();
  } else {
    restoreDifficultyTags();
  }
});
