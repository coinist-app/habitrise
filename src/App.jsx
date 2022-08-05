import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'

import NavBar from './components/NavBar'
import RecruiterNavBar from './components/recruiter/recruiter-nav-bar'
import Footer from './components/Footer'

import home from './components/home'
import portfolio from './components/portfolio'
import detail from './components/detail'
import about from './components/about'
import assessmentProfile from './components/assessment/profile'
import assessmentEngine from './components/assessment/engine'
import assessmentSessionViewer from './components/assessment/viewer'
import doneView from './components/assessment/done'

// Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>

        <Switch>
        <Route
            path="/"
            render={({ match: { url } }) => (
              <>
              <NavBar />
                <Route path={`${url}/`} component={home} exact />
                <Route path={`${url}/detail`} component={detail} />
                <Route path={`${url}/portfolio`} component={portfolio} />
              </>
            )}
          />
          <Redirect exact path = "/" to = "/home" />
          <Route
              path="/assessment"
              render={({ match: { url } }) => (
                <>
                  <NavBar showLinks={false} />
                  <Route path={`${url}/`} component={assessmentProfile} exact />
                  <Route path={`${url}/start`} component={assessmentEngine} />
                  <Route path={`${url}/viewer`} component={assessmentSessionViewer} />
                  <Route path={`${url}/done`} component={doneView} />
                </>
              )}
            />
          <Route
              path="/recruiter"
              render={({ match: { url } }) => (
                <>
                  <RecruiterNavBar />
                  <Route path={`${url}/`} component={home} exact />
                  <Route path={`${url}/portfolio`} component={detail} />
                  <Route path={`${url}/detail`} component={portfolio} />
                </>
              )}
            />
        </Switch>
        <Footer />
      </React.Fragment>

    )
  }
}

export default App
