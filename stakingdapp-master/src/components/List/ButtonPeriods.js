import React from "react";

function ButtonPeriods({list,poolApy,setTimeperiod}) {
  // console.log(poolList);
  return(
        <>
        <div className="row justify-content-md-start staking-panel-button-margin">
            
        {list ? 
        list.map((item, idx) => {
            return (
            <div key={idx} className='col-xxl-3 col-xl-4 col-6 pe-xl-4 mb-2'>
                <button 
                    type="button" 
                    className="btn btn-danger btn-lg rounded-pill text-small w-100"
                    onClick={() => {
                        poolApy(idx);
                        setTimeperiod(idx);
                    }}>
                {item.label}
                </button>
            </div>
            )}) 
        :
        ""}

        </div>
        </>
        
      
    );
}
export default ButtonPeriods;