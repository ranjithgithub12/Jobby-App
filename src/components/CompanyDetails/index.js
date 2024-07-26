import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {HiOutlineBriefcase} from 'react-icons/hi'
import {MdLocationOn} from 'react-icons/md'

const CompanyDetails = props => {
  const {eachCompany} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachCompany

  return (
    <Link to={`/jobs/${id}`} className="link-menu">
      <li className="list-company-details">
        <div className="logo-type-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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

        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default CompanyDetails
