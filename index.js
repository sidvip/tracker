chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("recieved message", message.greeting);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //   document.getElementById("demo").innerHTML = this.responseText;
            console.log('logged in backend')
        }
    };
    chrome.storage.local.get("token", function (items) {
        console.log(items);
        if (items?.token) {
            // document.getElementById("signed-in").style.display = "block";
            xhttp.open("GET", `https://tracker-server-w47v.onrender.com/add-url?email=${items?.token}&url=${message.greeting}`, true);
            xhttp.send();
        }
    });
});

window.onload = function () {

    document.querySelector('#sign-in')?.addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            chrome.storage.local.set({ "token": token }, function () {
                console.log('set');
            });
        });
    });

    document.querySelector('#sign-out')?.addEventListener('click', function () {
        chrome.identity.launchWebAuthFlow(
            { 'url': 'https://accounts.google.com/logout' },
            function (tokenUrl) {
                chrome.storage.local.clear(function () {
                    console.log('cleaned storage');
                    document.getElementById("signed-in").style.display = "none";
                });
                console.log(tokenUrl);
                // responseCallback();
            }
        );
    });


};