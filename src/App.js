import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/main/Main'
import Header from './components/header/Header'
import Tables from './components/tables/Tables'
import LineChart from './components/linechart/LineChart'
import AppProvider from './context/AppProvider'

function App() {
  return (
    <Router>
      <AppProvider>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/tables' component={Tables} />
          <Route path='/linecharts' component={LineChart} />
        </Switch>
      </AppProvider>
    </Router>
  );
}

export default App;
