import {Component} from 'react'

import {TailSpin} from 'react-loader-spinner'

import PublicHolidaysItem from '../PublicHolidaysItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PublicHolidays extends Component {
  state = {
    holidaysData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getPublicHolidaysData()
  }

  getPublicHolidaysData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const holidaysUrl = `https://date.nager.at/api/v2/publicholidays/2020/US?`
    const options = {
      method: 'GET',
    }
    const response = await fetch(holidaysUrl, options)
    const data = await response.json()

    const updatedData = data.map(eachHoliday => ({
      date: eachHoliday.date,
      fixed: JSON.stringify(eachHoliday.fixed),
      global: JSON.stringify(eachHoliday.global),
      localName: eachHoliday.localName,
      name: eachHoliday.name,
      type: eachHoliday.type,
    }))
    if (response.ok === true) {
      this.setState({
        holidaysData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  //    onChangeMonthInput = event => {
  //     const {holidaysData} = this.state
  //     const month = holidaysData.map(each => each.date)
  //     const getMonths = []
  //     month.forEach(element => {
  //       getMonths.push(element.slice(5, 7))
  //     })

  //     this.setState({monthInput: event.target.value})
  //   }

  onChangeGlobal = event => {
    const {holidaysData} = this.state

    if (event.target.checked) {
      const updatedHolidays = holidaysData.filter(
        each => each.global === 'true',
      )

      this.setState({holidaysData: updatedHolidays})
    } else {
      this.getPublicHolidaysData()
    }
  }

  onChangeFixed = event => {
    const {holidaysData} = this.state

    if (event.target.checked) {
      const updatedHolidays = holidaysData.filter(each => each.fixed === 'true')
      this.setState({holidaysData: updatedHolidays})
    } else {
      this.getPublicHolidaysData()
    }
  }

  renderHolidays = () => {
    const {holidaysData, searchInput} = this.state

    const searchResultsByLocalName = holidaysData.filter(
      each =>
        each.localName.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.date.slice(5, 7).toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="ul-container">
        {searchResultsByLocalName.map(each => (
          <PublicHolidaysItem key={each.id} PublicHolidaysDetails={each} />
        ))}
      </ul>
    )
  }

  retryData = () => this.getPublicHolidaysData()

  renderFailureView = () => (
    <div className="failure-view-container">
      <h1 className="error-message">Something Went Wrong</h1>
      <button type="button" onClick={this.retryData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading">
      <TailSpin color="#0284c7" height={40} type="ThreeDots" width={80} />
    </div>
  )

  renderPublicHolidays = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHolidays()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Public Holidays</h1>
        <div className="search-container">
          <input
            type="search"
            placeholder="Local Name ,Month"
            className="search-bar"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
        </div>

        <div className="input-container">
          <input type="checkbox" id="global" onClick={this.onChangeGlobal} />
          <label htmlFor="global" className="global">
            Global
          </label>

          <input type="checkbox" id="fixed" onChange={this.onChangeFixed} />
          <label htmlFor="fixed" className="fixed">
            Fixed
          </label>
        </div>

        <li className="list-of-items">
          <p className="paragraph"> date</p>

          <p className="paragraph">fixed</p>

          <p className="paragraph">global</p>

          <p className="paragraph">localName</p>

          <p className="paragraph">name</p>

          <p className="paragraph">type</p>
        </li>

        {this.renderPublicHolidays()}
      </div>
    )
  }
}

export default PublicHolidays
