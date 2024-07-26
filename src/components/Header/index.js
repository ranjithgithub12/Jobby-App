import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {HiBriefcase} from 'react-icons/hi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <div className="mobile-container">
          <ul className="nav-icons-mobile">
            <li className="nav-list-mobile">
              <Link to="/" className="link-items">
                <IoMdHome className="home-icon" size="30px" />
              </Link>
            </li>
            <li className="nav-list-mobile">
              <Link to="/jobs" className="link-items">
                <HiBriefcase className="home-icon" size="30px" />
              </Link>
            </li>
          </ul>
          <button
            className="logout-button"
            onClick={onClickLogout}
            aria-label="logout"
          >
            <IoIosLogOut className="logout-icon" size="30px" />
          </button>
        </div>

        <ul className="unorder-desktop-view">
          <li className="list-desktop-view">
            <Link to="/" className="link-menu-desktop">
              Home
            </Link>
          </li>
          <li className="list-desktop-view">
            <Link to="/jobs" className="link-menu-desktop">
              Jobs
            </Link>
          </li>
        </ul>

        <button className="logout-button-desktop" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
