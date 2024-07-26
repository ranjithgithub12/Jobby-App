import './index.css'
import {FaStar} from 'react-icons/fa'
import {HiOutlineBriefcase} from 'react-icons/hi'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobs = props => {
  const {eachJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = eachJobs

  return (
    <li className="list-of-similar-job">
      <div className="similar-logo-contianer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo-image"
        />
        <div className="similar-title-contianer">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-rating-container">
            <FaStar className="star-color" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>

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
    </li>
  )
}

export default SimilarJobs
