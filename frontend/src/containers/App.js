import React, { Component } from "react";
import { connect } from "react-redux";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

import { fetchCasesAndDeathsIfNeeded } from "../store/casesAndDeaths/actionCreators";
import { caseCountSelector } from "../store/caseCount/selectors";

import Indicator from "../components/Indicator";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCasesAndDeathsIfNeeded());
  }

  totalCasesIndicator() {
    return <Indicator number={this.props.caseCount} text="Total Cases" />;
  }

  totalDeathsIndicator() {
    return <Indicator number={this.props.deathCount.number} text="Total Deaths" />;
  }

  casesByStateBarChart() {
    return (
      <div style={{ display: "inline-block", height: "800px", width: "50%" }}>
        <h2>Cases By State</h2>
        <ResponsiveBar
          data={this.props.casesByState.data}
          keys={["number_of_cases"]}
          indexBy="state"
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
          tooltip={(data) => {
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
    return (
      <div style={{ display: "inline-block", height: "800px", width: "50%" }}>
        <h2>Deaths By State</h2>
        <ResponsiveBar
          data={this.props.deathsByState.data}
          keys={["number_of_deaths"]}
          indexBy="state"
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
          tooltip={(data) => {
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

  casesOverTimeLineChart() {
    return (
      <div style={{ display: "inline-block", height: "800px", width: "50%" }}>
        <h2>New Cases Over Time</h2>
        <ResponsiveLine
          data={this.props.casesOverTime.data}
          margin={{ top: 50, right: 10, bottom: 100, left: 150 }}
          padding={0.3}
          axisBottom={{
            tickRotation: -90,
          }}
          axisLeft={{
            legend: "Number of New Cases",
            legendPosition: "middle",
            legendOffset: -75,
          }}
          useMesh={true}
        />
      </div>
    );
  }

  deathsOverTimeLineChart() {
    return (
      <div style={{ display: "inline-block", height: "800px", width: "50%" }}>
        <h2>New Deaths Over Time</h2>
        <ResponsiveLine
          data={this.props.deathsOverTime.data}
          margin={{ top: 50, right: 10, bottom: 100, left: 150 }}
          padding={0.3}
          axisBottom={{
            tickRotation: -90,
          }}
          axisLeft={{
            legend: "Number of New Deaths",
            legendPosition: "middle",
            legendOffset: -75,
          }}
          useMesh={true}
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
        <div id="line-chart-container">
          {this.casesOverTimeLineChart()}
          {this.deathsOverTimeLineChart()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const {
    casesByState,
    casesOverTime,
    deathCount,
    deathsByState,
    deathsOverTime,
  } = state;

  return {
    caseCount: caseCountSelector(state, props),
    casesByState,
    casesOverTime,
    deathCount,
    deathsByState,
    deathsOverTime,
  };
}

export default connect(mapStateToProps)(App);
