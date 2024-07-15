import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import RepositoryCard from '../RepositoryCard'
import Header from '../Header'

import './index.css'

const apiStatusConstarints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {
    repositoriesList: [],
    apiStatus: apiStatusConstarints.initial,
  }

  componentDidMount() {
    this.getRepositoriesData()
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

  getRepositoriesData = async () => {
    const {username} = this.props
    this.setState({apiStatus: apiStatusConstarints.inProgress})

    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=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`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.map(eachItem => ({
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
      console.log(formattedData)

      this.setState({
        apiStatus: apiStatusConstarints.success,
        repositoriesList: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstarints.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="home-result-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="home-result-container">
      <img
        src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Frame_8830_1_odarmz.png"
        alt="github failure view"
        className="home-img"
      />
      <h1 className="heading">Something went wrong. Please try again</h1>
      <button
        className="retry-button"
        onClick={this.getRepositoriesData}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {repositoriesList} = this.state
    const reposLength = repositoriesList.length === 0

    return (
      <>
        {reposLength ? (
          <div className="no-repositories-container">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Layer_3_kooxjj.png"
              alt="empty repositories"
              className="no-repos-img"
            />
            <h1 className="no-repos-text">No Repositories Found</h1>
          </div>
        ) : (
          <div className="repos-container">
            <h1 className="repos-heading">Repositories</h1>
            <div className="each-repo-container">
              {repositoriesList.map(eachRepos => (
                <RepositoryCard
                  key={eachRepos.id}
                  repositoryDetails={eachRepos}
                />
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  renderNoDataFoundView = () => (
    <div className="no-data-container">
      <img
        src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Group_7519_tmwxdh.png"
        alt="no data found"
        className="no-data-img"
      />
      <h1 className="no-data-heading">PAGE NOT FOUND</h1>
      <p className="no-data-text">
        {' '}
        We're sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <Link to="/">
        <button className="go-to-Home-button" type="button">
          Go To Home
        </button>
      </Link>
    </div>
  )

  renderOutPutView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstarints.failure:
        return this.renderFailureView()
      case apiStatusConstarints.success:
        return this.renderSuccessView()
      case apiStatusConstarints.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {username} = this.props
    return (
      <>
        <Header />
        <div className="repos-bg-container">
          {username === ''
            ? this.renderNoDataFoundView()
            : this.renderOutPutView()}
        </div>
      </>
    )
  }
}

export default Repository
