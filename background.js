chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes("somtoday.nl")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  } else {
    alert("Please open Somtoday before running the extractor.");
  }
});
