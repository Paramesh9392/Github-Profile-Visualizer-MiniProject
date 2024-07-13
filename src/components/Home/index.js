import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink, IoMdSearch} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import UsernameContext from '../../Context/UsernameContext'
import Header from '../Header'

import './index.css'

const apiStatusConstarints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    wrongUserName: false,
    userProfileData: [],
    apiStatus: apiStatusConstarints.initial,
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.getProfileDetails()
    }
  }

  getProfileDetails = async () => {
    const {username} = this.props
    this.setState({apiStatus: apiStatusConstarints.inProgress})

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        company: data.company,
        createdAt: data.created_at,
        email: data.email,
        eventsUrl: data.events_url,
        followers: data.followers,
        followersUrl: data.followers_url,
        following: data.following,
        followingUrl: data.following_url,
        gistsUrl: data.gists_url,
        gravatarId: data.gravatar_id,
        hireable: data.hireable,
        htmlUrl: data.html_url,
        id: data.id,
        location: data.location,
        login: data.login,
        name: data.name,
        nodeId: data.node_id,
        organizationsUrl: data.organizations_url,
        publicGists: data.public_gists,
        publicRepos: data.public_repos,
        receivedEventsUrl: data.received_events_url,
        reposUrl: data.repos_url,
        siteAdmin: data.site_admin,
        starredUrl: data.starred_url,
        subscriptionsUrl: data.subscriptions_url,
        twitterUsername: data.twitter_username,
        type: data.type,
        updatedAt: data.updated_at,
        url: data.url,
      }
      this.setState(prevState => ({
        apiStatus: apiStatusConstarints.success,
        userProfileData: [...prevState.userProfileData, formattedData],
      }))
    } else {
      this.setState({
        apiStatus: apiStatusConstarints.failure,
        wrongUserName: true,
      })
    }
  }

  renderInitialResult = () => (
    <div className="home-result-container">
      <img
        src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Frame_8830_j8hzju.png"
        alt="github profile visulaizer"
        className="home-img"
      />
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
        onClick={this.getProfileDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="home-result-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {userProfileData} = this.state
    const object = userProfileData[0]
    const {
      avatarUrl,
      name,
      login,
      bio,
      blog,
      followers,
      following,
      publicRepos,
      company,
      location,
      organizationsUrl,
    } = object

    return (
      <div className="profile-container">
        <img src={avatarUrl} alt="avatar url" className="avatarUrl" />
        <p className="profile-name">{name}</p>
        <p className="login">{login}</p>
        <p className="bio">{bio}</p>

        <div className="follow-details-container">
          <div className="follows-container">
            <p className="color-heading">{followers}</p>
            <p className="text">FOLLOWERS</p>
          </div>
          <hr className="hr-line" />
          <div className="follows-container">
            <p className="color-heading">{following}</p>
            <p className="text">FOLLOWING</p>
          </div>

          <hr className="hr-line" />

          <div className="follows-container">
            <p className="color-heading">{publicRepos}</p>
            <p className="text">PUBLIC REPOS</p>
          </div>
        </div>

        <div className="company-details-container">
          <div className="company-container">
            <p className="color-heading">Company</p>
            <div className="icon-container">
              <RiBuildingLine className="profile-icons" />
              <p className="text">{company}</p>
            </div>
          </div>

          <div className="company-container">
            <p className="color-heading">Company Url</p>
            <div className="icon-container">
              <IoMdLink className="profile-icons" />
              <p className="text">{organizationsUrl}</p>
            </div>
          </div>

          <div className="company-container">
            <p className="color-heading">Location</p>
            <div className="icon-container">
              <IoLocationOutline className="profile-icons" />
              <p className="text">{location}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFinalOutPutView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstarints.initial:
        return this.renderInitialResult()
      case apiStatusConstarints.success:
        return this.renderSuccessView()
      case apiStatusConstarints.failure:
        return this.renderFailureView()
      case apiStatusConstarints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <UsernameContext.Consumer>
        {value => {
          const {wrongUserName} = this.state
          const inputContainerClassName = wrongUserName
            ? 'WrongUserInputClassName'
            : 'UserInputClassName'
          const {username, changeUserName} = value

          const onChangeUserName = event => {
            changeUserName(event.target.value)
          }

          return (
            <>
              <Header />
              <div className="home-container">
                <div className="app-container">
                  <div className="input-container">
                    <input
                      type="type"
                      value={username}
                      className={inputContainerClassName}
                      onChange={onChangeUserName}
                      onKeyPress={this.onEnterButton}
                      placeholder="Enter Github Username"
                    />
                    <button
                      className="search-icon-button"
                      type="button"
                      onClick={this.getProfileDetails}
                      data-testid="searchButton"
                    >
                      {}
                      <IoMdSearch className="search-icon" />
                    </button>
                  </div>
                  {wrongUserName ? (
                    <p className="errorMsg">Enter the valid github username</p>
                  ) : null}

                  <div className="result-container">
                    {this.renderFinalOutPutView()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </UsernameContext.Consumer>
    )
  }
}

export default Home
