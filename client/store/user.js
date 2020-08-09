import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS'
const TOGGLE_REMINDERS = 'TOGGLE_REMINDERS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const toggledNotifications = () => ({type: TOGGLE_NOTIFICATIONS})
const toggledReminders = () => ({type: TOGGLE_REMINDERS})
/**
 * THUNK CREATORS
 */
export const toggleNotifications = () => async dispatch => {
  try {
    await axios.put('/api/users/me/toggle', {toggle: 'notifications'})
    dispatch(toggledNotifications())
  } catch (e) {
    console.err(e)
  }
}
export const toggleReminders = () => async dispatch => {
  try {
    await axios.put('/api/users/me/toggle', {toggle: 'reminders'})
    dispatch(toggledReminders())
  } catch (e) {
    console.err(e)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, type) => async dispatch => {
  let res
  try {
    if (method === 'signup')
      res = await axios.post(`/auth/${method}`, {email, password, type})
    else {
      res = await axios.post('/auth/login', {email, password})
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case TOGGLE_NOTIFICATIONS:
      return {...state, notifications: !state.notifications}
    case TOGGLE_REMINDERS:
      return {...state, reminders: !state.reminders}
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
