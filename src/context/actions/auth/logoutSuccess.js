import { LOGOUT_SUCCESS } from "../../actionTypes"

export default (payload) => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
        payload: payload
    })
}