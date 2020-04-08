import React, { Component } from 'react';

import axios from 'axios';

import './App.css';

const CASES_BY_COUNTY_URL = 'http://localhost:3000/counties';

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
            data: response.data.body,
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
