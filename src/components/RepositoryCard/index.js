import {Link} from 'react-router-dom'
import Languages from '../Languages'
import './index.css'

const RepositoryCard = props => {
  const {repositoryDetails} = props
  const {
    name,
    description,
    languages,
    stargazersCount,
    forksCount,
    owner,
  } = repositoryDetails
  const {avatarUrl, login} = owner

  return (
    <Link to={`/repositories/${name}`}>
      <div className="repo-item-container" data-testid="repoItem">
        <h1 className="repo-item-name">{name}</h1>
        <p className="repo-item-description">{description}</p>

        <ul className="languages-list">
          {languages.map(eachLanguage => (
            <Languages
              key={eachLanguage.value}
              languagesDetails={eachLanguage}
            />
          ))}
        </ul>

        <div className="repos-count-container">
          <div className="stargazersCount-container">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720564077/Group_7500_aeudqb.png"
              alt="stargazers"
              className="repos-icon"
            />
            <p className="count">{stargazersCount}</p>
          </div>

          <div className="stargazersCount-container">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720564077/Git_3_h8boah.png"
              alt="forksCount"
              className="repos-icon"
            />
            <p className="count">{forksCount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RepositoryCard
