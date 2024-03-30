import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalProvider from './context/Provider';
// ********************Styles********************
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/theme.scss'
import './assets/styles/typography.scss'
import './assets/styles/animate.css'
import './assets/styles/style.scss'

// ********************JS********************
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router >
  </React.StrictMode>
);
reportWebVitals();





