# Setup a Prox

During development if you need to connect to the PROD backend or localhost, using `create-react-app` cli, it's simple.

1. Goto your `package.json` and set the following rule
2. For Development

```js
"proxy": "http://localhost:5000"
```
3. For Production

```js
"proxy": "https://quest-tech.herokuapp.com"
```

4. Always use the absolute URL in your async calls, like in `async-requests.js` using AXIOS

```js
return axios.get('/helo'); // use absolute url, baseurl is taken from package.json
```

> NOTE: Remember to remove proxy configuration when deploying to production