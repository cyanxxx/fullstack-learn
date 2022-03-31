const initialState = {
  successMsg: '',
  errorMsg: ''
}
const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET_NOTIFICATION': {
    const type = action.data.type + 'Msg'
    return { ...state, [type]: action.data.notification }
  }
  case 'RESET_NOTIFICATION': {
    const type = action.data.type + 'Msg'
    return { ...state, [type]: '' }
  }
  default: return state
  }
}
export const setSuccessMsg = (notification, ms) => {
  return setNotification(notification, ms, 'success')
}
export const setErrorMsg = (notification, ms) => {
  return setNotification(notification, ms, 'error')
}
export const setNotification = (() => {
  let timeId
  return ((notification, ms, type) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          notification,
          type
        }
      })
      if(timeId) {
        clearTimeout(timeId)
        timeId = null
      }
      await new Promise((resolve) => {
        timeId = setTimeout(_ => {
          resolve()
        }, ms)
      })
      return dispatch({
        type: 'RESET_NOTIFICATION',
        data: {
          type
        }
      })
    }
  })
})()

export default reducer