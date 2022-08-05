import React from "react";
import {useState, useEffect, useRef} from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useSpeechSynthesis } from 'react-speech-kit';
import CONSTANTS from "../../../constants";
import "./engine.module.css";
import Timer from '../../core/timer';

const AssessmentEngine = ({}) => {

const LANG_ID_JAVA = sessionStorage.getItem('editorLangId');
const speechQuestionTitle = useRef(null);

const monaco = useMonaco();
const [input, setInput] = useState({});
const [lang, setLang] = useState("");
const [questionTitle, setQuestionTitle] = useState("");
const [questionDescription, setQuestionDescription] = useState("");
const [langId, setLangId] = useState(0);
const [questionId, setQuestionId] = useState(0);
const [userInput, setUserInput] = useState({});
const [output, setOutput] = useState("Running...");
const [defaultCode, setDefaultCode] = useState(sessionStorage.getItem('defaultCode'));
const [showOutput, setShowOutput] = useState(false);
const [timeRemaining, setTimeRemaining] = useState(0);
const [lastOutput, setLastOutput] = useState("");
const [resultCriteria, setResultCriteria] = useState("");
const [syntacticalErrors, setSyntacticalErrors] = useState(0);
const [attemptedQuestionId, setAttemptedQuestionId] = useState(0);
const [isLastQuestion, setIsLastQuestion] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isVoiceActive, setIsVoiceActive] = useState(false);
const [isShouldExplain, setIsShouldExplain] = useState(false);
const [explainLabel, setExplainLabel] = useState("Explain your approach");

const prompt_run_error = '0d79dc22-de64-4f90-86da-3cd5a297fe5c';
const prompt_explain = '5ce4a72e-9736-46f2-9ed3-1e25c338ac78';
const prompt_run_success = 'a8e8fb65-f298-4012-9b42-d4b165b8b197';
const prompt_code = 'a27e8bea-185a-4598-ae9d-9ce1412a2bcd';

const onSpeechEnd = () => {
   console.log('on end');
  setIsVoiceActive(false);
};

const { speak, voices } = useSpeechSynthesis({onEnd: onSpeechEnd,});

const handleEditorChange = (value, event) => {
    setInput(value);
    localStorage.setItem('input', value);
    setShowOutput(false);
};

const invokeAPI = async () => {
    setOutput('Creating Submission ...');
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "a1504d0aebmsha2c15d90ecffa8dp117081jsn36e10aaf0ea7", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: input,
          stdin: null,
          language_id: langId,
        }),
      }
    );
    setOutput("Submission Created ...\n");
    const jsonResponse = await response.json();
    if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
              }

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      setOutput(`Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`);
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "a1504d0aebmsha2c15d90ecffa8dp117081jsn36e10aaf0ea7", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      console.log('--output--', output);
      setLastOutput(output);
      setOutput(`Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`);
      sayExecutionSuccess();
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      setOutput(`\n Error :${error}`);
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      let errCount = syntacticalErrors + 1;
      setSyntacticalErrors(errCount);
      console.log('syntacticalError', syntacticalErrors);
      setOutput(`\n Error :${compilation_error}`);
      sayCompilationFailure();
    }
}

const run = (e) => {
  setShowOutput(true);

  /* window.addEventListener('unhandledrejection', event => { console.log('E: ',event); });
  onunhandledrejection = event => {
    alert('There was an error submitting your code. Pls check your syntax & try again.')
    console.log('invoke API '); //window.location.reload();
  }; */

  invokeAPI();
}

const submit = (e) => {
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
               createSessionRecording(accessToken);
         });
       });
}

const createSessionRecording = (accessToken) => {
       let recording = JSON.stringify(JSON.parse(localStorage.getItem('recording')).events);
       recording = recording.replaceAll("'", "&quot");
       const rawResponse = fetch(CONSTANTS.ENDPOINT.POSTSESSIONRECORDING, {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
          "questionId": questionId,
          "sessionId": parseInt(sessionStorage.getItem('assessment_session_id'),10),
          "events":recording
        })}).then((res)=>{
          var res = res.json();
          res.then(function(r) {
            console.log('session recording submitted');
            captureResults(accessToken);
          });
       });
    }

const captureResults = (accessToken) => {
    let solutionCorrectnessValue = 0;
    let timeTakenMin = 0;
    const numSyntacticalErrors = 0;

    let minRem = document.getElementById('timeRem').innerHTML.replaceAll(' ','').split(':')[1];
    let secRem = document.getElementById('timeRem').innerHTML.replaceAll(' ','').replaceAll('s','').split(':')[2];

    const questionTimeLimitSecs = timeRemaining;
    const secondsRemaining = parseInt(minRem, 10) * 60 + parseInt(secRem, 10);
    console.log('--timeLimit--', questionTimeLimitSecs);
    console.log('--secondsElapsed--', secondsRemaining);
    timeTakenMin = (questionTimeLimitSecs - secondsRemaining)/60;
    console.log('--timeTakenMin--', timeTakenMin);

    if(lastOutput != "" && lastOutput.indexOf(resultCriteria) >= 0) {
      solutionCorrectnessValue = 100;
    }
    createEvaluation(accessToken, "solution_correctness", solutionCorrectnessValue);
    createEvaluation(accessToken, "time_taken_mins", timeTakenMin);
    createEvaluation(accessToken, "num_syntactical_errors", syntacticalErrors);
    sessionStorage.setItem("attemptedQuestionIds", sessionStorage.getItem('attemptedQuestionIds')+attemptedQuestionId+',');
    loadNextQuestion(solutionCorrectnessValue, timeTakenMin, syntacticalErrors);
}

const loadNextQuestion = (solutionCorrectnessValue, timeTakenMin, syntacticalErrors) => {
    var progressDifficultyLevel = false;
    var currentDifficultyLevel = sessionStorage.getItem("difficultyLevel");
    var nextDifficultyLevel = currentDifficultyLevel;

    //completed in half the time
    if (timeTakenMin*60  < timeRemaining/2
       && syntacticalErrors < 30) {
       progressDifficultyLevel = true;
    }
    if (progressDifficultyLevel) {
      if (currentDifficultyLevel == 'Beginner') {
        nextDifficultyLevel = "Intermediate";
      } else if (currentDifficultyLevel == 'Intermediate') {
        nextDifficultyLevel = "Advanced";
      }
      sessionStorage.setItem("difficultyLevel", nextDifficultyLevel);
      console.log('Difficulty level progressed!');
    }
    if (isLastQuestion) {
      window.location.href = '/assessment/done';
    } else {
      window.location.reload();
    }
}

const createEvaluation = (accessToken, metric, value) => {
  const rawResponse = fetch(CONSTANTS.ENDPOINT.POSTEVALUATION + accessToken, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
     "question_id": questionId,
     "assessment_session_id": parseInt(sessionStorage.getItem('assessment_session_id'),10),
     "metric": metric,
     "value": value
   })}).then((res)=>{
     var res = res.json();
     res.then(function(r) {
       console.log('Data: ', r.data);
     });
  });
}

const getTimeLimitInMilliSecs = (timeStr) => {
  timeStr = timeStr.replace(' min','');
  var timeInMins = parseInt(timeStr, 10);
  var timeInMilliSecs = timeInMins * 60 * 1000;
  return timeInMilliSecs;
}

const checkIsLastQuestion = (timeLimit) => {
  var timeLimitInMilliSecs = getTimeLimitInMilliSecs(timeLimit);
  var timeLimitInSecs = timeLimitInMilliSecs/1000;
  var timeLimitInMin = timeLimitInSecs/60;
  var activeQuestionDuration = timeLimitInMin;
  var totalDuration = parseInt(sessionStorage.getItem('totalDuration'), 10);
  if (sessionStorage.getItem('activeQuestionDuration') != null
      && sessionStorage.getItem('activeQuestionDuration') != "") {
      activeQuestionDuration = activeQuestionDuration + parseInt(sessionStorage.getItem('activeQuestionDuration'), 10);
  }
  sessionStorage.setItem('activeQuestionDuration', activeQuestionDuration);
  // make current question as last question if time remaining < 10 min
  if (totalDuration - activeQuestionDuration < 10) {
    setIsLastQuestion(true);
  }
}

const startQuestionTimer = (timeLimit) => {
  var timeLimitInMilliSecs = getTimeLimitInMilliSecs(timeLimit);
  var timeLimitInSecs = timeLimitInMilliSecs/1000;
  console.log('::timer::')
  setTimeRemaining(timeLimitInSecs);
  console.log('timeInMilliSecs: ', timeLimitInMilliSecs);
  setTimeout(function() {
    console.log('load next question');
  }, timeLimitInMilliSecs);
}

const getQuestion = (accessToken, skillId, competencyId, difficultyLevel) => {
       console.log('calling getQuestion...');
       const rawResponse = fetch(CONSTANTS.ENDPOINT.GETQUESTION + accessToken + '&filter={ "difficulty_level": { "_eq": "'+difficultyLevel+'" }, "skill_id": { "_eq": '+skillId+' }, "competency": { "_eq": '+competencyId+' }}').then((res)=>{
        var res = res.json();
          res.then(function(r) {
            var questionIndex = 0;
            var question = r.data;
            console.log('--question[questionIndex].id--', questionIndex);
            console.log('--question[]--', question.length);
            while(sessionStorage.getItem("attemptedQuestionIds") == null
              || (sessionStorage.getItem("attemptedQuestionIds") != ""
              && question.length > questionIndex
              && sessionStorage.getItem("attemptedQuestionIds").indexOf(question[questionIndex].id+',')==-1)) {
                console.log('--questionIndex', questionIndex);
                var title = question[questionIndex].title;
                var description = question[questionIndex].description;
                var codeSnippet = question[questionIndex].code_snippet;
                var timeLimit = question[questionIndex].time_limit;
                var questionSpeechFileId = question[questionIndex].speech;
                setQuestionId(question[questionIndex].id);
                console.log('codeSnippet: ', codeSnippet);
                console.log('timeLimit', timeLimit);
                startQuestionTimer(timeLimit);
                checkIsLastQuestion(timeLimit);
                setInput(codeSnippet);
                setQuestionTitle(title);
                setQuestionDescription(description);
                setResultCriteria(question[questionIndex].result_criteria);
                setAttemptedQuestionId(question[questionIndex].id);
                promptQuestion(accessToken, questionSpeechFileId);
                questionIndex++;
                break;
            }
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
                var difficultyLevel = sessionStorage.getItem("difficultyLevel"); //read from session storage
                var skillId = sessionStorage.getItem("primarySkill"); //read from session storage
                var competencyId = sessionStorage.getItem("competencyId"); //read from session storage
                getQuestion(accessToken, skillId, competencyId, difficultyLevel);

          });
        });
}
var events = [];
const startSessionRecord = () => {

  if(typeof window.rrweb != "undefined") {
    window.rrweb.record({
        emit(event) {
          // push event into the events array
          events.push(event);
        },
      });
      function save() {
        const body = JSON.stringify({ events });
        localStorage.setItem('recording', body);
        console.log('--events--', body);
      }
    const body = JSON.stringify({ events });
    localStorage.setItem('recording', body);
      setInterval(save, 15 * 1000);
  }
}

const promptQuestion = (accessToken, questionSpeechFileId) => {
  const audioTune = new Audio(CONSTANTS.ENDPOINT.GETSPEECHFILE.replace('<asset-id>',questionSpeechFileId) + accessToken);
  audioTune.load();audioTune.play();
  setTimeout(function(){setIsVoiceActive(true);},500);
  setTimeout(function(){setIsVoiceActive(false);promptExplain(accessToken);
    setTimeout(function(){ setIsShouldExplain(true); },10000);
  },11000);
}

const promptExplain = (accessToken) => {
  const audioTune = new Audio(CONSTANTS.ENDPOINT.GETSPEECHFILE.replace('<asset-id>',prompt_explain) + accessToken);
  audioTune.load();audioTune.play();
  setTimeout(function(){setIsVoiceActive(true);},1500);
  setTimeout(function(){setIsVoiceActive(false);},14000);
}

const promptToCode = () => {
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
         var accessToken = r.data.access_token;
         const audioTune = new Audio(CONSTANTS.ENDPOINT.GETSPEECHFILE.replace('<asset-id>',prompt_code) + accessToken);
         audioTune.load();audioTune.play();
         setTimeout(function(){setIsVoiceActive(true);},1500);
         setTimeout(function(){setIsVoiceActive(false);},6000);
     });
   });
}

const sayExecutionSuccess = () => {
  //speak({ text: "Great! Your code executed successfully.", voice: voices[0], rate: 1, pitch: 1.7 });
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
         var accessToken = r.data.access_token;
         const audioTune = new Audio(CONSTANTS.ENDPOINT.GETSPEECHFILE.replace('<asset-id>',prompt_run_success) + accessToken);
           audioTune.load();audioTune.play();
           setTimeout(function(){setIsVoiceActive(true);},700);
           setTimeout(function(){setIsVoiceActive(false);},4000);
     });
   });
}

const sayCompilationFailure = () => {
  //speak({ text: "There-are some errors. Please-check your code and try again.", voice: voices[0], rate: 1.1, pitch: 1.9 });
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
           var accessToken = r.data.access_token;
           const audioTune = new Audio(CONSTANTS.ENDPOINT.GETSPEECHFILE.replace('<asset-id>',prompt_run_error) + accessToken);
             audioTune.load();audioTune.play();
             setTimeout(function(){setIsVoiceActive(true);},700);
             setTimeout(function(){setIsVoiceActive(false);},4000);
       });
     });
}

const onExplainClick = () => {
  if (explainLabel == 'Explain your approach' || explainLabel == 'Explain again') {
    setExplainLabel("Listening... click to end recording");
  } else {
    setExplainLabel("Explain again");
    promptToCode();
  }
}

const startSpeech = ()=> {
  speak({ text: questionTitle, voice: voices[0], rate: 1, pitch: 1.7 });
  setIsVoiceActive(true);

  setTimeout(function() {
      speak({ text: "Use "+lang+" to write your code", voice: voices[0], rate: 1, pitch: 1.7 });
      setIsVoiceActive(true);
      /* setTimeout(function() {
            speak({ text: "You can think through an approach and once you're ready you can explain. This will be recorded and used during evaluation.", voice: voices[0], rate: 1, pitch: 1.7 });
            setIsVoiceActive(true);
            setTimeout(function() {
                        speak({ text: "Please go ahead once you're-ready.", voice: voices[0], rate: 1, pitch: 1.7 });
                        setIsVoiceActive(true);
                    }, 1500);
        }, 1500); */
  }, 1500);
}

const startVoiceBot = () => {

    const SW9 = new window.SiriWave({
    style: "ios9",
    container: document.getElementById("engine_container-9__1Cs0M"),
    autostart: true,
    });

    //ToDo: Uncomment to use speech synthesis API than FreeTTS
    //setTimeout("document.getElementById('speechQuestionTitle').click()",2000);

    //https://freetts.com/Home/PlayAudio?Language=en-IN&Voice=en-IN-Standard-C&TextMessage=Find%20the%20frequency%20of%20each%20number%20in%20the%20given%20arraylist.%20%3Cbreak%20time%3D%221s%22%20%2F%3E%20Print%20output%20to%20console%20in%20the%20format%20given.%20%3Cbreak%20time%3D%221.5s%22%20%2F%3EUse%20Java%20to%20write%20your%20code.&type=0

    /* const rawResponse = fetch('https://freetts.com/Home/PlayAudio?Language=en-IN&Voice=en-IN-Standard-C&TextMessage=Find%20the%20frequency%20of%20each%20number%20in%20the%20given%20arraylist.%20%3Cbreak%20time%3D%221s%22%20%2F%3E%20Print%20output%20to%20console%20in%20the%20format%20given.%20%3Cbreak%20time%3D%221.5s%22%20%2F%3EUse%20Java%20to%20write%20your%20code.&type=0',
    headers: {
        'mode':'cors'
      }).then((res)=>{
      var res = res.json();
        res.then(function(r) {
          var speechURL = r.id;
          console.log('Speech Response: ', r);
          console.log('Speech Data: ', r.data);
          console.log('Speech URL: ', speechURL);
          //setSpeechURL(speechURL);
        });
      }); */
}

useEffect(() => {
window.showVideo = true;

setLang(sessionStorage.getItem('editorLangName'));
setLangId(LANG_ID_JAVA);
localStorage.setItem('language_Id',LANG_ID_JAVA)
if (localStorage.getItem('input') != null) {
console.log('localStorage.getItem(input): ', localStorage.getItem('input'));
  setDefaultCode(localStorage.getItem('input'));
  setInput(localStorage.getItem('input'));
}


getQuestionToken();

startSessionRecord();

startVoiceBot();


//setOutput("Click the 'Save & Run' button to view your program's output.");
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, []);






return (
  <React.Fragment>

    <div>
      <div>
        <section class="section" style={{paddingTop: '24px', marginTop: '-6rem'}}>

          <div class="container">
          <button id="speechQuestionTitle" style={{display: 'none'}} onClick={() => startSpeech()}>Speak</button>
            <div>
              <div id="engine_container-9__1Cs0M" style={{display: isVoiceActive ? 'block' : 'none'}}></div>
              {isShouldExplain && <div class="engine_wrap__3VDEv">
                <button class="engine_button__2ohdd" onClick={()=>onExplainClick()}>{explainLabel}</button>
              </div>}
            </div>
            <div style={{float: 'right'}}>
              <span><b>Time left</b>&nbsp;&nbsp;</span><Timer seconds={timeRemaining} />
            </div>
            <div>
              <div style={{lineHeight: '28px'}}><b>Live coding question:</b>&nbsp;&nbsp;{questionTitle}&nbsp;&nbsp;{questionDescription}<br/><span></span><br/><span style={{color: '#05976e'}}>*Use {lang} to write your code.</span>
                <span style={{color:'#666',fontSize:'0.8rem'}}>(Please allow <b>camera access</b>. Your video is kept private.)</span>
              </div>
              <br/>
              <div id="container" class="engine_editor-container__2uqGs" style={{width: '100%',height: '350px'}}>
                <Editor
                      defaultLanguage={lang}
                      defaultValue={defaultCode}
                      onChange={handleEditorChange}
                    />
              </div>
              {showOutput && <div id="outputContainer" class="engine_editor-container__2uqGs" style={{width: '100%',height: '129px'}}>
                <textarea disabled value="output" width="300px" height="400px" className="engine_engine_output__dBs6o__2T5H9" value={output}/>
              </div>}



              <div class="buttons mb-20" style={{fontSize: '2rem',display: 'block',margin: '0 auto',left: '0',right: '0',textAlign: 'center', zIndex: '9'}}>
                <div className="buttons mb-20" style={{marginTop: '36px'}}>
                  <span className="button is-primary mr-4" onClick={()=>{run()}}>Save & Run</span>
                  {
                    !isLastQuestion ? <span className="button is-primary mr-4 engine_right-btn-span__3aObT" onClick={()=>{submit()}}>Submit & Load Next &gt;</span>
                    : <><span className="button is-primary mr-4 engine_right-btn-span__3aObT" onClick={()=>{submit()}}>Submit & Finish</span>
                    <div class="engine_bubble__3jzVX engine_bubble-left__2mlj5">This is the final question of your assessment.</div></>
                  }
                </div>
              </div>


            </div>


          </div>
        </section>
      </div>
      { isLoading && <div class="profile_spinner-container__3FkTD"><span class="profile_spinner__1u7yJ"></span></div> }
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
export default AssessmentEngine;




