# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


1. Create project
```
npx create-react-app client  --template typescript

or

yarn create react-app client  --template typescript
```
2. setup grapql with official document
https://www.apollographql.com/docs/react/get-started/

3. react hook ???

4. auto general graphql query with graphql-gen
```
yarn add -D @graphql-codegen/cli
```
then
run following command to generate graphql with typescript
```
 npx graphql-codegen init
```
then run
```
yarn
```
to install all dependencies packages
finally run 
```
yarn gen
```
to generate graqlql hook

5.
From react-router-dom v6
- Switch -> Routes
- no exact -> default exact , if we want more, so we need to use * such as: /user/*

6. Next
get accessToken when login and save it to variable in accessToken.ts
make a route to call refesh_token went refresh page
make axios inspector to check accesstoken expire to renew it
store user information after login with apollo context stort
logout: clear refreshtoken in bookie and set accessToken = ""
set path of cookie to "/refresh_token" because we only one set cookie on specific url request "refresh_token" -> check it with fireforx
open page all new tab after user login

6: document: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

7. Using  crypto.scrypt instead of bcrypt to reduce depencency but it take memory

8. Using context to refresh token when refresh page, và type for code in herry video: GOOD POINTS

9. tokenVersion: to make sure new referesh token after logout , user can't use previous refresh token to login again after they logout

10. khác nhau giữa export bình thường và export function : https://github.com/lpredrum136/full-stack-jwt-auth-tutorial/blob/master/client/src/utils/jwt.ts 

11. dùng locallStorage để lắng nghe event -> đồng bộ việc logout ở khi user mở nhiều tab, tắt logout button và không rquest api dc


12. Catch policy
https://www.apollographql.com/docs/react/data/queries/

nocache similar to network-only but it not save cache

### 13. Summary flow

Remember: set cookie with path: /refresh_token which mean client only send cookie with this specific path, and add credential in both FE, BE to send/receive cookie

***BE:***
1. Register : create user
2. Login: login with user information to generate accessToken and set refreshToken in cookies
3. Logout: delete refreshToken in cookies, setAccessToken to "" ( prevent copy and use accessToken ), update tokenVersion ( prevent using old refreshToken to continue working)

***FE:***

register
login -> get accessToken and save to variable in auth/tokens. 
In addition, apollo client neet to add accessToken to headers to help user request api later

Problem

1. refresh page -> lose accessToken , solve: get refreshtoken to get accessToken after reload page
    ++ useEffect to call api refresh_token at app file which location before go to each router
    ++ ***using context in reactjs

2. accessToken expired:
    ++ method 1: function to check before acessToken expired with axios ( rest api only not in graphql) but we can reference this docs: https://www.apollographql.com/docs/react/networking/advanced-http-networking/ to make it working like inrercepter of axios
    ++ method 2: when setToken in FE, add new function setTimout with jwt-decode để call function refereshToken before acessToken expired
    ++ method 3: using library of apollo

***Good point***
solve problem 1 & 2 in one method with close promise which learn from easy frontend
=> we just need to write a function to check accessToken is not expired -> don't request refreshToken otherwise we will call refreshToken before make any request
idea from: https://gist.github.com/kvu-luong/de00b4ab59e777ab43b2a79ba57d7092


3. user delete refreshToken cookie: we need to update acessToken too ( don't want user continue working wihout refreshToken)
FE: only need to delete accessToken = "",
BE: delete cookie , send to client, and update tokenversion to make user can't use old freshtoken

4. synchonize multiple tab: using event listener of 'storage'

5. force logout: update tokenVersion, socket emit to let all devices of this account know