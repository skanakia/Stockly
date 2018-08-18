import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API from '../../utils/API'
import moment from 'moment'
import ResultCard from '../../components/ResultCard'
// import './Home.css'

class Portfolio extends Component {
    constructor(props) {
        super()
        this.state = {
            email: 'skanakia1@gmail.com',
            compList: [],
            company: '',
            symbol: ''
        }
        this.getCompList = this.getCompList.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    getCompList() {

        axios.get("/api/stock/companyList", {params: {user_email: this.state.email}}).then(companies => {
            console.log("_______________");
            console.log(companies);
            console.log(companies.data);
            
            this.setState({
                compList: companies.data
            })
        });

    }

    componentDidMount() {
        this.getCompList()
    }

    render() {
        const companylist = this.state.compList
        return (
        <div className="container">
            <div className="row">
                <div class="col-8">
                    <div id="chart">
                        <canvas id="myChart" height="700px"></canvas>
                    </div>
                </div>
                <div className="col-4">
                    <div id="stock-info">
                        {companylist.map(element => (
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
        )
    }
}

export default Portfolio