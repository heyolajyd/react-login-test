import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import { stat } from 'fs';

 class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // handle input change and dispatch register
        const { user } = this.state;

        this.setState({user: {...user, [event.target.name]: event.target.value }});
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        if(event) event.preventDefault();
        const { user } = this.state;
        const { username, password } = user;
        const { dispatch } = this.props;
        this.setState({submitted: true});
        if(username && password){
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submitted } = this.state;
        const {username, password} = user;
        const { registering } = this.props;

        const buttonText = registering ? "Registering.." : "Register";

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.handleSubmit} disabled={registering} className="btn btn-primary">{buttonText}</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    const { authentication, registration } = state;
    return { ...authentication, registering: registration.registering };
}

export { RegisterComponent as TestRegisterPage };
export const RegisterPage = connect(mapStateToProps, null)(RegisterComponent);
