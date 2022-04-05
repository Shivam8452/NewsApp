import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  state = {
    progress: 0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
      <Router>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Navbar/>
      <Switch>
        <Route exact path="/"><News setProgress={this.setProgress} key='general' pageSize={21} country="in" category='general'/></Route>
        <Route exact path="/business"><News setProgress={this.setProgress} key='business' pageSize={21} country="in" category='business'/></Route>
        <Route exact path="/entertainment"><News setProgress={this.setProgress} key='entertainment' pageSize={20} country="in" category='entertainment'/></Route>
        <Route exact path="/general"><News setProgress={this.setProgress} key='general' pageSize={21} country="in" category='general'/></Route>
        <Route exact path="/health"><News setProgress={this.setProgress} key='health' pageSize={21} country="in" category='health'/></Route>
        <Route exact path="/science"><News setProgress={this.setProgress} key='science' pageSize={21} country="in" category='science'/></Route>
        <Route exact path="/sports"><News setProgress={this.setProgress} key='sports' pageSize={21} country="in" category='sports'/></Route>
        <Route exact path="/technology"><News setProgress={this.setProgress} key='technology' pageSize={21} country="in" category='technology'/></Route>
          
          
        </Switch>
      </Router>
      </>
    )
  }
}

