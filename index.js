var xhttp = new XMLHttpRequest();

chrome.storage.local.get("email", function (items) {
    if (items?.email) {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log("recieved message", message.greeting);
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //   document.getElementById("demo").innerHTML = this.responseText;
                    console.log('logged in backend')
                }
            };
            console.log(items);
            // document.getElementById("signed-in").style.display = "block";
            xhttp.open("GET", `https://tracker-server-w47v.onrender.com/add-url?email=${items?.email}&url=${message.greeting}`, true);
            xhttp.send();
        });
    }
});

window.onload = function () {

    document.querySelector('#sign-in')?.addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            xhttp.onreadystatechange = function () {
                if (this.status == 200) {
                    console.log(this.response);
                    chrome.storage.local.set({ "email": JSON.parse(this.response).email }, function () {
                        console.log('set');
                    });
                }
            };
            xhttp.open("GET", `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`, true);
            xhttp.send();

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