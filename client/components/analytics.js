import React from 'react'
import {connect} from 'react-redux'

const Analytics = props => {
  return (
    <div>
      <h1>This is the Analytics page {props.user.email}</h1>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {}
}
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(Analytics)
