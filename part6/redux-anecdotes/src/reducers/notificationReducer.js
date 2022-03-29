const initialState = ''
const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_NOTIFICATION':
            return action.data.notification
        default: return state
    }
}
export const setNotification = (notification, ms=0) => async (dispatch) => {
    await new Promise((resolve, reject) => setTimeout(_ => {
        resolve()
    }, ms))
    return dispatch({
        type: 'SET_NOTIFICATION',
        data: {
            notification
        }
    })
}
export default reducer