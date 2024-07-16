import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Languages from '../Languages'

import Contributors from '../Contributors'

import Piechart from '../Piechart'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class RepositoryItemDetails extends Component {
  state = {repositoryItemDetailsList: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGitHubUserRepositoryItemDetails()
  }

  getContributors = contributor => ({
    avatarUrl: contributor.avatar_url,
    contribution: contributor.contribution,
    eventsUrl: contributor.events_url,
    followersUrl: contributor.followers_url,
    followingUrl: contributor.following_url,
    gistsUrl: contributor.gists_url,
    gravatarId: contributor.gravatar_id,
    htmlUrl: contributor.html_url,
    id: contributor.id,
    login: contributor.login,
    nodeId: contributor.node_id,
    organizationsUrl: contributor.organizations_url,
    receivedEventsUrl: contributor.received_events_url,
    reposUrl: contributor.repos_url,
    siteAdmin: contributor.site_admin,
    starredUrl: contributor.starred_url,
    subscriptionsUrl: contributor.subscriptions_url,
    type: contributor.type,
    url: contributor.url,
  })

  getOwner = owner => ({
    avatarUrl: owner.avatar_url,
    eventsUrl: owner.events_url,
    followersUrl: owner.followers_url,
    followingUrl: owner.following_url,
    gistsUrl: owner.gists_url,
    gravatarId: owner.gravatar_id,
    htmlUrl: owner.html_url,
    id: owner.id,
    login: owner.login,
    nodeId: owner.node_id,
    organizationsUrl: owner.organizations_url,
    receivedEventsUrl: owner.received_events_url,
    reposUrl: owner.repos_url,
    siteAdmin: owner.site_admin,
    starredUrl: owner.starred_url,
    subscriptionsUrl: owner.subscriptions_url,
    type: owner.type,
    url: owner.url,
  })

  getGitHubUserRepositoryItemDetails = async () => {
    const {username, repoName} = this.props

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?` //api_key="github personal access"
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        name: data.name,
        description: data.description,
        languages: data.lanuages,
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        commitsCount: data.network_count,
        issuesCount: data.open_issues_count,
        contributors: data.contributors.map(contributor => ({
          avatarUrl: contributor.avatar_url,
          contribution: contributor.contribution,
          eventsUrl: contributor.events_url,
          followersUrl: contributor.followers_url,
          followingUrl: contributor.following_url,
          gistsUrl: contributor.gists_url,
          gravatarId: contributor.gravatar_id,
          htmlUrl: contributor.html_url,
          id: contributor.id,
          login: contributor.login,
          nodeId: contributor.node_id,
          organizationsUrl: contributor.organizations_url,
          receivedEventsUrl: contributor.received_events_url,
          reposUrl: contributor.repos_url,
          siteAdmin: contributor.site_admin,
          starredUrl: contributor.starred_url,
          subscriptionsUrl: contributor.subscriptions_url,
          type: contributor.type,
          url: contributor.url,
        })),
        owner: this.getOwner(data.owner),
        watchersCount: data.watchers_count,
      }
      console.log(updatedData)
      this.setState({
        repositoryItemDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryItemSuccessView = () => {
    const {repositoryItemDetailsList} = this.state
    // const objectItems = repositoryItemDetailsList[0]
    const {
      name,
      description,
      languages,
      forksCount,
      stargazersCount,
      watchersCount,
      issuesCount,
      contributors,
      owner,
    } = repositoryItemDetailsList
    const {avatarUrl, login} = owner

    const contributorLength = contributors.length

    return (
      <div data-testid="repoItem" className="repo-item">
        <div className="repoItemDetailsContainer">
          <div className="repositoryItemContainer1">
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
            <div className="commit-issues-count-container">
              <div className="repo-item-counts-container">
                <p className="repo-item-count-heading">Watchers Counts</p>
                <p className="repo-item-counts">{watchersCount}</p>
              </div>
              <div className="repo-item-counts-container">
                <p className="repo-item-count-heading">Issues Counts</p>
                <p className="repo-item-counts">{issuesCount}</p>
              </div>
            </div>
            <div className="contributors-container">
              <h1 className="contributors-heading">Contributors :</h1>
              <p className="contributors-desc">{contributorLength} Members</p>
              <div className="contributors-images-container">
                {contributors.map(eachContributor => (
                  <Contributors
                    contributorDetails={eachContributor}
                    key={eachContributor.id}
                  />
                ))}
              </div>
            </div>
            <div className="pieChart-container">
              <h1 className="pieChart-language-heading">Languages :</h1>
              <Piechart pieLanguages={languages} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getGitHubUserRepositoryItemDetails()
  }

  renderFailureView = () => (
    <div className="repositoryFailureContainer">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718604995/Group_7522_f4ueqy.png"
        alt="failure view"
        className="error-view"
      />
      <p className="errorName">Something went wrong. Please try again</p>
      <button
        className="tryButton"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="repository-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderGitRepositoryItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  /* renderNoDataFound = () => (
    <div className="noDataFoundContainer">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718949987/Repository-NoDataFound-2x_dzw1h2.png"
        alt="empty repositories"
        className="repo-no-data-img"
      />
      <h1 className="repo-no-data-heading">No Data Found</h1>
      <p className="repo-no-data-desc">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <Link to="/">
        <button
          type="button"
          className="goto-home-button"
          onClick={this.onClickGotoHome}
        >
          Go to Home
        </button>
      </Link>
    </div>
  )
 */
  render() {
    // const {username} = this.props
    return (
      <>
        <Header />
        <div className="repositoriesContainer">
          {this.renderGitRepositoryItemDetails()}
        </div>
      </>
    )
  }
}
export default RepositoryItemDetails

/* import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import PieChartRoute from '../PieChartRoute'
import Languages from '../Languages'

import Contributors from '../Contributors'
import './index.css'

const apiStatusConstarints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepositoryItemDetails extends Component {
  state = {
    repositoryItemData: {},
    apiStatus: apiStatusConstarints.initial,
  }

  componentDidMount() {
    this.getRepoItemDetails()
  }

  getRepoItemDetails = async () => {
    const {username, repoName} = this.props
    this.setState({apiStatus: apiStatusConstarints.inProgress})
    console.log(repoName)

    const apiUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?` // personal access token should be place here
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        name: data.name,
        description: data.description,
        languages: data.lanuages,
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        commitsCount: data.network_count,
        issuesCount: data.open_issues_count,
        contributors: data.contributors.map(contributor => ({
          avatarUrl: contributor.avatar_url,
          contribution: contributor.contribution,
          eventsUrl: contributor.events_url,
          followersUrl: contributor.followers_url,
          followingUrl: contributor.following_url,
          gistsUrl: contributor.gists_url,
          gravatarId: contributor.gravatar_id,
          htmlUrl: contributor.html_url,
          id: contributor.id,
          login: contributor.login,
          nodeId: contributor.node_id,
          organizationsUrl: contributor.organizations_url,
          receivedEventsUrl: contributor.received_events_url,
          reposUrl: contributor.repos_url,
          siteAdmin: contributor.site_admin,
          starredUrl: contributor.starred_url,
          subscriptionsUrl: contributor.subscriptions_url,
          type: contributor.type,
          url: contributor.url,
        })),
        watchersCount: data.watchers_count,
      }

      this.setState({
        apiStatus: apiStatusConstarints.success,
        repositoryItemData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstarints.failure})
    }
  }

  renderFailureView = () => (
    <div className="home-result-container" data-testid="repoItem">
      <img
        src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Frame_8830_1_odarmz.png"
        alt="github failure view"
        className="home-img"
      />
      <h1 className="heading">Something went wrong. Please try again</h1>
      <button
        className="retry-button"
        onClick={this.getRepoItemDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="home-result-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {repositoryItemData} = this.state
    const {
      name,
      description,
      languages,
      forksCount,
      stargazersCount,
      issuesCount,
      contributors,
      watchersCount,
    } = repositoryItemData

    const contributorsLength = contributors.length

    return (
      <div className="repo-eachItem-container">
        <h1 className="repo-color-name">{name}</h1>
        <p className="description-text">{description}</p>
        <div className="languages-container">
          {languages.map(eachLanguage => (
            <Languages
              key={eachLanguage.value}
              languagesDetails={eachLanguage}
            />
          ))}
        </div>

        <div className="repo-forks-stars-count-container">
          <div className="repos-forks-stars-count">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720893699/Star_-_16px_fqj2qn.png"
              alt="stargazers_count"
              className="stars-img"
            />
            <p className="forks-text">{stargazersCount}</p>
          </div>
          <div className="repos-forks-stars-count">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720893748/Git_3_1_woktbx.png"
              alt="stargazers_count"
              className="stars-img"
            />
            <p className="forks-text">{forksCount}</p>
          </div>
        </div>

        <div className="commits-issues-count-container">
          <div className="commits-issues-count">
            <p className="commits-text">Watchers Counts</p>
            <p className="count-text">{watchersCount}</p>
          </div>

          <div className="commits-issues-count">
            <p className="commits-text">Issues Counts</p>
            <p className="count-text">{issuesCount}</p>
          </div>
        </div>

        <div className="contributors-container">
          <h1 className="text-heading">Contributors</h1>
          <p className="contributors-count">
            {contributorsLength}
            <span className="contributors-count-text"> Members</span>
          </p>
          <ul className="contributor-images-container">
            {contributors.map(eachContributor => (
              <Contributors
                key={eachContributor.id}
                contributorDetails={eachContributor}
              />
            ))}
          </ul>
        </div>

        <div className="pie-chart-container">
          <h1 className="text-heading">Languages</h1>
          <div className="pie-container">
            <PieChartRoute pieLanguages={languages} />
          </div>
        </div>
      </div>
    )
  }

  renderFinalOutPutView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstarints.inProgress:
        return this.renderLoaderView()
      case apiStatusConstarints.failure:
        return this.renderFailureView()
      case apiStatusConstarints.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="repositoriesContainer">
          {this.renderFinalOutPutView()}
        </div>
      </>
    )
  }
}

export default RepositoryItemDetails
*/
