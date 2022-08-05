import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
export default function NavBar({showLinks = true}) {
  return (
    <React.Fragment>
      <nav className="navbar py-1 mb-10 mb-24-tablet has-background-white" style={{marginTop: '12px'}}>
                         <div className="container px-8-mobile">
                           <div className="navbar-brand is-align-items-center">
                             <a className="navbar-item" href="#">
                               <span className="navbar-item px-0 title is-size-4 has-text-dark">
                                 <img src="/acros-assets/logo/logo.png" alt="" width="auto" style={{maxHeight: 'initial',width: '100px',marginLeft: '-16px'}}/>
                               </span>
                             </a>
                             <a className="navbar-menu-open navbar-burger" role="button" type="button" data-toggle="side-menu" style={{display:'none'}}>
                               <span aria-hidden="true"></span>
                               <span aria-hidden="true"></span>
                               <span aria-hidden="true"></span>
                             </a>
                           </div>
                           { showLinks &&
                           <div className="navbar-menu">
                             <div className="navbar-start ml-auto mr-0">
                               <ul className="navbar-item pl-0">
                                 <li><a className="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="#" style={{color: '#515d6a !important'}}>Home</a></li>
                                 <li><a className="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="#cvLive">CV vs Live coding</a></li>
                                 <li><a className="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="#howItWorks">How it works</a></li>
                                 <li><a className="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="/login-as-recruiter">Recruiter Login</a></li>
                               </ul>
                             </div>
                             <div className="navbar-end">
                               <div className="navbar-item is-hidden-mobile">
                                 <div className="buttons"><a className="button is-primary" href="/live-code">Try it Free</a></div>
                               </div>
                             </div>
                           </div>}
                         </div>
                       </nav>
    </React.Fragment>
  );
}
