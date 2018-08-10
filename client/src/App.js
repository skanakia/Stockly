import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// components
import Signup from './pages/Signup'
import LoginForm from './pages/Login'
import Navbar from './components/navbar'
import Home from './pages/Home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/api/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {

    const loginStat = this.state.loggedIn

    return (
      <div>
        {/* Routes to different components */}
        <Router>
          <div>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
            <Route
              exact path="/"
              // component={Home}
            render={() =>
              loginStat ?  (<Route component={Home} />) :  (<Route component= {LoginForm} /> ) }
            />
            <Route
              path="/login"
              render={props => <LoginForm updateUser={this.updateUser} loggedIn= {this.state.loggedIn} />}
            />

            <Route
              path="/signup"
              component={Signup}
            />
          </div>
          </Router>
      </div>
    );
  }
}

export default App;