import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

export class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {

            const { pathname } = location;
            if(action === "PUSH"){
                // dispatch(alertActions.clear());
            }
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
              <div className="container">
                <Route path="/">
                    {!!alert && !!alert.type && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                </Route>
                <div className="col-sm-8 col-sm-offset-2">
                  <Switch>
                      <Route exact path="/login" component={LoginPage} />
                      <Route exact path="/register" component={RegisterPage} />  
                      <PrivateRoute exact path="/" component={HomePage} />
                  </Switch>    
                </div>
              </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export const ConnectedApp = connect(mapStateToProps, null)(App)