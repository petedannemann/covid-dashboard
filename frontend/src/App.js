import React, { Component } from 'react';

import axios from 'axios';

import Indicator from './components/Indicator';

import './App.css';

const BASE_API_URL = 'http://localhost:3000';
const CASE_COUNT_URL = BASE_API_URL + '/case-count';
const DEATH_COUNT_URL = BASE_API_URL + '/death-count';

class App extends Component {
  state = {
    caseCount: null,
    deathCount: null,
    isLoading: true,
  };

  fetchCaseCount = () => {
    axios.get(CASE_COUNT_URL)
      .then(response => {
        this.setState(
          {
            caseCount: response.data.body.case_count,
            isLoading: false,
          });
      })
      .catch(error => console.log(error));
  };

  fetchDeathCount = () => {
    axios.get(DEATH_COUNT_URL)
      .then(response => {
        this.setState(
          {
            deathCount: response.data.body.death_count,
            isLoading: false,
          });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchCaseCount();
    this.fetchDeathCount();
  }
  
  render() {
    return (
      <div className="App">
        {this.state.isLoading}
        <Indicator number={this.state.caseCount} text={"Total Cases"}/>
        <Indicator number={this.state.deathCount} text={"Total Deaths"}/>
      </div>
    );
  }
}

export default App;
