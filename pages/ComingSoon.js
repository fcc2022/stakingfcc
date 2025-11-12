import React from 'react'

function ComingSoon() {
    return (
        <div>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <img src='assets/images/logo/logo-only.png' className='img-fluid' style={{width:'30%'}}/>
                    <h1 class="fw-light mt-4">Comming Soon!</h1>
                    <p class="lead">this feature is under development, stay tuned and watch the updated.</p>
                    <p>
                        <a href="/" class="btn btn-danger my-2 rounded-pill">Goto Home</a>&nbsp;
                    </p>
                </div>
                </div>
            </section>
        </div>
    )
}

export default ComingSoon
