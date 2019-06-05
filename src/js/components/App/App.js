import React, { Component } from 'react'
import {SkillSet} from "$components/Containers/Containers"

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <>
        <div id = "main">
          <SkillSet />
        </div>
      </>
    )
  }
}
export default App