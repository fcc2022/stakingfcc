import React,{ useState,useEffect} from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {POOL_STAKE, RPC_NODE_MAINET,TOKEN_STAKE} from "../../data/Constats";
// ABI JSON
import AbiStakingPool from "../../abi/AbiStakingPool.json";
import ButtonPeriods from '../../components/List/ButtonPeriods';
import moment from "moment";




function StakePools({poolList}) {
  const [stakersRecord, setStakersRecord] = useState(poolList);

  const [apyActive, setApyActive] = useState(null);
  const [stakeActive, setStakeActive] = useState(null);
  const [stakerActive, setStakerActive] = useState(null);


  const RPC_NODE = RPC_NODE_MAINET;
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

  // console.log(poolList);
  const poolInfo= async(address,id)=>{
   
    // var stakersRecord = [];
    try {
        var stakersRecordData = stakersRecord[id];
        var web3 = new Web3(RPC_NODE.http);
        var contract = new web3.eth.Contract(POOL_STAKE.abi, POOL_STAKE.address);
        // Reward from to contract
        var valueApy = await contract.methods.Bonus(3).call();
       
        // setSelectedApy((valueApy/10)+"%");
        var apy = (valueApy/10)+"%";
        // Total Staked Token on Pool from contract
        var stakedToken = await contract.methods.totalStakedToken().call();
        // -> check decimal from token stake contract
        var tokenStakeContract = new web3.eth.Contract(TOKEN_STAKE.abi, TOKEN_STAKE.address);
        var decimals = await tokenStakeContract.methods.decimals().call();
        var pow = 10 ** decimals;
        // setTotalStakedToken(stakedToken/pow);
        var totalTokenStake = stakedToken/pow;

        // Total Stakers from contract
        var stakers = await contract.methods.totalStakers().call();
        stakersRecordData.apy.value =apy;
        stakersRecordData.totalStake.value =totalTokenStake;
        stakersRecordData.totalStaker.value =stakers;

        return stakersRecordData;

    }catch(err){
        notify(true, err);
        return null;
    }
}




useEffect(()=>{
  if(stakersRecord){
    var atas = null;
    stakersRecord.map((item, idx) => { 
      try {
        poolInfo(item.contract,idx).then((res) => {
          // console.log('value',item);
          if(item.contract!=='-'){
            setApyActive(res.apy.value);
            setStakeActive(res.totalStake.value);
            setStakerActive(res.totalStaker.value);
          }
          return res;
        });
      }catch(e){
        return null;
      }
    });
  }
  
},[stakersRecord])


  return(
      <div>
        {
        stakersRecord
        ? stakersRecord.map((item, idx) => {
            return (
            <div key={idx} className="card my-4 p-2 border-0">
              <div className="card-body">
                  <div className='row'>
                      <div className='col-xl-1 col-lg-1 col-12 align-items-center mb-xs-2 mb-sm-2'><img src={process.env.PUBLIC_URL +'/'+item?.icon?.stakeCoin} className="img-coin" alt="..."/></div>
                      <div className='col-xl-9 col-lg-9 col-12 justify-content-center'> 
                          <div className='row align-items-center'>
                              <div className='col-xl-4 col-lg-4 mb-3 align-items-center'>
                                   <h4 className="mb-0" >{item?.title}</h4>
                                   <p>{item?.subtitle}</p>
                              </div>
                              <div className='col-xl-2 col-lg-2 mb-3'>
                                  <h5 className="card-title text-secondary mb-0">{item?.apy?.label}</h5>
                                  <p className="card-text">{item?.contract==='-' ? item?.apy?.value : apyActive }</p>
                              </div>
                              <div className='col-xl-3 col-lg-3 mb-3'>
                                  <h5 className="card-title text-secondary mb-0">{item?.totalStake?.label}</h5>
                                  <p className="card-text">{item?.contract==='-' ? item?.totalStake?.value : stakeActive }</p>
                              </div>
                              <div className='col-xl-3 col-lg-3 mb-3'>
                                  <h5 className="card-title text-secondary mb-0">{item?.totalStaker?.label}</h5>
                                  <p className="card-text">{item?.contract==='-' ? item?.totalStaker?.value : stakerActive  }</p>
                              </div>
                          </div>
                      </div>
                      <div className='col-xl-2 col-lg-2 col-12 text-end align-items-center'>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start justify-content-xl-end justify-content-lg-end align-items-center">
                          <a href={item?.status!=null && item?.status==='participate'? item?.link:'#'}  className={item?.status!=null && item?.status==='participate'? "btn btn-danger rounded-pill":"btn btn-light rounded-pill"}>{item.status}</a>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            )}) :""
        }
      </div>
      
    );
}
export default StakePools;