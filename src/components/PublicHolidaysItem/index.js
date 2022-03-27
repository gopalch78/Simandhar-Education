import './index.css'

const PublicHolidaysItem = props => {
  // toggleIsChecked, isChecked
  const {PublicHolidaysDetails} = props
  const {date, fixed, global, localName, name, type} = PublicHolidaysDetails

  return (
    <>
      <li className="list-item-container">
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
