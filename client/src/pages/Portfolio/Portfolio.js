import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API from '../../utils/API'
import moment from 'moment'
import Results from '../../components/Results'
// import './Home.css'

class Portfolio extends Component {
    constructor(props) {
        super()
        this.state = {
            email: props.email,
            compList: [],
            company: '',
            symbol: ''
        }
        this.getCompList = this.getCompList.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    getCompList() {

        axios.get("/api/stock/companyList").then(companies => {
            this.setState({
                compList: companies
            })
        });

    }


    render() {
        <div className="container">
            <div className="row">
                <div class="col-8">
                    <div id="chart">
                        <canvas id="myChart" height="700px"></canvas>
                    </div>
                </div>
                <div className="col-4">
                    <div id="stock-info">
                        {this.state.compList.map(element => (
                             <ResultCard
                             key={element._id}
                             email={element.user_email}
                             company={element.company_name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Portfolio