import React, { Component } from "react";
import { connect } from "react-redux";

import { Bar } from "@nivo/bar";

import { fetchCaseCountIfNeeded } from "../store/caseCount/actionCreators";
import { fetchCasesByStateIfNeeded } from "../store/casesByState/actionCreators";
import { fetchDeathCountIfNeeded } from "../store/deathCount/actionCreators";
import { fetchDeathsByStateIfNeeded } from "../store/deathsByState/actionCreators";

import Indicator from "../components/Indicator";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCaseCountIfNeeded());
    dispatch(fetchDeathCountIfNeeded());
    dispatch(fetchCasesByStateIfNeeded());
    dispatch(fetchDeathsByStateIfNeeded());
  }

  totalCasesIndicator() {
    return <Indicator number={this.props.caseCount.number} text="Total Cases" />;
  }

  totalDeathsIndicator() {
    return <Indicator number={this.props.deathCount.number} text="Total Deaths" />;
  }

  casesByStateBarChart() {
    return (
      <div style={{display: "inline-block"}}>
        <h2>Cases By State</h2>
        <Bar
          data={this.props.casesByState.data}
          keys={["number_of_cases"]}
          indexBy="state"
          height={800}
          width={500}
          margin={{ top: 50, right: 10, bottom: 100, left: 150 }}
          padding={0.3}
          layout="horizontal"
          enableGridX={true}
          enableGridY={false}
          enableLabel={false}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisBottom={{
            tickRotation: -90,
            legend: "Number of Cases",
            legendPosition: "middle",
            legendOffset: 75,
          }}
          tooltip={function (data) {
            return (
              <p>
                {data.value} Cases Reported in {data.indexValue}
              </p>
            );
          }}
        />
      </div>
    );
  }

  deathsByStateBarChart() {
    console.log(this.props.deathsByState)
    return (
      <div style={{display: "inline-block"}}>
        <h2>Deaths By State</h2>
        <Bar
          data={this.props.deathsByState.data}
          keys={["number_of_deaths"]}
          indexBy="state"
          height={800}
          width={500}
          margin={{ top: 50, right: 10, bottom: 100, left: 150 }}
          padding={0.3}
          layout="horizontal"
          enableGridX={true}
          enableGridY={false}
          enableLabel={false}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisBottom={{
            tickRotation: -90,
            legend: "Number of Deaths",
            legendPosition: "middle",
            legendOffset: 75,
          }}
          tooltip={function (data) {
            return (
              <p>
                {data.value} Deaths Reported in {data.indexValue}
              </p>
            );
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>COVID-19 Dashboard</h1>
        <div id="indicator-container">
          {this.totalCasesIndicator()}
      {this.totalDeathsIndicator()}
              </div>
      <div id="bar-chart-container">
      {this.casesByStateBarChart()}
      {this.deathsByStateBarChart()}
</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { caseCount, casesByState, deathCount, deathsByState } = state;

  return {
    caseCount,
    casesByState,
    deathCount,
    deathsByState,
  };
}

export default connect(mapStateToProps)(App);
