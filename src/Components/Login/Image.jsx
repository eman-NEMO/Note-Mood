import React from 'react'
import Style from "./Login.module.css";
import './Login.scss'
import login_img from "../../Assets/right image.svg"
export default function Image() {
  return (
    <>
      {/* <div className='col-md-1'></div> */}
      <div className=" col-lg-6  col-md-12 col-sm-12 col-12 col-xl-6 animate-right form container">
        <div className={` d-flex justify-content-center ps-3 pe-3 pt-3`}>
          <div className="ms-auto ">
          <img src={login_img} alt="" className={`${Style.ImgSize} w-100 `} />
         
          </div>
        </div>
      </div>
    </>
  )
}
