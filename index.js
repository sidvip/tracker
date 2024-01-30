chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("recieved message", message.greeting);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //   document.getElementById("demo").innerHTML = this.responseText;
            console.log('logged in backend')
        }
    };
    xhttp.open("GET", `http://localhost:8000/add-url?email=${'abc@gmail.com'}&url=${message.greeting}`, true);
    xhttp.send();
});

window.onload = function () {
    document.querySelector('#sign-in').addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            console.log(token);
        });
    });
};