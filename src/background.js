console.log("Background script running...");
function executeContentScript(tab) {
  console.log("Trigger content script...", tab);
  chrome.tabs.sendMessage(tab.id, { toggle: true, payload: { hello: "world"} });
}

if (chrome.action && chrome.action.onClicked) {
  // Manifest V3
  chrome.action.onClicked.addListener(executeContentScript);
} else if (chrome.browserAction && chrome.browserAction.onClicked) {
  // Manifest V2
  chrome.browserAction.onClicked.addListener(executeContentScript);
}
