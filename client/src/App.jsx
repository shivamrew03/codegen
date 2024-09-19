import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProjectEditor from './pages/ProjectEditor'
import CreateProject from './components/CreateProject'
import ProjectPage from './pages/ProjectPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/project/new" component={CreateProject} />
          <PrivateRoute path="/project/:id/edit" component={ProjectEditor} />
          <PrivateRoute path="/project/:id" component={ProjectPage} />
          {/* <Route path="/projecting" component={ProjectPage} /> */}
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App