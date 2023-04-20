import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <ul className="nav-content">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="nav-items">
          <p>
            <Link to="/" className="link-items">
              Home
            </Link>
          </p>
          <p>
            <Link to="/jobs" className="link-items">
              Jobs
            </Link>
          </p>
        </li>
        <li>
          <button type="button" onClick={onClickLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
