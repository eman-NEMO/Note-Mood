import React from 'react'
import Style from './Header.module.css'
import logo from '../../Assets/logo.png'
export default function Header() {
  return (
    <>
       <div className={` bg-light  ${Style.head}`}>
          <div className='row container'>
            <div className={`col-lg-2 col-md-3 col-sm-4 col-3 mt-2 mb-2 `}>
              <img src={logo} alt="logo" className={` ${Style.logo}`} />
            </div>
            <div className=' col-lg-10 col-md-9 col-sm-8 col-9 d-flex'>
          </div>
        </div>
      </div>
    </>
  )
}
