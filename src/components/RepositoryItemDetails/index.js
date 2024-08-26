import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import Languages from '../Languages'

import Contributors from '../Contributors'

import Piechart from '../Piechart'

import './index.css'

require('dotenv').config()

const apiKey = process.env.API_KEY

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
    const {username, id} = this.props

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${id}?api_key=${apiKey}`
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
    const {
      name,
      description,
      languages,
      forksCount,
      stargazersCount,
      watchersCount,
      issuesCount,
      contributors,
    } = repositoryItemDetailsList

    const contributorLength = contributors.length

    return (
      <>
        <div data-testid="repoItem" className="repo-item">
          <div className="repoItemDetailsContainer">
            <div className="repositoryItemContainer1">
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
        <div className="back-button-container">
          <Link to="/repositories">
            <button className="back-button" type="button">
              Back
            </button>
          </Link>
        </div>
      </>
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

  render() {
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
