import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97, 1, 137],
  // supportedChainIds: [97, 1],
});

// export const BSC_RPC = "https://bsc-dataseed1.binance.org/";
export const BSC_RPC = "https://bsc-dataseed1.defibit.io/";
export const ETH_RPC ="https://mainnet.infura.io/v3/e83a8c54240f48c3bb04c457d4c04946";
export const POLIGON_RPC ="https://polygon-rpc.com";
export const walletConnect = new WalletConnectConnector({
  // rpc: { 1: ETH_RPC, 56: BSC_RPC },
  rpc: { 1: ETH_RPC, 97: BSC_RPC, 137:POLIGON_RPC },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});


// TEST NET
// export const API_BSC_SCAN =  'https://api-testnet.bscscan.com/api'
export const API_KEY_BSC='VHEB53E4Y115CT5ZPV1KUP6EKTC3CWFYAN'
export const API_BSC_SCAN =  'https://api.bscscan.com/api';
export const URL_BSC =  'https://bscscan.com/';




