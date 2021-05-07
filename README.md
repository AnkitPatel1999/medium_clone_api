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

///////////////diff beteen put and patch

existing data
{a:10, b:20}

PUT = data is replaced with new data that's comming 
{b:30,c:40}

result = {b:30,c:40}

PATCH = key with patch is updated and extra key added , existing key remain
{b:30,c:40}

result = {a:10, b:30,c:40}

////////////////////////
////////////////////////login with google/fb/github/twitter
https://github.com/coding-blocks/oneauth
////////////////

TDD = Test Driven Development = what is support to happen = we write test cases(we test first)

==> use slugify module
      npm i slugify