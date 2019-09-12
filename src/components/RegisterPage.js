import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

export class RegisterPage extends Component {
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
        const newUserProps = {[event.target.name]: event.target.value};
        this.setState({user: {...user, ...newUserProps }});
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        event.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;
        this.setState({submitted: true});
        if(user.username && user.password){
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" value={user.username}
                        name="username" onChange={this.handleChange}  onBlur={this.handleChange}/>
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={user.password}
                         name="password" onChange={this.handleChange}  onBlur={this.handleChange}/>
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary"  onClick={this.handleSubmit}>Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    
}

RegisterPage = connect()(RegisterPage)

export { RegisterPage as TestRegisterPage };
