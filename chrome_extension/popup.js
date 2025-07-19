document.addEventListener("DOMContentLoaded", function () {
  const currentUrlElement = document.getElementById("currentUrl");
  const scanButton = document.getElementById("scanButton");
  const loadingElement = document.getElementById("loading");
  const resultElement = document.getElementById("result");
  const errorElement = document.getElementById("error");

  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const longUrl = new URL(currentTab.url);
    const url = `${longUrl.hostname}${longUrl.pathname}`;
    console.log(url);
    currentUrlElement.textContent = url;
  });

  scanButton.addEventListener("click", async function () {
    try {
      // Reset UI state
      resultElement.style.display = "none";
      errorElement.style.display = "none";
      loadingElement.style.display = "block";
      scanButton.disabled = true;

      //Get current URL
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const currentTab = tabs[0];
      const longUrl = new URL(currentTab.url);
      const url = `${longUrl.hostname}${longUrl.pathname}`;
      //   // Send request to backend
        const response = await fetch("https://orbital-phisherman.onrender.com/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

      //changed to proper return results change to save api calls
      const result = data.result;
      const confidence = data.confidence;

      // Update UI with result
      resultElement.style.display = "block";
      if (result === "Phishing") {
        resultElement.innerHTML = `
          <div class="flex flex-col items-center gap-4">
            <img
                src="assets/phishing.gif"
                alt="Phishing Link Found"
                class="w-full max-w-[300px] object-contain"
            />
            <div class="text-center w-full">
              <p class="text-red-600 font-medium">
                You caught a MASSIVE Phish, this could be a phishing attempt!
              </p>
              <p class="mt-2 text-sm text-red-600">
                Confidence: ${confidence.toFixed(1)}%
              </p>
            </div>
            <a 
              href="https://orbital-phishermen.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 underline mt-2"
            >
              Visit Phisherman AI to learn more!
            </a>
          </div>
        `;
        resultElement.className = "result unsafe";
      } else {
        resultElement.innerHTML = `
          <div class="flex flex-col items-center gap-4">
            <img
                src="assets/no_fish.gif"
                alt="Safe Website"
                class="w-full max-w-[300px] object-contain"
            />
            <div class="text-center w-full">
              <p class="text-green-600 font-medium">
                No Phish for you, this website appears to be safe!
              </p>
              <p class="mt-2 text-sm text-green-600">
                Confidence: ${confidence.toFixed(1)}%
              </p>
            </div>
            <a 
              href="https://orbital-phishermen.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 underline mt-2"
            >
              Visit Phisherman AI to learn more!
            </a>
          </div>
        `;
        resultElement.className = "result safe";
      }

      // Store the result in chrome.storage
      chrome.storage.local.set({
        [url]: {
          result: result,
          confidence: confidence,
          timestamp: Date.now(),
        },
      });
    } catch (error) {
      console.error("Error:", error);
      errorElement.textContent = `Error analyzing URL. Please try again." + ${error}`;
      errorElement.style.display = "block";
    } finally {
      loadingElement.style.display = "none";
      scanButton.disabled = false;
    }
  });
});
