import React from "react";
class Footer extends React.Component {
  render() {
    return(
      <div className ="container footer-margin">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center ">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src={process.env.PUBLIC_URL +'/assets/images/logo/logo-text.png'} width="auto" height="32"/>
            </a>
            <span className="mb-3 mb-md-0 text-muted">&copy; first choice coin first choice coin, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><a className="text-muted" href="#"><i className="fa fa-twitter"></i></a></li>
            <li className="ms-3"><a className="text-muted" href="#"><i className="fa fa-instagram"></i></a></li>
            <li className="ms-3"><a className="text-muted" href="#"><i className="fa fa-telegram"></i></a></li>
          </ul>
        </footer>
      </div>
    );
  }
}
export default Footer;