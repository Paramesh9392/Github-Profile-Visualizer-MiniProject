import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="no-data-container">
    <img
      src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Group_7519_tmwxdh.png"
      alt="no data found"
      className="no-data-img"
    />
    <h1 className="no-data-heading">PAGE NOT FOUND</h1>
    <p className="no-data-text">
      {' '}
      We are sorry the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="go-to-Home-button" type="button">
        Go To Home
      </button>
    </Link>
  </div>
)

export default NotFound
