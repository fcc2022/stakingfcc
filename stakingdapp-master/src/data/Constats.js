
import AbiToken from "../abi/AbiToken.json";
import AbiStakingPool from "../abi/AbiStakingPool.json";
export const walletProvider = {
    METAMASK: 'metaMask',
    TRUSTWALLET: 'trustWallet',
    SAFEPAL: 'safePal',
    WALLET_CONNECT: 'walletConnect'
};
//TESTNET
export const RPC_NODE_TESTNET={
    http:"https://apis.ankr.com/1d773c13580146fb9c5419ee763d2543/9deca392b81a904bd9568c58d3f47228/binance/full/test",
    wss:"wss://apis.ankr.com/wss/1d773c13580146fb9c5419ee763d2543/9deca392b81a904bd9568c58d3f47228/binance/full/test",
}

export const RPC_NODE_MAINET={
    http:"https://polygon-mainnet.g.alchemy.com/v2/96V23CWs99qgxVStLVLwl43TDMYFvtk2",
    wss:"wss://polygon-mainnet.g.alchemy.com/v2/96V23CWs99qgxVStLVLwl43TDMYFvtk2"
}
export const TOKEN_STAKE ={
    address:'0xb6C3C00D730ACcA326dB40e418353f04f7444e2B',
    abi: AbiToken
}
export const POOL_STAKE ={
    address:'0x2d4c31F5b381b02C4D9AcbA786a86ba718EDA53C',
    abi: AbiStakingPool
}


export const FEE_TRANSAC ={
    polygonGas : 50000,
    polygonGasPrice : 38000000000
}
