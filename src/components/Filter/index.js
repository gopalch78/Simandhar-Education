const Filter = props => {
  const {typesList} = props

  return (
    <div>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="unOrder-list-container">
        {typesList.map(eachItem => (
          <li className="list-elements" key={eachItem.typeId}>
            <input type="checkbox" id="true" value={eachItem.typeId} />
            <label htmlFor={eachItem.typeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Filter
