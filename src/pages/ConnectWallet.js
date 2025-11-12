import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { MetaMaskProvider } from '../wallet/hook';
import useMetaMask from '../wallet/hook';
import { walletProvider } from '../data/Constats';
import WalletList from '../components/List/WalletList';
import {list} from '../data/WalletProviderLists'
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
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

    const connectWallet = async (providerType) => {
        console.log(providerType);
        switch (providerType) {
            case walletProvider.METAMASK:
                connect(walletProvider.METAMASK, '0X4');
                break;
            case walletProvider.TRUSTWALLET:
                connect(walletProvider.TRUSTWALLET, '0X4');
                break;
            case walletProvider.SAFEPAL:
                connect(walletProvider.SAFEPAL, '0X4');
                break;
            default:
                connect(walletProvider.WALLET_CONNECT);
                break;
        }
        setShowPopup(false);
        setShowModal(false);
    };
    
    useEffect(() => {
        if(isActive && account){
            navigate('/');
        }
    }, [account,isActive]);
    

      
   

    return (
        <>
        <div className='container'>
            <div class="px-4 py-5 my-5 text-center">
                <img class="d-block mx-auto mb-4" src="assets/images/misc/wallet.png" alt="" width="192" height="192"/>
                <h1 class="display-5 fw-bold dark" >Connect your wallet</h1>
                <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Stake your Fcc coin and start earning every second now!</p>
                
                </div>
            </div>
        </div>
        <div className='container'>
            <WalletList
            list = {list}
            account= {account}
            isActive = {isActive}
            connectWallet ={connectWallet}
            
            />
        </div>
        
        <ToastContainer />
        </>
       
    )
};
