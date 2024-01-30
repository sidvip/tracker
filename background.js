chrome.webNavigation.onCompleted.addListener(
    async (e) => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { greeting: e.url });
        // do something with response here, not outside the function
        console.log(response);
    },
);