import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {HiOutlineBriefcase} from 'react-icons/hi'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsItemDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, jobItem: [], similarJob: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiURL = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiURL, options)

    if (response.ok === true) {
      const data = await response.json()
      const update = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = update
      console.log(similarJobs)
      const updatedDatajob = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        title: jobDetails.title,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      const updatedDataSimilarJob = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        id: eachItem.id,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobItem: updatedDatajob,
        similarJob: updatedDataSimilarJob,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container-job">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-content">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.onClickRetry} className="failure-retry-button">
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobItem, similarJob} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      title,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobItem

    const updatedDataSkills = skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))

    const updatedLifeCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    return (
      <div className="total-contianer-job-item">
        <div className="job-item-details-success">
          <div className="logo-type-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="employment-rating-container">
              <h1 className="employment-type">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-color" />
                <p className="rating-number">{rating}</p>
              </div>
            </div>
          </div>

          <div className="loaction-type-package-contaienr">
            <div className="location-type-container">
              <div className="location-type">
                <MdLocationOn />
                <p className="content-type-location">{location}</p>
              </div>
              <div className="location-type">
                <HiOutlineBriefcase />
                <p className="content-type-location">{employmentType}</p>
              </div>
            </div>
            <p className="salary-package">{packagePerAnnum}</p>
          </div>

          <hr className="horizontal-line" />

          <div className="job-item-description-container">
            <div className="heading-vist-link-contianer">
              <h1 className="job-item-description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="company-visit-link">
                Visit
                <span>
                  <FiExternalLink />
                </span>
              </a>
            </div>
            <p className="job-item-description">{jobDescription}</p>
          </div>

          <h1 className="skill-heading">SKills</h1>
          <ul className="unorder-skills">
            {updatedDataSkills.map(eachSkills => (
              <Skills eachSkills={eachSkills} key={eachSkills.name} />
            ))}
          </ul>

          <h1 className="life-heading">Life at Company</h1>
          <div className="life-description-image-container">
            <p className="life-description">{updatedLifeCompany.description}</p>
            <img
              src={updatedLifeCompany.imageUrl}
              alt="life at company"
              className="life-company-image"
            />
          </div>
        </div>

        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="unorder-similar-job">
          {similarJob.map(eachJobs => (
            <SimilarJobs eachJobs={eachJobs} key={eachJobs.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.renderLoading()
      case apiStatusConstant.success:
        return this.renderJobItemDetails()
      case apiStatusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {similarJob} = this.state

    return (
      <div>
        <Header />
        <div className="job-item-details-container">
          {this.renderAllJobDetails()}
        </div>
      </div>
    )
  }
}

export default JobsItemDetails
