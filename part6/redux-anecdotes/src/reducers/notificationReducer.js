const initialState = ''
const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_NOTIFICATION':
            return action.data.notification
        case 'RESET_NOTIFICATION':
            return ''
        default: return state
    }
}
// export const setNotification = (notification) => async (dispatch) => dispatch({
//     type: 'SET_NOTIFICATION',
//     data: {
//         notification
//     }
// })

export const setNotification = (() => {
    let timeId;
    return ((notification, ms) => {
        return async (dispatch) => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: {
                    notification
                }
            })
            if(timeId) {
                clearTimeout(timeId)
                timeId = null
            }
            await new Promise((resolve, reject) => {
                timeId = setTimeout(_ => {
                    resolve()
                }, ms)
            })
            return dispatch({
                type: 'RESET_NOTIFICATION',
            })
        }
    })
})()
export default reducer