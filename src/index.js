import axios from 'axios';

chrome.webNavigation.onCompleted.addListener(async (details) => {
    console.log('onCompleted', details.url);
    axios.post('http://localhost:8000/send-url', {
        url: details.url,
    }).then((data) => {
        console.log(data);
    }).catch((err) => { console.log("error", err) })
});
