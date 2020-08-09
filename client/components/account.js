import React from 'react'
import {connect} from 'react-redux'
import {FormGroup, FormControlLabel, Switch} from '@material-ui/core'
import {toggleReminders, toggleNotifications} from '../store/user'

const Account = ({reminders, notifications, toggleNotifs, toggleRems}) => {
  return (
    <div className="account-form-container">
      <FormGroup>
        <h2>Account Settings</h2>
        <FormControlLabel
          control={<Switch checked={notifications} onChange={toggleNotifs} />}
          label="Notify me when a DoS employee has picked up my bin(s) for a pickup"
        />
        <FormControlLabel
          control={<Switch checked={reminders} onChange={toggleRems} />}
          label="Remind me when a pickup is scheduled for the following day"
        />
      </FormGroup>
    </div>
  )
}
const mapState = state => {
  return {
    reminders: state.user.reminders,
    notifications: state.user.notifications
  }
}
const mapDispatch = dispatch => {
  return {
    toggleRems: () => dispatch(toggleReminders()),
    toggleNotifs: () => dispatch(toggleNotifications())
  }
}
export default connect(mapState, mapDispatch)(Account)
