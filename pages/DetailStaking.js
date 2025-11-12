import React, { useState,useEffect, startTransition } from 'react'
import { useParams } from "react-router-dom";
import StakeList from '../components/List/StakeLists'
import {list } from '../data/StakingPoolLists';
import {periodeList } from '../data/PeriodeLists';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import useMetaMask from "../wallet/hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {POOL_STAKE, RPC_NODE_MAINET,TOKEN_STAKE,FEE_TRANSAC } from "../data/Constats";
// ABI JSON
import AbiStakingPool from "../abi/AbiStakingPool.json";
import ButtonPeriods from '../components/List/ButtonPeriods';
import moment from "moment";


function DetailStaking({id}) {

    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState(list);
    const [isAllowance, setIsAllowance] = useState(false);
    const [bnbBalance, setBnbBalance] = useState(0);
    const [selectedApy, setSelectedApy] = useState('-');
    const [totalStakedToken, setTotalStakedToken] = useState(0);
    const [totalStaker, setTotalStaker] = useState(0);
    const [minStake, setMinStake] = useState(0);
    const [maxStake, setMaxStake] = useState(0);
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [dipositAmount, setDipositAmount] = useState("");
    const [timeperiod, setTimeperiod] = useState(0);
    const [timeperiodDate, setTimeperiodDate] = useState(
        moment().add(7, "days").format("DD/MM/YYYY h:mm A")
    );
    const [stackContractInfo, setStackContractInfo] = useState({
        totalStakers: 0,
        totalStakedToken: 0,
        totalUnStakedToken:0
      });
      const [stakersInfo, setStakersInfo] = useState({
        totalStakedTokenUser: 0,
        totalUnstakedTokenUser: 0,
        totalClaimedRewardTokenUser: 0,
        currentStaked: 0,
        realtimeReward: 0,
        stakeCount: 0,
        alreadyExists: false,
      });
      const [stakersRecord, setStakersRecord] = useState([]);

    const params = useParams();
    const RPC_NODE = RPC_NODE_MAINET;

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

    const web3Obj = library;

    //--- function notify
    const notify = (isError, msg) => {
    if (isError) {
        toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
        });
    } else {
        toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
        });
    }
    };

    //--- function notify
    const getBalance = async () => {
        const web3 = new Web3(RPC_NODE.http);
        try {
            var contract = new web3.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
            var balance = await contract.methods.balanceOf(account).call();
            var decimals = await contract.methods.decimals().call();
            
            var allow = await contract.methods.allowance(account, POOL_STAKE.address).call();
            if(account!=null && account!==''){
                var allow = await contract.methods.allowance(account, POOL_STAKE.address).call();
                if (allow > 0) setIsAllowance(true);
                if(balance && decimals){
                    var pow = 10 ** decimals;
                    var balanceDecimal = balance / pow;
                    setBnbBalance(balanceDecimal.toFixed(0));
                }
            }
        } catch (err) {
            console.log('get balance error->',err);
        }
    };

    const poolInfo= async()=>{
        try {
            var web3 = new Web3(RPC_NODE.http);
            var contract = new web3.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
            // Reward from to contract
            var valueApy = await contract.methods.Bonus(0).call();
            setSelectedApy((valueApy/10)+"%");

            // Total Staked Token on Pool from contract
            var stakedToken = await contract.methods.totalStakedToken().call();
            // -> check decimal from token stake contract
            var tokenStakeContract = new web3.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
            var decimals = await tokenStakeContract.methods.decimals().call();
            var token_name =  await tokenStakeContract.methods.name().call();
            var token_symbol =  await tokenStakeContract.methods.symbol().call();
            setTokenName(token_name);
            setTokenSymbol(token_symbol);
           
            var pow = 10 ** decimals;
            setTotalStakedToken(stakedToken/pow);

            // Total Stakers from contract
            var stakers = await contract.methods.totalStakers().call();
            setTotalStaker(stakers);

            // minimum stake
            var minimum = await contract.methods.minimumStakeToken().call();
            if(minimum && pow){
                setMinStake(minimum/pow);
            }
            

            // maksimum stake
            var maximum = await contract.methods.maxStakeableToken().call();
            if(maximum && pow){
                setMaxStake(maximum/pow);
            }
        }catch(err){
            notify(true, err);
        }
    }
    //function to get apy from click on period button
    const poolApy= async(index)=>{
        try {
            const web3 = new Web3(RPC_NODE.http);
            var contract = new web3.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
            var valueApy = await contract.methods.Bonus(index).call();
            setSelectedApy((valueApy/10)+"%");
        }catch(err){
            console.log('pool info error->',err);
        }
    }
    
    // function enable 'stake token' for interact with 'stake pool contract'
    const setApprove = async () => {
        setLoading(true);
        try {
            var contract = new web3Obj.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
            var enableAmount = 10 ** 69;
            enableAmount = enableAmount.toLocaleString("fullwide", { useGrouping: false });
           
            await contract.methods
            .approve(POOL_STAKE.address, enableAmount.toString())
            .send({ from: account, gas:FEE_TRANSAC.polygonGas, gasPrice: FEE_TRANSAC.polygonGasPrice})
            .then(() => {
                notify(false,'Success Enable Token')
                setIsAllowance(true);
                setLoading(false);
            });
        } catch (err) {
            console.log("err set allowance",err);
            setLoading(false);
        }
    };

    const stake = async () => {
        if((dipositAmount<minStake)||(dipositAmount>maxStake)){
            notify(true, "Sorry. Min "+minStake+" - Max "+maxStake+" $"+tokenSymbol);
            return;
        }

        if (isNaN(parseFloat(dipositAmount)) || parseFloat(dipositAmount) <= 0) {
            notify(true, "Error! please check your input amount");
            return;
        }
        
        setLoading(true);
        try {
            // get access to token contract
            var tokenStakeContract = new web3Obj.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
            var decimals = await tokenStakeContract.methods.decimals().call();
            var pow = 10 ** decimals;
            // ammount to stake
            var amount = dipositAmount * pow;

            var contract = new web3Obj.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
            amount = amount.toLocaleString("fullwide", { useGrouping: false });
            console.log(amount.toString(), timeperiod.toString());
            await contract.methods
            .stake(amount.toString(), timeperiod.toString())
            .send({ from: account,gasPrice:FEE_TRANSAC.polygonGasPrice })
            .then((result) => {
                getStackerInfo();
                setLoading(false);
                poolInfo();
                notify(false, "Staking process complete.");
            });
        } catch (err) {
            setLoading(false);
            if(err.message==="Cannot read properties of undefined (reading 'eth')"){
                notify(true,"Please reconnect, your wallet" );
            }else{
                notify(true, err.message);
            }
        }
    };

    const unstake = async (index) => {
        setLoading(true);
        try {
            var contract = new web3Obj.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
            await contract.methods
            .unstake(index.toString())
            .send({ from: account,gasPrice: FEE_TRANSAC.polygonGasPrice })
            .then((result) => {
                getStackerInfo();
                setLoading(false);
                notify(false, "successfully unstake");
            });
        } catch (err) {
            setLoading(false);
            notify(true, "unstake fail");
        }
    };
    
      const harvest = async (index) => {
        setLoading(true);
        try {
          var contract = new web3Obj.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
          await contract.methods
            .harvest(index.toString())
            .send({ from: account, gasPrice: FEE_TRANSAC.polygonGasPrice})
            .then((err) => {
              getStackerInfo();
              setLoading(false);
              notify(false, "Reward successfully harvested");
            });
        } catch (err) {
          console.log(err);
          setLoading(false);
          notify(true, err.message);
        }
      };
    
    const getStackerInfo = async () => {
        setLoading(true);
        try {
            poolInfo();
            if(web3Obj){
                var tokenStakeContract = new web3Obj.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
                var decimals = await tokenStakeContract.methods.decimals().call();
                var pow = 10 ** decimals;

                var contract = new web3Obj.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
                var totalStakedToken = await contract.methods.totalStakedToken.call();
                var totalUnStakedToken = await contract.methods.totalUnStakedToken.call();
                var totalStakers = await contract.methods.totalStakers.call();

                var realtimeReward = await contract.methods.realtimeReward(account).call();
                
                var Stakers = await contract.methods.Stakers(account).call();
               
                var totalStakedTokenUser = Stakers.totalStakedTokenUser / pow;
                var totalUnstakedTokenUser = Stakers.totalUnstakedTokenUser / pow;
                var currentStaked = totalStakedTokenUser - totalUnstakedTokenUser;

                Stakers.totalStakedTokenUser = totalStakedTokenUser;
                Stakers.totalUnstakedTokenUser = totalUnstakedTokenUser;
                Stakers.currentStaked = currentStaked;
                Stakers.realtimeReward = realtimeReward / (10 ** 18);
                Stakers.totalClaimedRewardTokenUser = Stakers.totalClaimedRewardTokenUser / 10 ** 18;
              
                var stakersRecord = [];
                for (var i = 0; i < parseInt(Stakers.stakeCount); i++) {
                    var stakersRecordData = await contract.methods.stakersRecord(account, i).call();
                    var realtimeRewardPerBlock = await contract.methods.realtimeRewardPerBlock(account, i).call();
                    stakersRecordData.realtimeRewardPerBlock = realtimeRewardPerBlock;
                    // console.log("realtimeRewardPerBlock",realtimeRewardPerBlock);
                    // tambahan
                    stakersRecordData.utcUnstaketime = stakersRecordData.unstaketime;
                    stakersRecordData.utcStaketime = stakersRecordData.staketime;

                    stakersRecordData.unstaketime = moment.unix(stakersRecordData.unstaketime).format("DD/MM/YYYY h:mm A");
                    stakersRecordData.staketime = moment.unix(stakersRecordData.staketime).format("DD/MM/YYYY h:mm A");
                    stakersRecord.push(stakersRecordData);
                }
                setStakersInfo(Stakers);
                setStakersRecord(stakersRecord);
                setStackContractInfo({
                    totalStakers: totalStakers,
                    totalStakedToken: totalStakedToken / pow,
                    totalUnStakedToken: totalUnStakedToken/pow,
                });
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setStakersInfo({
                totalStakedTokenUser: 0,
                totalUnstakedTokenUser: 0,
                totalClaimedRewardTokenUser: 0,
                currentStaked: 0,
                realtimeReward: 0,
                stakeCount: 0,
                alreadyExists: false,
            });
            setStackContractInfo({
                totalStakers: 0,
                totalStakedToken: 0,
                totalUnStakedToken:0,
            });
            setStakersRecord([]);
        }
    };
    
    const setMaxWithdrawal = async () => {
        var tokenContract = new web3Obj.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
        var decimals = await tokenContract.methods.decimals().call();
        var getBalance = await tokenContract.methods
            .balanceOf(account.toString())
            .call();
        var pow = 10 ** decimals;
        var balanceInEth = getBalance / pow;
        setDipositAmount(balanceInEth.toFixed(0) * 99/100 );
    };

    const handleInputChange = () => (e) => {
        setDipositAmount(e.target.value);
        // console.log(e.target.value);
    };


    useEffect(() => {
        if (isActive && account) {
          getBalance();
        //   usersTokenBought();
    
        }
      }, [isActive,account]);

    useEffect(()=>{
        poolInfo();
    },[])

    useEffect(()=>{
        if(web3Obj){
            getStackerInfo();
            setInterval(function () {
                getStackerInfo();
            }, 60000);
        } ;

    },[web3Obj])

    return (
        <>
        <div className="container px-4 py-5">
            <div className='head-bar'/>
            <div className="row g-5 py-5">
                <div className="col-xl-6 col-lg-6 col-12">
                    <div className='card p-3 mb-5 rounded border-0'>
                        <div className='card-body'>
                            <h1 className="display-5 lh-1 my-3 title-text fw-600">Just stake some tokens to earn.</h1>
                            <ButtonPeriods
                                list = {periodeList}
                                poolApy ={poolApy}
                                setTimeperiod = {setTimeperiod}
                                />
                            
                            <div className='staking-panel-input-margin'>
                                <div>
                                    <small>Your Balance:</small>
                                    <h6><span className='title-text'>{bnbBalance} ${tokenSymbol}</span></h6>
                                </div>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label for="newsletter1" className="visually-hidden">Input your amount</label>
                                    <input id="newsletter1"
                                        className="form-control" placeholder="amount"
                                        type="number"
                                         // pattern="^(?=.?\d)\d{0,14}(\.?\d{0,6})?$"
                                        placeholder="20.000"
                                        value={dipositAmount}
                                        onChange={handleInputChange()}
                                    />
                                    <button className="btn btn-danger" type="button">MAX</button>
                                </div>
                                <div className='d-grid mt-4'>
                                    {isActive && account?
                                        isAllowance ?
                                        <button 
                                            type="button" 
                                            className="btn btn-danger btn-lg w-100"
                                            onClick={() => {
                                                stake();
                                            }} 
                                            >STAKE</button>
                                        :
                                        <button 
                                            type="button" 
                                            className="btn btn-danger btn-lg w-100" 
                                            onClick={() => {
                                                setApprove();
                                            }}  
                                            >Enable Token</button>
                                        :
                                        <button type="button" className="btn btn-danger btn-lg  w-100">Connect Wallet</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-12">
                    <div className='card card shadow-sm px-3 py-2 mb-2 rounded border-0'>
                        <div className='card-body'>
                            <h1 className="lh-1 title-text fw-600">{totalStakedToken} ${tokenSymbol}</h1>
                            <p>Total Value Lock</p>
                        </div>
                    </div>
                    <div className='card card shadow-sm px-3 py-2 mb-2 rounded border-0'>
                        <div className='card-body'>
                            <h1 className="lh-1 title-text fw-600">{selectedApy}</h1>
                            {/* <p>Annual Percentage Yields (APY)</p> */}
                            <p>Reward</p>
                        </div>
                    </div>
                    <div className='card card shadow-sm px-3 py-2 mb-2 rounded border-0'>
                        <div className='card-body'>
                            <h1 className="lh-1 title-text fw-600">{totalStaker}</h1>
                            <p>Total Stakers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container px-4 py-2'>
            <div className='row g-5 '>
                <div className='col-12'>
                        <div >
                            <StakeList 
                                list={stakersRecord} 
                                loading={loading}
                                unstake={unstake}
                                harvest={harvest}
                                />
                        
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default DetailStaking
