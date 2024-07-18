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
