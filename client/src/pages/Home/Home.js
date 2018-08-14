import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API from '../../utils/API'
import './Login.css'

var image = {
    height: 420
}

class LoginForm extends Component {
    constructor(props) {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    async getData() {
        const userName = this.state.username
        const email = this.state.email
        const passWord = this.state.password


        axios.post("/api/user/login", { username: userName, password: passWord, email: email }).then(response => {
            console.log(response.data);
            if (response.status === 200) {
                console.log(response.data);
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                });
                this.setState({
                    redirectTo: '/'
                });
                console.log(this.state);
            }
        }).catch(error => {
            console.log('login error:')
            console.log(error);
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        // API.login(this.state)
        const userName = this.state.username
        const passWord = this.state.password
        const email = this.state.email

        axios.post("/api/user/login", { username: userName, password: passWord, email: email }).then(response => {
            // console.log(response.data);
            if (response.status === 200) {
                console.log(response.data);
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                });
                this.setState({
                    redirectTo: '/'
                });
                console.log(this.state);
            }
        }).catch(error => {
            console.log('login error:')
            console.log(error);
        });
    }

    // this.getData();

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Music-Alley</h1>
                            <br />
                            <h3>Login</h3>
                            <br />
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-1 col-ml-auto">
                                        <label className="form-label" htmlFor="username">Username</label>
                                    </div>
                                    <div className="col-3 col-mr-auto">
                                        <input className="form-input"
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-1 col-ml-auto">
                                        <label className="form-label" htmlFor="email">email</label>
                                    </div>
                                    <div className="col-3 col-mr-auto">
                                        <input className="form-input"
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-1 col-ml-auto">
                                        <label className="form-label" htmlFor="password">Password: </label>
                                    </div>
                                    <div className="col-3 col-mr-auto">
                                        <input className="form-input"
                                            placeholder="password"
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="col-7"></div>
                                    <button
                                        className="btn btn-warning col-1 col-mr-auto"

                                        onClick={this.handleSubmit}
                                        type="submit"><span>Login</span></button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <img style={image} src='./images/rockout.jpg' />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default LoginForm