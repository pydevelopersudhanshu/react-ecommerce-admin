import { LOGIN_SUCCESS, INITIALISE_PROFILE, SIGNUP_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes"

const login = (payload: any) => (dispatch: any) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: payload
    })
}
const signup = (payload: any) => (dispatch: any) => {
    dispatch({
        type: SIGNUP_SUCCESS,
        payload: payload
    })
}
const initialiseProfile = (payload: any) => (dispatch: any) => {
    dispatch({
        type: INITIALISE_PROFILE,
        payload: payload
    })
}
const logout = (payload: any) => (dispatch: any) => {
    dispatch({
        type: LOGOUT_SUCCESS,
        payload: payload
    })
}

export default {
    login,
    signup,
    initialiseProfile,
    logout,
};
