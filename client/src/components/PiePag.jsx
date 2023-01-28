import React from 'react'
import style from './PiePag.module.css'
function PiePag() {
  return (
    <div className={style.pie}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F08200" fill-opacity="1" d="M0,96L40,106.7C80,117,160,139,240,144C320,149,400,139,480,160C560,181,640,235,720,234.7C800,235,880,181,960,186.7C1040,192,1120,256,1200,245.3C1280,235,1360,149,1400,106.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
    </div>
  )
}

export default PiePag