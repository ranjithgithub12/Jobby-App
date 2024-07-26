import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home-page-container">
    <Header />
    <div className="home-container">
      <h1 className="header-heading">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="header-descripition">
        Millions of people are searching for jobs, salary, information, company
        reviews. Find the jobs that fits your ability and potential.
      </p>
      <Link to="/jobs">
        <button className="header-button">Find Jobs</button>
      </Link>
    </div>
  </div>
)

export default Home
