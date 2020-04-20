import React, { Component } from "react";
import { connect } from "react-redux";

import { Bar } from "@nivo/bar";

import { fetchCaseCountIfNeeded } from "../store/caseCount/actionCreators";
import { fetchCasesByStateIfNeeded } from "../store/casesByState/actionCreators";
import { fetchDeathCountIfNeeded } from "../store/deathCount/actionCreators";

import Indicator from "../components/Indicator";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCaseCountIfNeeded());
    dispatch(fetchDeathCountIfNeeded());
    dispatch(fetchCasesByStateIfNeeded());
  }

  totalCasesIndicator() {
    return <Indicator number={this.props.caseCount.number} text="Total Cases" />
  }

  totalDeathsIndicator() {
    return <Indicator number={this.props.deathCount.number} text="Total Deaths" />
  }

  casesByStateBarChart() {
    return (
    <div>
        <Bar
      data={this.props.casesByState.data}
      keys={["number_of_cases"]}
      indexBy="state"
      height={300}
      width={800}
      colors={{ scheme: 'nivo' }}
        />
    </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>COVID-19 Dashboard</h1>
        <div id="indicator-container">
          {this.totalCasesIndicator()}
          {this.totalDeathsIndicator()}
          {this.casesByStateBarChart()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { caseCount, casesByState, deathCount } = state

  return {
    caseCount,
    casesByState,
    deathCount,
  };
}

export default connect(mapStateToProps)(App);
