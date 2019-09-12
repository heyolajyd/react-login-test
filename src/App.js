import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions, userActions } from './actions';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            const { state  } = location;
            if (state && state.logout){
                dispatch(userActions.logout());
            }
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                     <Route exact path="/login" component={LoginPage} />
                      <Route exact path="/register" component={RegisterPage} />  
                      <PrivateRoute exact path="/" component={HomePage} />
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

App = connect(mapStateToProps)(App);

export  {App};
