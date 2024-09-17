import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/common/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProjectEditor from './pages/ProjectEditor'
// import ProjectPage from './pages/ProjectPage'

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
          <PrivateRoute path="/project/:id?" component={ProjectEditor} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}


export default App



// import ProjectPage from './pages/ProjectPage'

// function App() {
//   return (
//     <div className="App">
//       <ProjectPage />
//     </div>
//   )
// }

// export default App
