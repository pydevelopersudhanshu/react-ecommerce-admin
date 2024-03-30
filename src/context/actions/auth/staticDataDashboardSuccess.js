import { STATIC_DATA_DASHBOARD } from "../../actionTypes"


export default (payload) => (dispatch) => {
    dispatch({
        type: STATIC_DATA_DASHBOARD,
        payload: payload
    })
}