import React from "react"
import { PreferenceMap } from 'components/Results/consts'

class Preference extends React.Component {
  onChangeSelect = (ev) => {
    const { setSortBy } = this.props
    setSortBy(ev.target.value)
  }
  render() {
    return (
      <div className="preference-container">
          <select defaultValue="relevance" onChange={this.onChangeSelect}>
            {PreferenceMap && Object.keys(PreferenceMap).map((option) => {
              return <option key={option} value={option}>{PreferenceMap[option]}</option>
            })}
          </select>
        </div>
    )
  }
}

export default Preference