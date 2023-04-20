import './index.css'

const FiltersGroup = props => {
  const renderEmploymentList = () => {
    const {employmentList, onChangeEmploymentFilters} = props

    return employmentList.map(employment => {
      const onClickEmpFilter = () => {
        onChangeEmploymentFilters(`${employment.employmentTypeId}`)
      }

      return (
        <li key={employment.employmentTypeId}>
          <input
            type="checkbox"
            id={employment.employmentTypeId}
            onChange={onClickEmpFilter}
          />
          <label
            htmlFor={employment.employmentTypeId}
            className="filter-labels"
          >
            {employment.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeList = () => {
    const {salaryList, onChangeSalaryFilters} = props

    return salaryList.map(salary => {
      const onClickEmpFilter = () => {
        onChangeSalaryFilters(salary.salaryRangeId)
      }

      return (
        <li key={salary.salaryRangeId} className="check-box">
          <input
            type="radio"
            id={salary.salaryRangeId}
            onChange={onClickEmpFilter}
          />
          <label htmlFor={salary.salaryRangeId} className="filter-labels">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-container">
      <h1 className="headings">Type of Employment</h1>
      <ul className="filters-group">{renderEmploymentList()}</ul>
      <hr className="line" />
      <h1 className="headings">Salary Range</h1>
      <ul className="filters-group">{renderSalaryRangeList()}</ul>
    </div>
  )
}

export default FiltersGroup
