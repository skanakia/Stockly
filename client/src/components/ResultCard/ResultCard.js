import React, { Component } from 'react'
// import logo from '../logo.svg';
// import '../App.css';
import API from '../../utils/API'
import axios from 'axios'
// import "./Navbar.css"

class ResultCard extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.key,
            company: props.company,
            email: props.email,
            active: false
        }
        this.changeActiveStock = this.changeActiveStock.bind(this)
        this.removeStock = this.removeStock.bind(this);
        this.predict = this.predict.bind(this);

    }

    changeActiveStock() {
        this.props.activeStock = this.state.company;
        if (this.state.active === false) {
            this.setState({ active: true });
        } else {
            this.setState({ active: false });
        }
    }

    removeStock() {
        API.deleteCompany(this.state.company).then(res => {
            console.log(res);
        });

        API.deleteStockPrices(this.state.email, this.state.company).then(res => {
            console.log(res);
        });

    }


    predict() {
        console.log("Function Not Active Yet!!!")
    }

    render() {
        return (
            <div>
                {this.state.active ? (

                    <div className="activeStock" onClick={this.changeActiveStock}>
                        <div class="card">
                            <h5 class="card-header">{this.state.company}</h5>
                            <div class="card-body">
                                <h6 class="card-title">Predictive Analysis</h6>
                                <p class="card-text">Click the button below to predict the next closing price data point using our proprietary software</p>
                                <a onClick={this.removeStock} href="/portfolio" class="btn btn-primary">Remove Stock</a>
                                <a onClick={this.predict} class="btn btn-primary">Predict</a>
                            </div>
                        </div>
                    </div>

                ) : (

                        <div className="inactiveStock" onClick={this.changeActiveStock}>
                            <div class="card">
                                <h5 class="card-header">{this.state.company}</h5>
                                <div class="card-body">
                                    <h6 class="card-title">Plot the Data</h6>
                                    <p class="card-text">Click here to see the trend of closing prices on the lefthand graph</p>
                                    <a onClick={this.removeStock} href="/portfolio" class="btn btn-primary">Go somewhere</a>
                                    <a onClick={this.predict} class="btn btn-primary">Predict</a>
                                </div>
                            </div>
                        </div>

                    )
                }

            </div>
        );

    }
}

export default ResultCard