import React from 'react'
import {connect} from 'react-redux'
import BinsView from './binsView'
const Bins = () => {
  return (
    <div>
      <h1>This is the bins page</h1>
      <BinsView bins={[]} />
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
