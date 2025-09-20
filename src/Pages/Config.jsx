import React from 'react'
import '../Style/index.css'
import Sidebar from '../Components/Sidebar'


function Config() {
  return (
   <div className="app-container">
      <Sidebar/>
      <div className="main-content">
        <h1>Welcome to API Management</h1>
        <p>This is where your trace logs or other content will appear.</p>
      </div>
    </div>
  )
}

export default Config
