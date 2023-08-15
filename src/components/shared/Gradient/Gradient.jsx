import React from 'react'
import Header from '../../Header/Header'
import './gradient.css'
function Background({ children }) {
  return (
    <main className="home-mainG">
      <Header />
      <div className="overlayTxtb">
        <div className="content">{children}</div>
      </div>
    </main>
  )
}

export default Background
