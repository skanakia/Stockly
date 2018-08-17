import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API from '../../utils/API'
import moment from 'moment'
const LineChart = require("react-chartjs").Line;

// import './Home.css'

class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            email: props.email,
            compList: [],
            company: '',
            symbol: '',
            chartData: {},
            chartOptions: {options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'day'
                        }
                    }]
                }
            }}
        }



        this.getStockPricesAndPlot = this.getStockPricesAndPlot.bind(this);
        this.symbolLookup = this.symbolLookup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.discardStockInfo = this.discardStockInfo.bind(this);
        this.addToPortfolio = this.addToPortfolio.bind(this);

    }


    getStockPricesAndPlot() {
        API.getStockPrices(this.state.email, this.state.symbol).then(response => {
            let dates = []
            let prices = []
            console.log(response);
            console.log(response.data);
            for (let i=0; i < response.data.length; i++) {
                dates.unshift(response.data[i].date);
                prices.unshift(response.data[i].close);
            }
            

            this.setState({chartData: {labels: dates, data: prices}})
        });
    }

    discardStockInfo() {
        API.deleteStockPrices(this.state.email, this.state.symbol).then(res => {
            console.log(res);
        })
    }

    addToPortfolio() {
        axios.post("/api/stock/companyList", { symbol: this.state.symbol, email: this.state.email }).then(response => {
            console.log(response);
        });
    }

    symbolLookup() {
        let compArr = this.state.company.split(' ');
        let compConcat = "";
        for (let i = 0; i < compArr.length; i++) {
            if (i === 0) {
                compConcat += compArr[i];
            } else {
                compConcat += "+" + compArr[i]
            }
        }
        let compSymb;
        let userEmail = this.state.email
        axios.get("https://sandbox.tradier.com/v1/markets/search?q=" + compConcat, { headers: { 'Authorization': 'Bearer qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7', 'Accept': 'application/json' } }).then(response => {
            console.log(response.data);
            const compInfo = response.data.securities.security[0].symbol || response.data.securities.security.symbol;
            console.log(compInfo)
            this.setState({ symbol: compInfo });
            compSymb = compInfo
        }).then(function () {
            axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + compSymb + "&outputsize=compact&apikey=POTSVIBL1MZ1SJIO").then(output => {
                const parsedOutput = output.data
                var results = parsedOutput['Time Series (Daily)'];
                for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        const day = moment(key).format("MMM DD YYYY");

                        const symbol = compSymb;
                        const close = results[key]["4. close"]
                        const open = results[key]["1. open"]
                        const high = results[key]["2. high"]
                        const low = results[key]["3. low"]
                        const volume = results[key]["5. volume"]
                        API.saveStockPrice({ email: userEmail, symbol: symbol, date: day, open: open, high: high, low: low, close: close, volume: volume })
                    }
                }
            });
        });

        axios.get.bind(this);
        // axios.get("https://api.iextrading.com/1.0/stock/" + this.state.symbol + "/stats").then()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        console.log('Company Lookup, name: ')
        console.log(this.state.company)
        event.preventDefault()

        this.symbolLookup();
        this.getStockPricesAndPlot();

    }






    render() {
        return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div class="card">
                        <h5 class="card-header">Lookup Company Stock</h5>
                        <div class="card-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-1 col-ml-auto">
                                        <label className="form-label" htmlFor="username">Username</label>
                                    </div>
                                    <div className="col-3 col-mr-auto">
                                        <input className="form-input"
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Company Name..."
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </form>
                            <a onClick={this.handleSubmit} class="lookup-button btn btn-primary">Get Company Info</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div class="col-8">
                    <div id="chart">
                        <LineChart data={this.state.chartData} options={this.state.chartOptions} redraw width="600" height="500"/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row" id="stock-info">

                    </div>
                    <div className="row" id="add-discard-btns">
                        <div className="col-12">
                            <button onClick={this.addToPortfolio} type="button" className="add-button btn btn-outline-success">Add to Portfolio</button>
                            <button onCLick={this.discardStockInfo} type="button" className="discard-button btn btn-outline-danger">Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default Home