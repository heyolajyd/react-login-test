import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    // return the promise using fetch which adds to localstorage on resolve
    return async dispatch => {
        dispatch(request({username}))
        try {
            const user = await userService.login(username, password);
            if(user){
                dispatch(success(user));
                history.push("/")
            }

        }
        catch(error){
            dispatch(failure(error));
            dispatch(alertActions.error(error));
        }
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // complete this function
    userService.logout();
    return {
        type: userConstants.LOGOUT
    }
}

function register(user) {
    // return the promise using fetch which dispatches appropriately 
    return async dispatch => {
        dispatch(request(user))
        try {
            dispatch(request(user))
            const user = await userService.register(user);
            if(user){
                dispatch(success(user));
                history.push("/login");
                dispatch(alertActions.success("User successfully registered"));
            }

        }
        catch(error){
            dispatch(failure(error));
            dispatch(alertActions.error(error));
        }
    }
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
