import React from "react";
import {useState, useEffect} from "react";
import CONSTANTS from "../../../constants";
import "./viewer.module.css";

const AssessmentSessionViewer = ({}) => {

var events = [];
const startReplay = () => {

  if(typeof window.rrweb != "undefined") {
      events = JSON.parse(localStorage.getItem('recording')).events;
      console.log('--events--', events);
      new window.rrwebPlayer({
        target: document.getElementById('container'), // customizable root element
        props: {
          events
        },
      });
  }
}

useEffect(() => {
  setTimeout(function(){startReplay();},500);
});

return (
  <React.Fragment>

    <div>
      <div>
        <section class="section" style={{paddingTop: '24px', marginTop: '-6rem'}}>
          <div class="container">
            <div>
              <br/>
              <div id="container" style={{width: '600px',height: '350px', top: '-350px', position: 'absolute'}}>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="navbar-side is-hidden is-fixed is-top-0 is-left-0 has-background-blur" style={{zIndex: '50', width:'100%', height: '100%'}}>
        <div class="is-absolute" style={{zIndex: '-1;'}}></div>
        <div class="container is-relative">
          <a class="navbar-close is-absolute is-right-0 mt-6 mr-6" href="#">
            <img src="acros-assets/icons/mobile-decline.svg" alt=""/>
          </a>
        </div>
        <aside class="py-6 px-6 pb-8 has-background-white is-flex is-flex-direction-column is-justify-content-space-between" style={{height: '100%',width: '288px', overflowY: 'auto'}}>
          <div>
            <a class="navbar-item title is-size-4 has-text-dark pl-4 mb-5" href="#">
              <img src="acros-assets/logo/logo.png" width="auto" style={{maxHeight: 'initial', width:'70px'}} alt=""/>
            </a>
          </div>
          <div>
            <div class="buttons mb-8"><a class="button is-dark is-outlined is-fullwidth mb-4" href="#">Log In</a><a class="button is-primary is-fullwidth" href="#">Sign up</a></div>
            <small class="has-text-grey-darker ml-6">2021 © Shuffle</small>
          </div>
        </aside>
      </div>
    </div>

    <section class="section py-16" id="cvLive" style={{paddingTop: '0px !important'}}>
      <div class="container">
        <div class="columns is-align-items-center mb-0">
          <div class="column mb-16 mb-0-tablet" style={{marginTop: '76px'}}>
            <h2 class="title mb-6 has-mw-lg" style={{fontSize: '2.2rem'}}></h2>
            <p class="subtitle has-mw-md mb-12"><br/><br/><br/><br/><br/></p>

          </div>
          <div class="column">
          </div>
        </div>
      </div>
    </section>




  </React.Fragment>
);
}
export default AssessmentSessionViewer;




