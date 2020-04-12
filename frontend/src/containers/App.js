import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCaseCountIfNeeded } from '../store/caseCount/actionCreators'
import { fetchDeathCountIfNeeded } from '../store/deathCount/actionCreators'
import Indicator from '../components/Indicator';

import './App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCaseCountIfNeeded())
    dispatch(fetchDeathCountIfNeeded())
  }
  
  render() {
    const { caseCount, deathCount } = this.props

    return (
      <div className="App">
        <h1>COVID-19 Dashboard</h1>
        <div id="indicator-container">
          <Indicator number={caseCount.number} text="Total Cases"/>
          <Indicator number={deathCount.number} text="Total Deaths"/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { caseCount, deathCount } = state || {
    caseCount: {
      isFetching: true,
      number: null
    },
    deathCount: {
      isFetching: true,
      number: null
    }
  }

  return {
    caseCount,
    deathCount
  }
}

export default connect(mapStateToProps)(App);
