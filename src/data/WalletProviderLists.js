import { walletProvider } from "./Constats";

export const list  = [
    {
      name: 'Metamask',
      description:'A crypto wallet and gateway to blockchain apps',
      icon:'assets/images/wallet/meta-ico.png',
      provider: walletProvider.METAMASK,
    },
    {
      name: 'Trust Wallet',
      description:'Always secure and protected,wherever you go',
      icon:'assets/images/wallet/tw-icon.png',
      provider: walletProvider.TRUSTWALLET,
    },
    {
      name: 'Safepal',
      description:'The most trusted and secure crypto wallet',
      icon:'assets/images/wallet/sf-icon.png',
      provider: walletProvider.SAFEPAL,
    },
    {
      name: 'Wallet Connect',
      description:'The communications protocol for web3',
      icon:'assets/images/wallet/wc-icon.png',
      provider: walletProvider.WALLET_CONNECT,
    },
  ];
  