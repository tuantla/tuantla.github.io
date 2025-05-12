import React from 'react'
import {Home, Apps} from "$components/pages/pages"
import {Routes, Route} from "react-router";
import Profile from "$components/pages/profile";

function App() {
  return (
      <div id="main">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="apps" element={<Apps/>}/>
        </Routes>
      </div>
  )
}

export default App