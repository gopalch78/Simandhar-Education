import './index.css'

const PublicHolidaysItem = props => {
  // toggleIsChecked, isChecked
  const {PublicHolidaysDetails, toggleIsChecked, isChecked} = props
  const {date, fixed, global, localName, name, type} = PublicHolidaysDetails
  const checkedClassName = isChecked
    ? 'checkbox-element-active'
    : 'checkbox-element'

  const onClickChecked = () => {
    toggleIsChecked(global)
  }

  return (
    <>
      <li className="list-item-container">
        <input
          type="checkbox"
          className={checkedClassName}
          onChange={onClickChecked}
          value={global}
          name={global}
          checked={PublicHolidaysDetails?.isChecked || false}
        />
        <p className="item">{date}</p>
        <p className="item">{fixed}</p>
        <p className="item">{global}</p>
        <p className="item">{localName}</p>
        <p className="item">{name}</p>
        <p className="item">{type}</p>
      </li>
    </>
  )
}

export default PublicHolidaysItem
