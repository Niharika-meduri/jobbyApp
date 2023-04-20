import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const profileStatusConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profile: [],
    searchInput: '',
    employmentType: '',
    salaryRange: '',
    apiStatus: apiStatusConstants.inProgress,
    profileStatus: profileStatusConst.inProgress,
  }

  componentDidMount = () => {
    this.getProfile()
    this.getJobsData()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.profile_details
      const profileData = {
        name: updatedData.name,
        profileImageUrl: updatedData.profile_image_url,
        shortBio: updatedData.short_bio,
      }
      this.setState({
        profile: profileData,
        profileStatus: profileStatusConst.success,
      })
    } else {
      this.setState({profileStatus: profileStatusConst.failure})
    }
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, salaryRange, employmentType} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickEmploymentFilter = id => {
    const {employmentType} = this.state
    let updatedFilter
    if (employmentType === '') {
      updatedFilter = id
    } else {
      updatedFilter = `${employmentType},${id}`
    }

    this.setState(
      {
        employmentType: updatedFilter,
      },
      this.getJobsData,
    )
  }

  onClickSalaryFilter = id => {
    const {salaryRange} = this.state
    let updatedRange
    if (salaryRange === '') {
      updatedRange = id
    } else {
      updatedRange = `${salaryRange},${id}`
    }

    this.setState({salaryRange: updatedRange}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsData)
  }

  profileSuccessView = () => {
    const {profile} = this.state
    console.log(profile.name)
    return (
      <div className="profile-container">
        <img src={profile.profileImageUrl} className="profile" alt="profile" />
        <h1 className="name">{profile.name}</h1>
        <p className="bio">{profile.shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  profileFailuerView = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  renderProfile = () => {
    const {profile, profileStatus} = this.state
    console.log(profileStatus)
    switch (profileStatus) {
      case profileStatus.success:
        return this.profileSuccessView()
      case profileStatus.inProgress:
        return this.renderLoadingView()
      case profileStatus.failure:
        return this.profileFailuerView()
      default:
        return null
    }
  }

  jobsListSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-cards-list">
        {jobsList.map(eachJob => (
          <JobCard details={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobDetails = () => {
    const {jobsList, apiStatus} = this.state

    switch (apiStatus) {
      case apiStatus.inProgress:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.jobsListSuccessView()
      default:
        return null
    }
  }

  renderFilters = () => (
    <ul>
      <FiltersGroup
        employmentList={employmentTypesList}
        salaryList={salaryRangesList}
        onChangeEmploymentFilters={this.onClickEmploymentFilter}
        onChangeSalaryFilters={this.onClickSalaryFilter}
      />
    </ul>
  )

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filters-container">
            {this.renderProfile()}
            {this.renderFilters()}
          </div>
          <div className="job-oppurtunities-container">
            <div className="search-container">
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                className="search-bar"
                placeholder="Search"
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
