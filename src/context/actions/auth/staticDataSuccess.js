import { STATIC_DATA_SUCCESS } from "../../actionTypes"


export default (payload) => (dispatch) => {
    dispatch({
        type: STATIC_DATA_SUCCESS,
        payload: payload
    })
}