import React from 'react'
import {connect} from 'react-redux'
import PickupView from './pickupView'

const Analytics = props => {
  return (
    <div>
      <PickupView pickups={props.pickups} bins={props.bins} />
    </div>
  )
}

const mapDispatch = dispatch => {
  return {}
}
const mapState = state => {
  return {
    user: state.user,
    pickups: state.user.pickups,
    bins: state.user.bins
  }
}

export default connect(mapState, mapDispatch)(Analytics)
