import React from "react";
function StakeLists({list,unstake,harvest}) {
    
  // console.log(poolList);
  return(
        <>
        {list ? 
        list.map((item, idx) => {
            return (
            <div key={idx} className="mb-2">
                <div className="card border-0 ">
                <div className="card-body">
                <div className='row align-items-center py-2 '>
                    <div className='col-xl-2 col-lg-2 col-12 mb-xl-0 mb-lg-0 pb-xl-0 pb-lg-0 pb-2'><small className="normal-text">Stake amount</small><br/>{(Math.round(item.amount) / 10 ** 18)+' FCC'}</div>
                    
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 pb-xl-0 pb-lg-0 pb-2'><small className="normal-text">Stake</small><br/>{item.staketime}</div>
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 pb-xl-0 pb-lg-0 pb-2'><small className="normal-text">Unstake</small><br/>{item.unstaketime}</div>
                    
                    <div className='col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12 pb-xl-0 pb-lg-0 pb-2'><small className="normal-text">Harvested</small><br/>{(item.harvestreward/(10**18)).toFixed(5)+' Fcc'}</div>
                    <div className='col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12 pb-xl-0 pb-lg-0 pb-2 text-xl-end text-lg-end'><small className="normal-text">Current Earn</small><br/>{ (parseFloat(item.realtimeRewardPerBlock[0]/(10**18)).toFixed(10)) +' Fcc'}</div>
                </div>
                <div className='row align-items-center pt-2 pb-3'>    
                    <div className="col-12 text-end">
                        <a href={item.link}  className="btn btn-success rounded-pill"  onClick={() => unstake(idx)}>Unstake</a>
                        <a href={item.link}  className="btn btn-light rounded-pill ms-2"  onClick={() => harvest(idx)}>Harvest</a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            )}) 
        :
        <div className="text-center">You don't have data from this pool</div>}
        </>
        
      
    );
}
export default StakeLists;