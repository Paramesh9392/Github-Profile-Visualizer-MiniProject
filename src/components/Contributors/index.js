import './index.css'

const Contributors = props => {
  const {contributorDetails} = props
  const {avatarUrl} = contributorDetails

  return (
    <div className="contributors-profile-container">
      <img
        src={avatarUrl}
        alt="contributor profile"
        className="contributor-profile"
      />
    </div>
  )
}
export default Contributors

/* import './index.css'

const Contributors = props => {
  const {contributorDetails} = props
  const {avatarUrl} = contributorDetails

  return (
    <li className="contributors-item">
      <img src={avatarUrl} alt="avatarUrl" className="contributors-avatar" />
    </li>
  )
}

export default Contributors
*/
