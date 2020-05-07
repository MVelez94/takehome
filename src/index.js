import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const GITHUB_ENDPOINT = "https://api.github.com/repos/facebook/react/issues";
const FALLBACK_ENDPOINT = "/issues.json";
fetch(GITHUB_ENDPOINT, {headers: {"Accept": "application/vnd.github.v3+json"}})
.catch(() => {
  console.warn("Could not fecth GitHub endpoint. Using fallback");
  return fetch(FALLBACK_ENDPOINT);
})
.then(response => response.json())
.then(issues => ReactDOM.render(
  <React.StrictMode>
    <App issues={issues} />
  </React.StrictMode>,
  document.getElementById('root')
));
