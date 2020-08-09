import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {AppBar, Toolbar, Button} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <AppBar position="static">
      {isLoggedIn ? (
        <Toolbar className="navbar">
          {/* The navbar will show these links after you log in */}
          <div>
            <h2>Department of Sanitation</h2>
          </div>
          <div>
            <Button className="nav-button">
              <Link to="/home">Home</Link>
            </Button>
            <Button className="nav-button">
              {' '}
              <Link to="/bins">My Bins</Link>
            </Button>
            <Button className="nav-button">
              <Link to="/analytics">Analytics</Link>
            </Button>
            <Button className="nav-button">
              <Link to="/account">Manage</Link>
            </Button>
            <Button className="nav-button">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </Button>
          </div>
        </Toolbar>
      ) : (
        <Toolbar>
          {/* The navbar will show these links before you log in */}
          <div className="navbar">
            <h2>Department of Sanitation</h2>
          </div>
          <div>
            <Button className="nav-button">
              <Link to="/login">Login</Link>
            </Button>
            <Button className="nav-button">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </Toolbar>
      )}
    </AppBar>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
