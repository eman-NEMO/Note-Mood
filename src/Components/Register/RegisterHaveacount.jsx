import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterHaveacount() {
  return (
    <div className='row mt-3'>
        <div className='col-md-6 col-xl-7 col-lg-7 col-sm-5 mt-0'></div>
        <div className='col-md-6 col-xl-5 col-lg-5 col-sm-7 mb-5  '>
        <div className=" d-flex justify-content-center align-items-center sinUp_font_size " >
                        <span>Already have an account ?</span>
                        <Link className='text-decoration-none ms-2 link_color' to="/">Sign in</Link>
                    </div>
        </div>
    </div>
  )
}
