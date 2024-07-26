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

const FilterGroup = props => {
  const {onsearchEmploymentType, onsearchSalaryRange} = props

  const onClickInputType = employmentTypeId => {
    onsearchEmploymentType(employmentTypeId)
  }

  const onClickInputSalary = salaryRangeId => {
    onsearchSalaryRange(salaryRangeId)
  }
  return (
    <div>
      <hr />
      <h1 className="filter-heading">Type of Employment</h1>
      {employmentTypesList.map(eachLabel => (
        <ul className="unorder-type-salary" key={eachLabel.employmentTypeId}>
          <li className="list-of-type-salary">
            <input
              type="checkbox"
              id={eachLabel.label}
              onClick={() => onClickInputType(eachLabel.employmentTypeId)}
            />
            <label className="label-content" htmlFor={eachLabel.label}>
              {eachLabel.label}
            </label>
          </li>
        </ul>
      ))}
      <hr />

      <h1 className="filter-heading">Salary Range</h1>
      {salaryRangesList.map(eachLabel => (
        <ul className="unorder-type-salary" key={eachLabel.salaryRangeId}>
          <li className="list-of-type-salary">
            <input
              type="checkbox"
              id={eachLabel.label}
              className="salary-checkbox"
              onClick={() => onClickInputSalary(eachLabel.salaryRangeId)}
            />
            <label className="label-content" htmlFor={eachLabel.label}>
              {eachLabel.label}
            </label>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default FilterGroup
