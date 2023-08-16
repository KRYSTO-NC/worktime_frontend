import React from 'react'
import Header from '../../Header/Header'
import './Background.css'
function Background({children}) {
  return (
    <main className='home-main'>
            <div className="overlayBG"></div>
                    <Header/>
            <div className="overlayTxtB">
                <div className="content">     
                  {children}
                </div>
            </div>
        </main>
  )
}

export default Background