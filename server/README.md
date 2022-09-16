run ts: yarn watch:dev
run code: yarn server:dev
1. tsconfig.json
Before that, we need to install typescript
In package.json create script with tsc
then run 
```
yarn run tsc --init
```

2. prettier
3. node locked
```
node -v > .nvmrc
```
and file .npmrc to only run yarn
and some line in package.json
```
  "engines": {
    "node": ">=14.0.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  },
```

4. husky
```
yarn add husky -D
```
git init
yarn add prettier -D
npx mrm@2 lint-staged

add covention commit message
```
yarn add @commitlint/config-conventional @commitlint/cli -D
```

then create file commitlint.config.js
finally, create commit message with 
```
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
or
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

rules document: https://commitlint.js.org/#/reference-rules

5. add module alias
```
yarn add module-alias
```
and baseUrls, paths in tsconfig
and module in package.json

To use alias we need to add 
```
require('module-alias/register');
``` 


6. using appolo instead of express-graphql ( 1.1M vs 1.4M)

7. Fix issue
need import reflect-data
need version of graphql ^15.3.0 because type-graphql only support to this version


8. graphql type already check type of input

9. NODE_ENV=production -> turn off playground graphql studio

10. using middelware in graphql

11. refresh token on specific route => because we only want handle cookie in this route not all like graphql

12. refreshToken being hacked -> using tokenVersion to update and prevent use old refreshToken

13. Cors configure with cors and apollo

test graph
