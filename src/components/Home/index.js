import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-page-container">
        <div className="home-content">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs, salary
            information,company reviews.Find the job that fits your abilities
            and potential.
          </p>
          <button type="button" className="jobs-btn" onClick={findJobs}>
            <Link to="/" className="link-item">
              Find Jobs
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
