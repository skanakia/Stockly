
import React, { Component } from 'react'
import axios from 'axios'
import API from '../../utils/API'
import './Signup.css'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
            // confirmPassword: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        console.log('sign-up handleSubmit, username: ')
        console.log(this.state.username)
        event.preventDefault()

        API.createNewUser(this.state).then(res => {
            if (res.status === 200) {
                window.location = '/login';
            }
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="SignupForm">
                            <h3>Sign up</h3>
                            <br></br>
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
                                        <label className="form-label" htmlFor="email">Email</label>
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
                                        className="btn btn-primary col-1 col-mr-auto"
                                        onClick={this.handleSubmit}
                                        type="submit"
                                    >Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup