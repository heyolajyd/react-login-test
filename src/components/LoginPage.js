import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

export class LoginPage extends Component {
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
        const targetName = e.target.name;
        const targetValue = e.target.value ;
        this.setState({...this.state, [targetName]: targetValue});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        this.setState({...this.state, submitted : true});
       if(this.state.username && this.state.password){
        dispatch(userActions.login(this.state.username, this.state.password));
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
                        <input type="text" className="form-control username" name="username" value={username} onChange={this.handleChange}  onBlur={this.handleChange}/>
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control password" name="password" value={password} onChange={this.handleChange}  onBlur={this.handleChange}/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
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

}

LoginPage = connect()(LoginPage);


export { LoginPage as TestLoginPage };
