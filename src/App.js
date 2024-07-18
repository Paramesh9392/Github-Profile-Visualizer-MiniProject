import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import UsernameContext from './context/UsernameContext'

import HomeContainer from './components/HomeContainer'

import RepositoriesContainer from './components/RepositoriesContainer'

import RepositoryItemDetailsContainer from './components/RepositoryItemDetailsContainer'

import AnalysisContainer from './components/AnalysisContainer'

import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {username: ''}

  changeUserName = username => {
    this.setState({username})
  }

  render() {
    const {username} = this.state
    return (
      <UsernameContext.Provider
        value={{username, changeUserName: this.changeUserName}}
      >
        <div className="appContainer">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route
              exact
              path="/repositories"
              component={RepositoriesContainer}
            />
            <Route
              exact
              path="/repositories/:id"
              component={RepositoryItemDetailsContainer}
            />
            <Route exact path="/analysis" component={AnalysisContainer} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </UsernameContext.Provider>
    )
  }
}

export default App
