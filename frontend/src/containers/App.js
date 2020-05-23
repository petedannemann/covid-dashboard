import React, { Component } from "react";
import { connect } from "react-redux";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

import { fetchCasesAndDeathsIfNeeded } from "../store/casesAndDeaths/actionCreators";
import { selectStates } from "../store/states/actionCreators";

import casesByStateSelector from "../store/casesByState/selectors";
import caseCountSelector from "../store/caseCount/selectors";
import casesOverTimeSelector from "../store/casesOverTime/selectors";
import deathsByStateSelector from "../store/deathsByState/selectors";
import deathCountSelector from "../store/deathCount/selectors";
import deathsOverTimeSelector from "../store/deathsOverTime/selectors";
import statesSelector from "../store/states/selectors";

import Dropdown from "../components/Dropdown";
import Indicator from "../components/Indicator";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCasesAndDeathsIfNeeded());
  }

  onStateDropdownChange(e) {
    const options = e.target.options;
    const selected = [...options].filter((option) => option.selected);
    const selectedStates = {
      data: selected.map((option) => option.value),
    };

    this.props.dispatch(selectStates(selectedStates));
  }

  totalCasesIndicator() {
    return <Indicator number={this.props.caseCount} text="Total Cases" />;
  }

  totalDeathsIndicator() {
    return <Indicator number={this.props.deathCount} text="Total Deaths" />;
  }

  casesByStateBarChart() {
    return (
      <div style={{ display: "inline-block", height: "800px", width: "50%" }}>
        <h2>Cases By State</h2>
        <ResponsiveBar
          data={this.props.casesByState}
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
          data={this.props.deathsByState}
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
          data={this.props.casesOverTime}
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
          data={this.props.deathsOverTime}
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
        <div id="filter-container">
          <Dropdown
            items={this.props.states}
            onChange={(e) => this.onStateDropdownChange(e)}
          />
        </div>
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
  return {
    caseCount: caseCountSelector(state, props),
    casesByState: casesByStateSelector(state, props),
    casesOverTime: casesOverTimeSelector(state, props),
    deathCount: deathCountSelector(state, props),
    deathsByState: deathsByStateSelector(state, props),
    deathsOverTime: deathsOverTimeSelector(state, props),
    states: statesSelector(state, props),
  };
}

export default connect(mapStateToProps)(App);
