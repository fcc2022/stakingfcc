import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/StyleWhite.css';
import App from './App';
import Layout from './components/Layout/Layout';

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { MetaMaskProvider } from "./wallet/hook";
import 'font-awesome/css/font-awesome.min.css';

function getLibrary(provider) {
  return new Web3(provider);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Layout>
          <App />
        </Layout>
      </MetaMaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

