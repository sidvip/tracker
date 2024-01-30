# introduction

- https://github.com/sidvip/backend
- https://github.com/sidvip/tracker


## inside tracker 

- run `npm i && npx webpack`
- load the dist folder only after changing the localhost url inside index.js

## backend 
- udpate `connectionString` inside server.js 
- add origin: 'chrome-extension://{id}', // add chrome estension url
- run `npm i && npm start`

## frontend inside backend
- run `npm i && npm start`
- replace your login id inside `index.js` at line 8 `<GoogleOAuthProvider clientId='replace-your-id'>`
