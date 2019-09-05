import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { username, password } = this.state;

        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        if(e) e.preventDefault();
        const { username, password } = this.state;
        const { dispatch } = this.props;

        this.setState({submitted: true});

        if( username && password ){
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Login</button>
                        <button className="btn btn-link">
                            <Link to="/register">Register</Link>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.authentication,
        ...state.alert
    }
}

export { LoginComponent as TestLoginPage };
export const LoginPage = connect(mapStateToProps, null)(LoginComponent);