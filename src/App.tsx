import * as React from 'react';
import './App.scss';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import { AdvertisementPage } from './components/AdvertisementPage/AdvertisementPage';
import Theme from '@pluralsight/ps-design-system-theme/react';

const renderRoutes = () => (
  <Switch>
    <Route exact path="/list" component={AdvertisementPage} />
    {NoMatchRedirect()}
  </Switch>
);

const NoMatchRedirect = () => {
  return <Redirect to="/list" />;
};

class App extends React.Component {
  render() {
    return (
      <div id="app-container">
        <Theme name={Theme.names.light}>
          <Router basename={'/advertisement'}>{renderRoutes()}</Router>
        </Theme>
      </div>
    );
  }
}

export default App;
