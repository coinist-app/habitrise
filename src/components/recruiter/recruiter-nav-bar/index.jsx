import React from "react";
import { Link } from "react-router-dom";
import styles from "./recruiter.navbar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
export default function RecruiterNavBar() {
  return (
    <React.Fragment>
      <nav class="navbar py-1 mb-10 mb-24-tablet" style={{paddingBottom: '10px !important', background: 'white', paddingTop: '10px !important', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%), 0 1px 1px 0 rgb(0 0 0 / 1%)'}}>
              <div class="container px-8-mobile">
                <div class="navbar-brand is-align-items-center">



                  <a class="navbar-item" href="#" style={{display: 'inline-flex'}}>
                      <span class="navbar-item px-0 title is-size-4 has-text-dark">
                        <img src="../acros-assets/logo/logo.png" alt="" width="auto" style={{maxHeight: 'initial', width: '100px', marginLeft: '-16px'}} onclick="location.href='/'"/>
                      </span>
                  </a>
                  <ul class="navbar-item pl-0" style={{display: '-webkit-inline-box'}}>
                    <li><a class="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item selected" href="#">Recruiter Home</a></li>
                    <li><a class="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="#cvLive">Pipelines</a></li>
                    <li><a class="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="#howItWorks">Candidates</a></li>
                    <li><a class="title is-size-6 has-text-grey-darker has-text-weight-normal navbar-item" href="/login-as-recruiter">Messages</a></li>
                  </ul>
                  <div class="menu-highlight">
                  <a class="navbar-menu-open navbar-burger" role="button" type="button" data-toggle="side-menu" style={{display:'none'}}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div></nav>
    </React.Fragment>
  );
}
