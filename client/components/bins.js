import React from 'react'
import {connect} from 'react-redux'
import BinsView from './binsView'
const Bins = props => {
  return (
    <div>
      <BinsView bins={props.user.bins} pickups={props.user.pickups} />
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

export default connect(mapState, mapDispatch)(Bins)
