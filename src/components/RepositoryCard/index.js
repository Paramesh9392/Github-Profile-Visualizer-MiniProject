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
    <Link to={`/repositories/${name}`} className="repoLinkContainer">
      <div data-testid="repoItem" className="repo-item">
        <div className={` repositoryItemContainer`} data-testid="repoItem">
          <div className="repoHeaderContainer">
            <h1 className="repoItemHeading">{name}</h1>
            <img src={avatarUrl} alt={login} className="repoAvatarUrl" />
          </div>

          <p className="repoItemDesc">{description}</p>
          <div className="languagesListContainer">
            {languages.map(eachLanguage => (
              <Languages
                key={eachLanguage.value}
                languageDetails={eachLanguage}
              />
            ))}
          </div>
          <div className="repoCountContainer">
            <div className="starContainer">
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Star_-_16px.1_cpjsj4.png"
                alt="star"
                className="start-image"
              />
              <p className="repoItemStar">{stargazersCount}</p>
            </div>
            <div className="forksContainer">
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Git_3_w5zp4b.png"
                alt="git"
                className="git-image"
              />
              <p className="repoItemForks">{forksCount} </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default RepositoryCard

/* import {Link} from 'react-router-dom'
import Languages from '../Languages'
import './index.css'

const RepositoryCard = props => {
  const {repositoryDetails} = props
  const {name, description, languages, stargazersCount, forksCount} =
    repositoryDetails

  return (
    <Link to={`/repositories/${name}`} className="link">
      <div className="repo-item-container" data-testid="repoItem">
        <h1 className="repo-item-name">{name}</h1>
        <p className="repo-item-description">{description}</p>

        <ul className="languages-list">
          {languages.map(eachLanguage => (
            <Languages
              key={eachLanguage.values}
              languagesDetails={eachLanguage}
            />
          ))}
        </ul>

        <div className="repos-count-container">
          <div className="stargazersCount-container">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720893699/Star_-_16px_fqj2qn.png"
              alt="stargazers"
              className="repos-icon"
            />
            <p className="count">{stargazersCount}</p>
          </div>

          <div className="stargazersCount-container">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720893748/Git_3_1_woktbx.png"
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
*/
