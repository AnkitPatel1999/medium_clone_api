# medium_clone_api

cd = change directory

cd .. = for back one directory

cd codingblock/online
ls in linux(list) = dir in windows (directory)
mkdir medium_nodejs_api

type nul index.js // it will create empty index.js file

npm install -g express typescript
npm install express typescript
tsc --init = for create tsconfig.json file

npm install -D @types/express

 "target": "ES2016",   in tsconfig.jsonfile


"scripts": {
    "build": "tsc",
    "prestart": "npm run build",
    "start": "dist/server.js",
  },

add this in package.json file

realword.io

coding-blocks-archives/Condult_NodeJS_TypeScript

npm i bcrypt


/////////////////read token value///////////run in browser console//////
let token = "token"
token.split('.')
token.split('.')[1]
atob(token.split('.')[1])
JSON.parse(atob(token.split('.')[1]))