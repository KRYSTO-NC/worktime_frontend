import React from 'react'
import './Home.css'
import Background from '../../components/shared/Background/Background'
import Spinner from '../../components/shared/spinner/Spinner'


function Home() {
  return (
    <Background>
{/* <Spinner/> */}
      <div className="title">
        <h1>Worktime</h1>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        vero pariatur quis, blanditiis corrupti assumenda illo. Nemo molestiae
        sapiente minima illum doloremque accusantium officiis! Quas at fuga
        accusamus dignissimos accusantium iure quis cupiditate ipsam. Laboriosam
        ab nihil nam impedit molestiae voluptates natus. Placeat recusandae
        exercitationem vitae obcaecati quis fugiat nihil enim ea ut suscipit
        eaque illo minus expedita inventore mollitia, minima distinctio
        aspernatur voluptate delectus ducimus sunt perspiciatis accusantium.
        Quis cum porro temporibus blanditiis, repellendus optio facere, qui
        consectetur eos voluptate nulla at quo ducimus consequuntur, labore
        facilis maxime rem alias impedit! Laborum, corrupti qui at maxime
        similique quia saepe?
      </p>
      <button className="btn">Découvrir</button>
    </Background>
  )
}

export default Home
