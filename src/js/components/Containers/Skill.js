import React from 'react'
const Skill = props => (
    <>
       <div className = "skill">
           <div className = "icon" style = {{backgroundImage:'url(' +props.icon + ')'}}>
           </div>
           <div className = "title">{props.title}</div>
       </div>
    </>
 )

 export default Skill