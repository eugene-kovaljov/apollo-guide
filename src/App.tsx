import * as React from 'react';
import './App.scss';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import { Posts } from './components/Posts/Posts';
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql/client';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ClientAccess } from './components/ClientAccess/ClientAccess';
import { Users } from './components/Users/Users';
import { FetchPolicy } from './components/FetchPolicy/FetchPolicy';

const renderRoutes = () => (
  <Switch>
    <Route exact path="/client" component={ClientAccess}/>
    <Route exact path="/list" component={Posts}/>
    <Route exact path="/users" component={Users}/>
    <Route exact path="/fetch-policy" component={FetchPolicy}/>
    {NoMatchRedirect()}
  </Switch>
);

const NoMatchRedirect = () => {
  return <Redirect to="/list"/>;
};

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <div id="app-container">
            <Router basename={'/'}>{renderRoutes()}</Router>
          </div>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
