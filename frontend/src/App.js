import React, { Component } from 'react';

import axios from 'axios';

import './App.css';

const CASES_BY_COUNTY_URL = 'https://services.arcgis.com/5T5nSi527N4F7luB/ArcGIS/rest/services/Cases_by_country_pt_V3/FeatureServer';

class App extends Component {
  state = {
    data: null,
    isLoading: true,
  };

  componentDidMount() {
    axios.get(CASES_BY_COUNTY_URL)
      .then(response => {
        this.setState(
          {
            data: response.data,
            isLoading: false,
          });
      })
      .catch(error => console.log(error));
  }
  
  render() {
    return (
      <div className="App">
        {this.state.isLoading}
        {this.state.data}
      </div>
    );
  }
}

export default App;
