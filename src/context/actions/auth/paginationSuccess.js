import { PAGE_LIMIT_SUCCESS } from "../../actionTypes"

export default (payload) => (dispatch) => {
    dispatch({
        type: PAGE_LIMIT_SUCCESS,
        payload: payload
    })
}