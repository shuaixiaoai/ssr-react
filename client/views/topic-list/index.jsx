import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'

import { AppState } from '../../store/app-state'

@inject('appState')
@observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {
    // do something here
  }

  changeName(e) {
    this.props.appState.name = e.target.value
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
}

TopicList.proptypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
