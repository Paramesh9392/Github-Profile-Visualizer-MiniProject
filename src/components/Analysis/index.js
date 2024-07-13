import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LineChartPie from '../LineChartPie'
import LaunguagesReposPie from '../LaunguagesReposPie'
import LanguagesCommitCountPie from '../LanguagesCommitCountPie'
import RepoCommitCountPie from '../RepoCommitCountPie'

import './index.css'

const apiStatusConstarints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Analysis extends Component {
  state = {
    apiStatus: apiStatusConstarints.initial,
    analysisData: {},
  }

  componentDidMount() {
    this.getAnalysisData()
  }

  getAnalysisData = async () => {
    const {username} = this.props
    this.setState({apiStatus: apiStatusConstarints.inProgress})

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=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`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data

      this.setState({
        apiStatus: apiStatusConstarints.success,
        analysisData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstarints.failure})
    }
  }

  renderSuccessView = () => {
    const {analysisData} = this.state
    const analysisDataLength = Object.keys(analysisData).length
    const {
      quarterCommitCount,
      langRepoCount,
      langCommitCount,
      repoCommitCount,
    } = analysisData

    const quarterCommitData = []
    const quarterCommitKeyNames = Object.keys(quarterCommitCount)
    quarterCommitKeyNames.forEach(keyName => {
      quarterCommitData.push({
        name: keyName,
        commits: quarterCommitCount[keyName],
      })
    })
    const quarterCommitSlicedData = quarterCommitData
      .sort(this.descendingSort)
      .slice(0, Object.keys(quarterCommitCount).length)
    console.log(quarterCommitSlicedData)

    const langRepoData = []
    const langRepoKeyNames = Object.keys(langRepoCount)
    langRepoKeyNames.forEach(keyName => {
      langRepoData.push({name: keyName, value: langRepoCount[keyName]})
    })
    const langRepoSlicedData = langRepoData
      .sort(this.descendingSort)
      .slice(0, Object.keys(langRepoCount).length)

    const langCommitData = []
    const langCommitKeyNames = Object.keys(langCommitCount)
    langCommitKeyNames.forEach(keyName => {
      langCommitData.push({name: keyName, value: langCommitCount[keyName]})
    })
    const langCommitSlicedData = langCommitData
      .sort(this.descendingSort)
      .slice(0, Object.keys(langCommitCount).length)

    const repoCommitData = []
    const RepoCommitKeyNames = Object.keys(repoCommitCount)
    RepoCommitKeyNames.forEach(keyName => {
      repoCommitData.push({name: keyName, value: repoCommitCount[keyName]})
    })
    const slicedData = repoCommitData.sort(this.descendingSort).slice(0, 10)

    return (
      <div className="analysisContainer">
        {analysisDataLength === 0 ? (
          <div className="no-repositories-container">
            <img
              src="https://res.cloudinary.com/ddbzrs61m/image/upload/v1720465281/Layer_3_kooxjj.png"
              alt="no repositories"
              className="no-repos-img"
            />
            <h1 className="no-repos-text">No Analysis Found!</h1>
          </div>
        ) : (
          <div>
            <div className="analysis-linechart-container">
              <LineChartPie linechartDetails={quarterCommitData} />
            </div>

            <div className="pie-languages-reposCount-container">
              <h1 className="pie-heading">Language Per Repos</h1>
              <LaunguagesReposPie
                languagesReposPieDetails={langRepoSlicedData}
              />
            </div>

            <div className="pie-languages-commitCount-container">
              <h1 className="pie-heading">Language per Commits</h1>
              <LanguagesCommitCountPie
                pieCommitCountDetails={langCommitSlicedData}
              />
            </div>

            <div className="commits-per-repo-container">
              <h1 className="pie-heading">Commits Per Repo (Top 10)</h1>
              <RepoCommitCountPie repoCommitCountDetails={slicedData} />
            </div>
          </div>
        )}
      </div>
    )
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

  renderFinalOutputView = () => {
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
    const {username} = this.props

    return (
      <>
        <Header />
        <div className="analysis-app-container">
          {username === '' ? (
            this.renderNoDataFoundView()
          ) : (
            <div className="analysis-success-view-container">
              <h1 className="repos-heading">Analysis</h1>
              {this.renderFinalOutputView()}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Analysis
