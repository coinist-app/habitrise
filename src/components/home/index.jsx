import React from "react";

const Home = () => {
  return (
  <React.Fragment>
               <div>

                 <div>
                   <section className="section py-0" style={{background: 'linear-gradient(0deg, rgba(238,247,250,1) 0%, rgba(255,255,255,1) 100%)',marginBottom: '20px'}}>
                     <div className="container">
                       <div className="columns is-align-items-center">
                         <div className="column pt-8-tablet mb-12 mb-0-tablet" style={{marginBottom: '-120px !important'}}>

                           <h2 className="has-text-grey-darker has-mw-xl title .is-size-2" style={{fontFamily:'\'Lexend Deca\', sans-serif', fontWeight: '200'}}>Ala. Practice live coding.<br/>Get hired faster!</h2>
                           <div className="m-primary-img"><img className="image mx-auto" src="acros-assets/images/call-to-action/cta-12-work.png" alt=""/></div>
                           <p className="subtitle has-mw-md has-text-grey-darker mb-10 m-primary-desc" style={{display: 'inline'}}><b>CVs are outdated</b>. Showcase your skill through live coding and get hired by top companies.</p>
                           <div className="buttons mb-20" style={{marginTop: '36px'}}><a className="button is-primary mr-4" href="/live-code">Try it Free</a><a className="button is-dark is-outlined" href="#cvLive">Learn more</a></div>
                           <div className="arrow bounce">
                             <a href="#">
                               <img src="acros-assets/icons/headers/arrow-down.svg" alt=""/>
                             </a>
                           </div>
                         </div>
                         <div className="column" style={{padding: '0'}}>
                           <img className="image mx-auto l-primary-img" src="acros-assets/images/call-to-action/cta-12-work.png" alt="" style={{marginTop: '-90px'}}/>
                         </div>
                       </div>
                     </div>
                   </section>
                 </div>
                 <div className="navbar-side is-hidden is-fixed is-top-0 is-left-0 has-background-blur" style={{zIndex: '50', width:'100%', height: '100%;'}}>
                   <div className="is-absolute" style={{zIndex: '-1'}}></div>
                   <div className="container is-relative">
                     <a className="navbar-close is-absolute is-right-0 mt-6 mr-6" href="#">
                       <img src="acros-assets/icons/mobile-decline.svg" alt=""/>
                     </a>
                   </div>
                   <aside className="py-6 px-6 pb-8 has-background-white is-flex is-flex-direction-column is-justify-content-space-between" style={{height: '100%', width: '288px', overflowY: 'auto'}}>
                     <div>
                       <a className="navbar-item title is-size-4 has-text-dark pl-4 mb-5" href="#">
                         <img src="acros-assets/logo/logoh.png" width="auto" style={{maxHeight:'initial',width:'100px'}} alt=""/>
                       </a>
                       <ul className="menu-list title is-size-6">
                         <li><a className="py-4 px-6 has-text-grey-darker" href="#">Home</a></li>
                         <li><a className="py-4 px-6 has-text-grey-darker" href="#cvLive">CV vs Live coding</a></li>
                         <li><a className="py-4 px-6 has-text-grey-darker" href="#howItWorks">How it works</a></li>
                         <li><a className="py-4 px-6 has-text-grey-darker" href="#practice">Take Practice Session</a></li>
                       </ul>
                     </div>
                     <div>
                       <div className="buttons mb-8"><a className="button is-dark is-outlined is-fullwidth mb-4" href="#">Log In</a><a className="button is-primary is-fullwidth" href="#">Sign up</a></div>
                       <small className="has-text-grey-darker ml-6">2021 © Shuffle</small>
                     </div>
                   </aside>
                 </div>
               </div>

               <section className="section py-16" id="cvLive" style={{paddingTop: '0px !important'}}>
                 <div className="container">
                   <div className="columns is-align-items-center mb-0">
                     <div className="column mb-16 mb-0-tablet" style={{marginTop: '76px'}}>
                       <h2 className="title mb-6 has-mw-lg" style={{fontSize: '2.2rem', fontFamily: '\'Lexend Deca\', sans-serif', fontWeight: '200'}}>Practice your skill. Shorten the interview process!</h2>
                       <p className="subtitle has-mw-md mb-12">Not able to clear <b>indifferent coding rounds</b> or not getting enough <b>interview calls</b>?  <br/><br/>Our live coding platform is a hit with recruiters. Practice & take coding rounds online and get job offers in no time!</p>
                       <div className="columns">
                         <div className="column mb-6 mb-0-tablet">
                           <img className="mb-8" src="acros-assets/icons/features/auth-green-light.svg" alt=""/>
                           <h5 className="mb-4 title is-size-5 has-text-weight-medium">Live coding &gt; Resumé</h5>
                           <p className="subtitle is-size-6">A resumé never does justice in showing your <b>real ability</b>. Recruiters want to see how you code to clearly assess your skill.</p>
                         </div>
                         <div className="column">
                           <img className="mb-8" src="acros-assets/icons/features/user-green-light.svg" alt=""/>
                           <h5 className="mb-4 title is-size-5 has-text-weight-medium">Large pool of recruiters</h5>
                           <p className="subtitle is-size-6">Your <b>best coding performance</b> is showcased with top recruiters to already kickstart the interview process.</p>
                         </div>
                       </div>
                     </div>
                     <div className="column">
                       <img className="image mx-auto mr-0-tablet" src="acros-assets/images/features/space-discovery.png" alt=""/>
                     </div>
                   </div>
                 </div>
               </section>
               <hr className="gray-hr"/>
               <section className="section py-16" id="howItWorks">
                   <div className="container">
                   <div class="container">
                             <div class="columns is-align-items-center">
                               <div class="column mb-12 mb-0-tablet">
                                 <small class="mb-2 is-block is-uppercase has-text-weight-semibold has-text-grey-darker">
                                   <span>How it</span>
                                   <span class="has-text-primary">works</span>
                                 </small>
                                 <h2 class="title has-mw-lg pr-5-widescreen" style={{fontFamily: '\'Lexend Deca\', sans-serif',fontWeight: '200'}}>Stand out from the (tech) crowd</h2>
                                 <p class="subtitle has-mw-md mb-8">Our live coding assesments go from easy to challenging, helping you prep up and showcase your best coding skills.</p>
                               </div>
                               <div class="column has-background-white-ter py-12" style={{borderRadius: '6px'}}>
                                 <div class="is-relative columns mb-12 has-mw-sm mx-auto">
                                   <div class="column is-narrow py-0 pr-7-tablet">
                                     <div class="is-relative mb-9 is-inline-block">
                                       <img src="acros-assets/icons/how-it-works/security-small.svg" alt=""/><span class="is-block has-text-weight-semibold has-background-white-bis has-text-grey-darker is-absolute" style={{right: '-0.7rem', bottom: '0', fontSize: '10px', width:'24px', height:'24px', borderRadius: '50%'}}>
                                         <span class="is-absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>1</span>
                                       </span>
                                     </div>
                                   </div>
                                   <div class="column py-0">
                                     <h5 class="mb-4 title is-size-5 has-text-grey-darker has-text-weight-medium" style={{textDecoration:'underline'}}>Login with Google account</h5>
                                     <p class="has-text-grey-darker">Easy login process to get you started</p>
                                   </div>
                                   <div class="is-hidden-mobile is-block-tablet has-background-light is-absolute" style={{borderRadius: '2px', width: '2px', height: '82px', left: '39px', top:'69px'}}></div>
                                 </div>
                                 <div class="is-relative columns mb-12 has-mw-sm mx-auto">
                                   <div class="column is-narrow py-0 pr-7-tablet">
                                     <div class="is-relative mb-9 is-inline-block">
                                       <img src="acros-assets/icons/how-it-works/file.svg" alt=""/><span class="is-block has-text-weight-semibold has-background-white-bis has-text-grey-darker is-absolute" style={{right: '-0.7rem', bottom: '0', fontSize: '10px', width:'24px', height:'24px', borderRadius: '50%'}}>
                                         <span class="is-absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>2</span>
                                       </span>
                                     </div>
                                   </div>
                                   <div class="column py-0">
                                     <h5 class="mb-4 title is-size-5 has-text-grey-darker has-text-weight-medium" style={{textDecoration:'underline'}}>Start live coding </h5>
                                     <p class="has-text-grey-darker">Take practice live coding questions and track your performance</p>
                                   </div>
                                   <div class="is-hidden-mobile is-block-tablet has-background-light is-absolute" style={{borderRadius: '2px', width: '2px', height: '82px', left: '39px', top:'69px'}}></div>
                                 </div>
                                 <div class="columns has-mw-sm mx-auto">
                                   <div class="column is-narrow py-0 pr-7-tablet">
                                     <div class="is-relative mb-9 is-inline-block">
                                       <img src="acros-assets/icons/how-it-works/user-small.svg" alt=""/><span class="is-block has-text-weight-semibold has-background-white-bis has-text-grey-darker is-absolute" style={{right: '-0.7rem', bottom: '0', fontSize: '10px', width:'24px', height:'24px', borderRadius: '50%'}}>
                                         <span class="is-absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>3</span>
                                       </span>
                                     </div>
                                   </div>
                                   <div class="column py-0">
                                     <h5 class="mb-4 title is-size-5 has-text-grey-darker has-text-weight-medium" style={{textDecoration:'underline'}}>Get interview calls/offers</h5>
                                     <p class="has-text-grey-darker">Companies watch your live coding videos and call you directly to the next round</p>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                   </div>
               </section>
               <hr className="gray-hr"/>
               <section className="section py-4"><div className="container">
                   <div className="columns has-text-centered is-align-items-center">
                     <div className="is-hidden-mobile column is-1">

                     </div>
                     <div className="column">
                       <div>
                         <img className="mb-2" src="acros-assets/icons/testimonials/quote.svg" alt=""/><h3 className="title is-size-3 mb-8">Stint really works both as an interview prep tool and a way to stand out among large pool of resumés &amp; get hired faster. Truly recommend it!</h3>
                         <div>
                           <img src="https://api.uifaces.co/our-content/donated/u4HmMtIQ.jpg" alt="" style={{width: '48px', height: '48px', borderRadius: '50%'}}/><div>
                             <h6 className="title is-size-6 has-leading-3 has-text-weight-medium mb-0">Harish Dhami</h6>
                             <small className="has-text-grey-light">Software Developer (SDE-II), IFlex Systems</small>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="is-hidden-mobile column is-1">

                     </div>
                   </div>
                   <div className="is-flex is-justify-content-space-between is-hidden-tablet">

                   </div>
                 </div>
               </section>
               <hr className="gray-hr" />
               <section className="section py-4" id="practice"><div className="container">
                   <div className="columns is-align-items-center">
                     <div className="column mb-10 mb-0-tablet">
                       <small className="is-block has-text-weight-semibold is-uppercase mb-2">
                         <span>TRY it</span>
                         <span className="has-text-primary">NOW</span>
                       </small>
                       <h2 className="title has-mw-lg" style={{fontFamily: '\'Lexend Deca\', sans-serif',fontWeight: '200'}}>Practice makes you perfect!</h2>
                       <p className="mb-12 subtitle has-mw-md">The best part about Stint is it highlights your strenghts and areas of improvement. And to top it, it helps you get noticed by top-tier companies and shortens further  interview rounds.</p>
                       <div className="buttons"><a className="button is-primary" href="/live-code">Try it Free</a></div>
                     </div>
                     <div className="column">
                       <img className="image mx-auto mr-0-tablet" src="acros-assets/images/headers/header-7-meditation.png" alt=""/></div>
                   </div>
                 </div>
               </section>
             </React.Fragment>);
}
export default Home;
