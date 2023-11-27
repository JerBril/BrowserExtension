const urlMap = new Map()

function handleUpdated(tabId, changeInfo, tabInfo) {
	try {
		if (changeInfo.url) {

			url = new URL(changeInfo.url)
			hostname = url.hostname.replace(/^www\./, '');
			if (hostname) {
				console.log(`Tab: ${tabId} URL changed to ${url} hostname: ${hostname}`);

				if (urlMap.has(hostname) === false) {
					urlMap.set(hostname, 1)
				}
				else if (urlMap.has(hostname)) {
					curValue = urlMap.get(hostname)
					urlMap.set(hostname, curValue + 1)
				}

				browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
					if (message.action === 'getData') {
						// Send the result back to the popup
						sendResponse({ data: getURLMap() });
					}
				});
			}

		}
	}
	catch {
		console.log('Error in handling update background.js')
	}
}

function getURLMap() {
	urlArray = Array.from(urlMap);
	return urlArray.sort((a, b) => b[1] - a[1]);
}

browser.tabs.onUpdated.addListener(handleUpdated);