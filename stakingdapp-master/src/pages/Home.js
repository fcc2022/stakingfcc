import React, { useState } from 'react'
import StakePools from '../components/List/StakePools'
import {list } from '../data/StakingPoolLists';

function Home() {
    const [poolList, setPoolList] = useState(list);
    return (
        <>
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div class="nomics-ticker-widget" data-name="First Choice Coin" data-base="FCC3" data-quote="USD"></div><script src="https://widget.nomics.com/embed.js"></script>
            <div className="col-lg-6">
                <div className='head-bar'/>
                <h1 className="display-5 lh-1 my-3 title-text fw-600">Just stake Fcc tokens to earn.</h1>
                <p className="lead py-3">First Choice Coin is a Defi token used for staking, marketing reward, and a utility for first choice coin economy of defi, gaming, Nft, and others. It is an ERC20 Polygon Matic-based blockchain technology that aims to bridge real-world assets to the decentralized finance world..</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <a class="btn btn-primary" data-toggle="collapse" href="https://quick.fccstakingdapp.com/" role="button" aria-expanded="false" aria-controls="collapseExample">STAKE FCC EARN QUICK!</a>
                <a class="btn btn-primary" data-toggle="collapse" href="https://quickswap.exchange/#/swap?swapIndex=0&currency0=ETH&currency1=0xb6C3C00D730ACcA326dB40e418353f04f7444e2B" role="button" aria-expanded="false" aria-controls="collapseExample">BUY FCC COIN!</a>
                </div>
            </div>
            <div className="col-10 col-sm-8 col-lg-6">
                <img src="assets/images/misc/hero.png" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
            </div>
            </div>
        </div>
        <div className='container'>
            <StakePools poolList={poolList} />
        </div>
        </>
    )
}

export default Home
