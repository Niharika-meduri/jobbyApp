import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnum,
    rating,
    title,
  } = details

  return (
    <li className="job-card" key={id}>
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-details">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="job-role-rating-container">
            <h1 className="role">{title}</h1>
            <div className="rating">
              <FaStar className="star" />
              <p className="number">{rating}</p>
            </div>
            <div className="location-details">
              <div className="landmark-details">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="landmark-details">
                <BsBriefcaseFill />
                <p className="location">{employmentType}</p>
              </div>
              <p className="package">{packagePerAnum}</p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="desc-cont">
          <h1 className="title">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobsCard
