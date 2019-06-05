import React, {Component} from 'react'
import { Skill } from "./Containers"
import axios from 'axios'



  class SkillSet extends Component {
   constructor(props) {
     super(props)
     this.state = {skills:[]}
   }

   componentDidMount() {
      axios.get('/data/skills.json')
      .then(({data}) => {
         console.log(data)
         this.setState(Object.assign({}, this.state, {skills: data}))
      })
   }

   render() {
     return (
      <div className = "skill-set">
         {this.state.skills.map(({skill, i}) => {
              return <Skill key ={i} icon = {skill.icon} title = {skill.title} />
         })}
      </div>
     )
   }
 }


export default SkillSet
