import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import useMetaMask from "../../../wallet/hook";


function Header() {

    
  const {
    connect,
    disconnect,
    isActive,
    account,
    walletModal,
    handleWalletModal,
    switchActive,
    library
  } = useMetaMask();

    return(
      <header className="p-3 mb-3">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="https://polygonscan.com/token/0xb6c3c00d730acca326db40e418353f04f7444e2b" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none me-lg-auto">
              <img src={process.env.PUBLIC_URL +'/assets/images/logo/logo-text.png'} alt="mdo" width="auto" height="32"/>
            </a>
           
            {isActive?
              (
                <div className="dropdown text-end">
                  <a href="#" className="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={process.env.PUBLIC_URL +'/assets/images/users/user01.png'} alt="mdo" width="32" height="32" className="rounded-circle"/>
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li><a className="dropdown-item" href="#"> {account ? account.slice(0, 4).concat(`...${account.slice(-4)}`) : 'Not Connect'} </a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item"  onClick={() => disconnect()}>Sign out</a></li>
                  </ul>
                </div>
              ):(
                <a href="/wallet">
                <button className="btn btn-danger rounded-pill">Connect Wallet</button>
                </a>
              )
            }
          

            
          </div>
        </div>
      </header>
    );
}
export default Header;