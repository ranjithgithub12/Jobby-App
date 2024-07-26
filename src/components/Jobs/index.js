import './index.css'
import {Component} from 'react'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FilterGroup from '../FilterGroup'
import CompanyDetails from '../CompanyDetails'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    api1: '',
    api2: '',
    searchInput: '',
    apiStatusProfile: apiStatusConstant.initial,
    apitStatusJobs: apiStatusConstant.initial,
    jobType: [],
    jobSalary: [],
  }

  componentDidMount() {
    this.getUserProfile()
    this.getJobsDetails()
  }

  getUserProfile = async () => {
    this.setState({apiStatusProfile: apiStatusConstant.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiURL1 = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiURL1, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        apiStatusProfile: apiStatusConstant.success,
        api1: updatedData,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstant.success})
    }
  }

  getJobsDetails = async () => {
    const {jobType, jobSalary, searchInput} = this.state
    const updateJobType = jobType.join(',')

    this.setState({apitStatusJobs: apiStatusConstant.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiURL2 = `https://apis.ccbp.in/jobs?employment_type=${updateJobType}&minimum_package=${jobSalary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURL2, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJobs => ({
        companyLogoUrl: eachJobs.company_logo_url,
        employmentType: eachJobs.employment_type,
        id: eachJobs.id,
        jobDescription: eachJobs.job_description,
        location: eachJobs.location,
        packagePerAnnum: eachJobs.package_per_annum,
        rating: eachJobs.rating,
        title: eachJobs.title,
      }))
      this.setState({
        api2: updatedData,
        apitStatusJobs: apiStatusConstant.success,
      })
    } else {
      this.setState({apitStatusJobs: apiStatusConstant.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  renderSearchMobile = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          value={searchInput}
          className="search-input"
          onChange={this.onChangeSearch}
          onKeyDown={this.onEnterSearch}
          placeholder="Search"
        />
        <button type="button" data-testid="searchButton" aria-label="search">
          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  renderSearchDesktop = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          value={searchInput}
          className="search-input"
          onChange={this.onChangeSearch}
          onKeyDown={this.onEnterSearch}
          placeholder="Search"
        />
        <button type="button" data-testid="searchButton" aria-label="search">
          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  onClickRetryJob = () => {
    this.getJobsDetails()
  }

  renderLoadingJobs = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobSuccess = () => {
    const {api2} = this.state
    const showNoJobMessage = api2.length > 0

    return showNoJobMessage ? (
      <ul className="unorder-company-details">
        {api2.map(eachCompany => (
          <CompanyDetails eachCompany={eachCompany} id={eachCompany.id} />
        ))}
      </ul>
    ) : (
      <div className="no-job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-content">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-content">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failure-retry-button" onClick={this.onClickRetryJob}>
        Retry
      </button>
    </div>
  )

  renderAllJobDetails = () => {
    const {apitStatusJobs} = this.state

    switch (apitStatusJobs) {
      case apiStatusConstant.success:
        return this.renderJobSuccess()
      case apiStatusConstant.failure:
        return this.renderJobFailure()
      case apiStatusConstant.loading:
        return this.renderLoadingJobs()
      default:
        return null
    }
  }

  onClickRetry = () => {
    this.getUserProfile()
  }

  renderProfileSuccess = () => {
    const {api1} = this.state
    const {name, profileImageUrl, shortBio} = api1

    return (
      <div className="profile-contianer">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <button className="retry-button" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderLoadingFailure = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatusProfile} = this.state

    switch (apiStatusProfile) {
      case apiStatusConstant.success:
        return this.renderProfileSuccess()
      case apiStatusConstant.failure:
        return this.renderProfileFailure()
      case apiStatusConstant.loading:
        return this.renderLoadingFailure()
      default:
        return null
    }
  }

  searchEmploymentType = employmentTypeId => {
    this.setState(prevState => {
      // Check if the employment type is already in the array
      const isAlreadyIncluded = prevState.jobType.includes(employmentTypeId)

      // If it's included, remove it; otherwise, add it
      const updatedJobType = isAlreadyIncluded
        ? prevState.jobType.filter(type => type !== employmentTypeId) // Remove the employment type
        : [...prevState.jobType, employmentTypeId] // Add the employment type

      return {jobType: updatedJobType}
    }, this.getJobsDetails)
  }

  searchSalaryRange = salaryRangeId => {
    this.setState(prevState => {
      const isAlreadyIncluded = prevState.jobSalary.includes(salaryRangeId)

      const updatedData = isAlreadyIncluded
        ? prevState.jobSalary.filter(type => type !== salaryRangeId)
        : [...prevState.jobSalary, salaryRangeId]

      return {jobSalary: updatedData}
    }, this.getJobsDetails)
  }

  changeJobInput = value => {
    this.setState({jobSearch: value})
  }

  enterSearchJob = () => {
    this.getJobsDetails()
  }

  render() {
    return (
      <div className="jobs-page-contianer">
        <Header />
        <div className="jobs-container">
          <div className="filter-group">
            <div className="input-mobile-view">{this.renderSearchMobile()}</div>
            <div className="profile-container-box">
              {this.renderProfileDetails()}
            </div>
            <FilterGroup
              onsearchEmploymentType={this.searchEmploymentType}
              onsearchSalaryRange={this.searchSalaryRange}
              onchangeJobInput={this.changeJobInput}
              onenterSearchJob={this.enterSearchJob}
            />
          </div>
          <div className="job-group">
            <div className="input-search-desktop">
              {this.renderSearchDesktop()}
            </div>
            {this.renderAllJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
