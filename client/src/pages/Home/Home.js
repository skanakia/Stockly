import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API from '../../utils/API'
import moment from 'moment'
// import './Home.css'

class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            email: props.email,
            compList: [],
            company: '',
            symbol: ''
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
            
            response.forEach(element => {
                dates.unshift(element.date);
                prices.unshift(element.close)
            });

            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: prices,
                            borderColor: 'rgba(30, 60, 90, 1.0)'
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'day'
                            }
                        }]
                    }


                }
            });
        })
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
        compArr = this.state.company.split(' ');
        let compConcat = "";
        for (let i = 0; i < compArr.length; i++) {
            if (i === 0) {
                compConcat += compArr[i];
            } else {
                compConcat += "+" + compArr[i]
            }
        }

        axios.get("https://sandbox.tradier.com/v1/markets/search?q=" + compConcat, { headers: { 'Authorization': 'Bearer qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7', 'Accept': 'application/json' } }).then(response => {
            const compInfo = response.securities.security[0].symbol || response.securities.security.symbol;
            this.setState({ symbol: compInfo });
        }).then(function () {
            axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.state.symbol + "&outputsize=compact&apikey=POTSVIBL1MZ1SJIO").then(output => {
                const parsedOutput = JSON.parse(output)
                var results = parsedBody['Time Series (Daily)'];
                for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        const day = moment(key).format("MMM DD YYYY");

                        const symbol = this.state.symbol
                        const close = results[key]["4. close"]
                        const open = results[key]["1. open"]
                        const high = results[key]["2. high"]
                        const low = results[key]["3. low"]
                        const volume = results[key]["5. volume"]
                        API.saveStockPrice({ email: this.state.email, symbol: symbol, date: day, open: open, high: high, low: low, close: close, volume: volume })
                    }
                }
            });
        });

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

    }






    render() {
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
                        <canvas id="myChart" width="600px" height="600px"></canvas>
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
    }
}

export default Home