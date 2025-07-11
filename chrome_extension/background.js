// Listen for installation
chrome.runtime.onInstalled.addListener(function () {
  console.log("Phishing Detection Extension installed");
});

// Optional: Listen for tab updates to check if we have a stored result for the URL
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get([tab.url], function (result) {
      if (result[tab.url]) {
        const storedData = result[tab.url];
        const hoursSinceLastCheck =
          (Date.now() - storedData.timestamp) / (1000 * 60 * 60);

        // If the result is older than 24 hours, remove it
        if (hoursSinceLastCheck > 24) {
          chrome.storage.local.remove([tab.url]);
        }
      }
    });
  }
});
