import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import RepositoryCard from '../RepositoryCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {repositoriesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGitHubUserRepositoryDetails()
  }

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

  getPermission = permission => ({
    admin: permission.admin,
    maintain: permission.maintain,
    pull: permission.pull,
    push: permission.push,
    triage: permission.triage,
  })

  getGitHubUserRepositoryDetails = async () => {
    const {username} = this.props

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `` // access_token
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.map(eachItem => ({
        allowForking: eachItem.allow_forking,
        archiveUrl: eachItem.archive_url,
        archived: eachItem.archived,
        assigneesUrl: eachItem.assignees_url,
        blobsUrl: eachItem.blobs_url,
        branchesUrl: eachItem.branches_url,
        cloneUrl: eachItem.clone_url,
        collaboratorsUrl: eachItem.collaborators_url,
        commentsUrl: eachItem.comments_url,
        compareUrl: eachItem.compare_url,
        contentsUrl: eachItem.contents_url,
        contributorsUrl: eachItem.contributors_url,
        createdAt: eachItem.crated_at,
        defaultBranch: eachItem.default_branch,
        deploymentsUrl: eachItem.deployments_url,
        description: eachItem.description,
        disabled: eachItem.disabled,
        downloadsUrl: eachItem.downloads_url,
        eventsUrl: eachItem.events_url,
        fork: eachItem.fork,
        forks: eachItem.forks,
        forksCount: eachItem.forks_count,
        forksUrl: eachItem.forks_url,
        fullName: eachItem.full_name,
        gitCommitsUrl: eachItem.git_commits_url,
        gitRefsUrl: eachItem.git_refs_url,
        gitTagsUrl: eachItem.git_tags_url,
        gitUrl: eachItem.git_url,
        hasDiscussions: eachItem.has_discussions,
        hasDownloads: eachItem.has_downloads,
        hasIssues: eachItem.has_issues,
        hasPages: eachItem.has_pages,
        hasProjects: eachItem.has_projects,
        hasWiki: eachItem.has_wiki,
        hooksUrl: eachItem.hooks_url,
        htmlUrl: eachItem.html_url,
        id: eachItem.id,
        isTemplate: eachItem.is_template,
        issueCommentsUrl: eachItem.issue_comments_url,
        issueEventsUrl: eachItem.issue_events_url,
        issuesUrl: eachItem.issues_url,
        keysUrl: eachItem.keys_url,
        labelsUrl: eachItem.labels_url,
        language: eachItem.language,
        languages: eachItem.languages.map(each => ({
          name: each.name,
          value: each.value,
        })),
        languageUrl: eachItem.languages_url,
        license: eachItem.license,
        mergesUrl: eachItem.merges_url,
        milestonesUrl: eachItem.milestones_url,
        mirrorUrl: eachItem.mirror_url,
        name: eachItem.name,
        nodeId: eachItem.node_id,
        notificationsUrl: eachItem.notifications_url,
        openIssues: eachItem.open_issues,
        openIssuesCount: eachItem.open_issues_count,
        owner: this.getOwner(eachItem.owner),
        permissions: this.getPermission(eachItem.permissions),
        private: eachItem.private,
        pullsUrl: eachItem.pulls_url,
        pushedAt: eachItem.pushed_at,
        releasesUrl: eachItem.releases_url,
        size: eachItem.size,
        sshUrl: eachItem.ssh_url,
        stargazersCount: eachItem.stargazers_count,
        stargazersUrl: eachItem.stargazers_url,
        statusesUrl: eachItem.statuses_url,
        subscribersUrl: eachItem.subscribers_url,
        subscriptionUrl: eachItem.subscription_url,
        svnUrl: eachItem.svn_url,
        tagsUrl: eachItem.tags_url,
        teamsUrl: eachItem.teams_url,
        topics: eachItem.topics,
        treesUrl: eachItem.trees_url,
        updatedAt: eachItem.updated_at,
        url: eachItem.url,
        visibility: eachItem.visibility,
        watchers: eachItem.watchers,
        watchersCount: eachItem.watchers_count,
        webCommitSignOffRequired: eachItem.web_commit_signoff_required,
      }))
      console.log(updatedData)
      this.setState({
        repositoriesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoriesSuccessView = () => {
    const {repositoriesList} = this.state
    const repositoriesLength = repositoriesList.length === 0

    return (
      <div className="repositories-success-container">
        {repositoriesLength ? (
          <div className="noDataRepoAnalysisContainer">
            <img
              src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719653254/Layer_3_1_jxjnnu.png"
              alt="no repositories"
              className="no-data-image"
            />
            <h1 className="noDataHeading">No Repositories Found!</h1>
          </div>
        ) : (
          <>
            <h1 className="repositorySuccessHeading">Repositories</h1>
            <div className="repositorySuccessListContainer">
              {repositoriesList.map(eachRepository => (
                <RepositoryCard
                  repositoryDetails={eachRepository}
                  key={eachRepository.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getGitHubUserRepositoryDetails()
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
    <div className="repository-loader-container">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderGitRepositoryDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderNoDataFound = () => (
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

  render() {
    const {username} = this.props
    return (
      <>
        <Header />
        <div className="repositoriesContainer">
          {username === ''
            ? this.renderNoDataFound()
            : this.renderGitRepositoryDetails()}
        </div>
      </>
    )
  }
}
export default Repository
