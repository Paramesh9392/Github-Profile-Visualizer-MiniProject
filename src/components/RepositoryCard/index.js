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
  } = repositoryDetails

  return (
    <Link to={`/repositories/${name}`} className="repoLinkContainer">
      <div testid="repoItem" className="repo-item">
        <div className="repositoryItemContainer" testid="repoItem">
          <div className="repoHeaderContainer">
            <h1 className="repoItemHeading">{name}</h1>
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
