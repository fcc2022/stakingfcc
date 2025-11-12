import logo from './logo.svg';
import './styles/App.css';
import React, {useEffect } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import DetailStaking from "./pages/DetailStaking";
import CommingSoon from "./pages/ComingSoon";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { MetaMaskProvider } from "./wallet/hook";
import ConnectWallet from "./pages/ConnectWallet";

function App() {
  useEffect( () => {
    document.title = " Fcc Staking Dapp";
  }, []);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staking/:id" element={<DetailStaking />} />
        <Route path="/soon" element={<CommingSoon />} />
        <Route path="/wallet" element={<ConnectWallet />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
