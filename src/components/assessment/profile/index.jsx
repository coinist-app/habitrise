import React from "react";
import {useState, useEffect} from "react";
import StringCrypto from 'string-crypto';
import CONSTANTS from "../../../constants";
import styles from "./profile.module.css";

const AssessmentProfile = ({candidateName = '...'}) => {

  const [assessmentSession, setAssessmentSession] = useState({});
  const [candidate, setCandidate] = useState(candidateName);
  const [skills, setSkills] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [primarySkill, setPrimarySkill] = useState("");
  const [secondarySkill, setSecondarySkill] = useState("");
  const [tertiarySkill, setTertiarySkill] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const skillIdToEditorLangMap = {"1": 62, "2": 76, "5": 63}
  const skillIdToEditorLangNameMap = {"1": "java", "2": "cpp", "5": "javascript"}

  useEffect(() => {
      localStorage.clear(); sessionStorage.clear();
      let href = window.location.href;
      const {encryptString,decryptString} = new StringCrypto();
      let encrypted = href.substring(href.indexOf('uid=')+4,href.length);
      console.log('Encrypted String:', encrypted);
      console.log('Decrypted String:', decryptString(encrypted, 'n4whal'));

       var decrypted = decryptString(encrypted, 'n4whal');
       /* var str = encryptString('1+2022-04-27T10:30:00','n4whal');
       console.log('str: ', str); */
       var assessmentId = decrypted.split('+')[0];

      const rawResponse = fetch(CONSTANTS.ENDPOINT.DIRECTUSAUTH, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
        "email": "stint.assess@gmail.com",
        "password": "dstintapp1"
      })}).then((res)=>{
        var res = res.json();
        res.then(function(r) {
          console.log('Data: ', r.data);
          console.log('AccessToken: ', r.data.access_token);
              var accessToken = r.data.access_token;
              sessionStorage.setItem('assessment_session_id', assessmentId);
              sessionStorage.setItem('difficultyLevel', "Beginner");
              getCandidateAssessment(accessToken, assessmentId);
              createSessionRecording(accessToken);
        });
      });

    }, []);

    const createSessionRecording = (accessToken) => {
       let recording = '{}';
       const rawResponse = fetch(CONSTANTS.ENDPOINT.POSTSESSIONRECORDING, {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
          "questionId": 0,
          "sessionId": 0,
          "events":recording
        })}).then((res)=>{
          var res = res.json();
          res.then(function(r) {
            console.log('session recording submitted');
          });
       });
    }

    const getCandidateAssessment = (accessToken, assessmentId) => {
       const rawResponse = fetch(CONSTANTS.ENDPOINT.GETASSESSMENTSESSION + accessToken + '&filter={ "id": { "_eq": "'+assessmentId+'" }}').then((res)=>{
        var res = res.json();
          res.then(function(r) {
            var assessmentSession = r.data;
            var candidateId = assessmentSession[0].candidate_id;
            var pipelineId = assessmentSession[0].pipeline_id;
            var competencyId = assessmentSession[0].competency;
            var duration = assessmentSession[0].duration;
            sessionStorage.setItem('competencyId', competencyId);
            sessionStorage.setItem('totalDuration', duration);
            getCandidate(accessToken, candidateId);
            getJobSkills(accessToken, pipelineId);
          });
        });
    }

    const getCandidate = (accessToken, candidateId) => {
           const rawResponse = fetch(CONSTANTS.ENDPOINT.GETCANDIDATE + accessToken + '&filter={ "id": { "_eq": "'+candidateId+'" }}').then((res)=>{
            var res = res.json();
              res.then(function(r) {
                var candidate = r.data;
                console.log('Candidate: ', candidate[0].full_name);
                setCandidate(candidate[0].full_name + '!');
                setCandidateId(candidate[0].id);
              });
            });
        }

    const getJobSkills = (accessToken, pipelineId) => {
               const rawResponse = fetch(CONSTANTS.ENDPOINT.GETJOBSKILLS + accessToken + '&filter={ "pipeline_id": { "_eq": "'+pipelineId+'" }}').then((res)=>{
                var res = res.json();
                  res.then(function(r) {
                    var jobsSkills = r.data;
                    console.log('JobsSkills: ', jobsSkills);
                    jobsSkills.unshift({"skill_name":"Select Skill","skill_id":0})
                    setSkills(jobsSkills);
                  });
                });
            }

    const createCandidateProfile = () => {
       setIsLoading(true);
       const rawResponse = fetch(CONSTANTS.ENDPOINT.DIRECTUSAUTH, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
               "email": "stint.assess@gmail.com",
               "password": "dstintapp1"
             })}).then((res)=>{
               var res = res.json();
               res.then(function(r) {
                 console.log('Data: ', r.data);
                 console.log('AccessToken: ', r.data.access_token);
                     var accessToken = r.data.access_token;
                     createProfile(accessToken);
                     createCandidateSkill(accessToken, 1, primarySkill);
                     createCandidateSkill(accessToken, 2, secondarySkill);
                     createCandidateSkill(accessToken, 3, tertiarySkill);
               });
             });
    }

    const createProfile = (accessToken) => {
       const rawResponse = fetch(CONSTANTS.ENDPOINT.POSTCANDIDATEPROFILE + accessToken, {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
          "candidate_id": candidateId,
          "mobile_number": mobileNumber,
          "status": "published"
        })}).then((res)=>{
          var res = res.json();
          res.then(function(r) {
            console.log('Data: ', r.data);
          });
       });
    }

    const getQuestion = (accessToken, skillId, competencyId) => {
           console.log('calling getQuestion...');
           const rawResponse = fetch(CONSTANTS.ENDPOINT.GETQUESTION + accessToken + '&filter={ "difficulty_level": { "_eq": "Beginner" }, "skill_id": { "_eq": '+skillId+' }, "competency": { "_eq": '+competencyId+' }}').then((res)=>{
            var res = res.json();
              res.then(function(r) {
                var question = r.data;
                var title = question[0].title;
                var description = question[0].description;
                var codeSnippet = question[0].code_snippet;
                var timeLimit = question[0].time_limit;
                sessionStorage.setItem('defaultCode', codeSnippet);
                setIsLoading(false);
                window.location.href = '/assessment/start';
              });
            });
        }

    const getQuestionToken = () => {
      const rawResponse = fetch(CONSTANTS.ENDPOINT.DIRECTUSAUTH, {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
              "email": "stint.assess@gmail.com",
              "password": "dstintapp1"
            })}).then((res)=>{
              var res = res.json();
              res.then(function(r) {
                console.log('Data: ', r.data);
                console.log('AccessToken1: ', r.data.access_token);
                    var accessToken = r.data.access_token;
                    var difficultyLevel = "Beginner"; //read from session storage
                    var skillId = sessionStorage.getItem("primarySkill"); //read from session storage
                    var competencyId = sessionStorage.getItem("competencyId"); //read from session storage
                    getQuestion(accessToken, skillId, competencyId);

              });
            });
    }

    const createCandidateSkill = (accessToken, skillPriority, value) => {
    console.log('--primarySkill--', primarySkill);
       if (primarySkill == "") { setPrimarySkill(skills[0].skill_id); }
       if (secondarySkill == "") { setSecondarySkill(skills[0].skill_id); }
       if (tertiarySkill == "") { setTertiarySkill(skills[0].skill_id); }
       var skillId;
       if (skillPriority == 1) { skillId = primarySkill; sessionStorage.setItem('primarySkill', primarySkill); sessionStorage.setItem('editorLangId',skillIdToEditorLangMap[primarySkill]);sessionStorage.setItem('editorLangName',skillIdToEditorLangNameMap[primarySkill]); }
       else if (skillPriority == 2) { skillId = secondarySkill; sessionStorage.setItem('secondarySkill', secondarySkill);  }
       else { skillId = tertiarySkill; sessionStorage.setItem('tertiarySkill', tertiarySkill); }
       const rawResponse = fetch(CONSTANTS.ENDPOINT.POSTCANDIDATESKILL + accessToken, {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
          "candidate_id": candidateId,
          "candidate_skill": skillId,
          "priority": skillPriority,
          "status": "published",
        })}).then((res)=>{
          var res = res.json();
          res.then(function(r) {
            console.log('Data: ', r.data);
          });
       });

       if(primarySkill != "" && secondarySkill != "" && tertiarySkill != "") {
         getQuestionToken();
       }
    }


  return (
  <React.Fragment>
               <div style={{marginTop: '-80px'}}>

                 <div>
                   <section className="section py-0" style={{background: 'linear-gradient(0deg, rgba(238,247,250,1) 0%, rgba(255,255,255,1) 100%)',marginBottom: '20px'}}>
                     <div className="container">

                       <div className="columns is-align-items-center">
                         <div className="column pt-8-tablet mb-12 mb-0-tablet" style={{marginBottom: '-120px !important'}}>

                           <h2 className="has-text-grey-darker has-mw-xl title .is-size-2" style={{fontFamily:'\'Lexend Deca\', sans-serif', fontWeight: '200', marginBottom: '20px'}}>Welcome {candidate}</h2>
                           <div className="m-primary-img"><img className="image mx-auto" src="acros-assets/images/call-to-action/cta-12-work.png" alt=""/></div>
                           <p className="profile_subtitle__1WSNP has-mw-md has-text-grey-darker mb-10 m-primary-desc" style={{display: 'inline'}}>Please share your basic details to start the assessment. The interview timer will start once you click the <b>Save & start assessment</b> button.</p>

                           <div className="profile_profile-form__1qgae" style={{marginTop: '48px'}}>
                            <span className="label">Mobile Number</span>
                            <input type="text" class="profile_txt__2e5NB" placeholder="Your 10 digit mobile number" onChange={(e)=>{setMobileNumber(e.target.value)}} style={{width: '320px'}} />
                           </div>
                           <div className="profile_profile-form__1qgae">
                             <span className="label">Primary Skill</span>
                             <select name="primarySkill" id="primarySkill" onChange={(e)=>{setPrimarySkill(e.target.value)}}>
                                {skills.map((skill, index) => (
                                  <option value={skill.skill_id} key={skill.skill_id}>{skill.skill_name}</option>
                                ))}
                             </select>
                            </div>
                            <div className="profile_profile-form__1qgae">
                            <span className="label">Secondary Skill</span>
                            <select name="primarySkill" id="secondarySkill" onChange={(e)=>{setSecondarySkill(e.target.value)}}>
                               {skills.map((skill, index) => (
                                 <option value={skill.skill_id} key={skill.skill_id}>{skill.skill_name}</option>
                               ))}
                             </select>
                           </div>
                           <div className="profile_profile-form__1qgae">
                             <span className="label">Tertiary Skill</span>
                             <select name="primarySkill" id="tertiarySkill" onChange={(e)=>{setTertiarySkill(e.target.value)}}>
                                {skills.map((skill, index) => (
                                   <option value={skill.skill_id} key={skill.skill_id}>{skill.skill_name}</option>
                                 ))}
                              </select>
                            </div>
                           <div className="buttons mb-20" style={{marginTop: '36px'}}>
                            {!isLoading ? <span className="button is-primary mr-4" onClick={()=>{createCandidateProfile()}}>Save & Start Assessment</span> : <span className="button is-primary mr-4"><span style={{visibility: 'hidden'}}>Save & Start Assessment</span><span class="profile_spinner__1u7yJ"></span></span>}
                           </div>

                         </div>
                         <div className="column" style={{padding: '0'}}>
                           <img className="image mx-auto l-primary-img" src="acros-assets/images/applications/code.png" alt="" style={{marginTop: '0px', width: '400px'}}/>
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
                         <img src="acros-assets/logo/logo.png" width="auto" style={{maxHeight:'initial',width:'100px'}} alt=""/>
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


             </React.Fragment>);
}
export default AssessmentProfile;
