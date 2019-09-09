import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
        this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          {alert && alert.message ? (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          ) : (
            ""
          )}
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
      alert
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      clearAlerts: () => dispatch(alertActions.clear())
    };
  };
  const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
  
  export { ConnectedApp as App };