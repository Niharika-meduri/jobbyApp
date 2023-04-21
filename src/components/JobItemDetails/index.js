import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class JobItemDetails extends Component {
  state = {
    detailsData: {},
  }

  componentDidMount = () => {
    this.getDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills,
    title: data.title,
  })

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({detailsData: fetchedData})
    }
  }

  render() {
    const {detailsData} = this.state
    console.log(detailsData)
    return (
      <div>
        <h1>job description</h1>
      </div>
    )
  }
}

export default JobItemDetails
