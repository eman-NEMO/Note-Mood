import React from 'react'
import angry from '../../Assets/angry-2.svg'
import normal from '../../Assets/Normal-2.svg'
export default function RegsterUpImg() {
  return (
   <>
       <div className='Images invisible-on-small-screens'>
       <div className='position-absolute NormalPos'>
                  <img src={normal} alt="" className='Anger_size' />
            </div>
            <div className='position-absolute  AngerPos '>
                  <img src={angry} alt=""  className='Anger_size'/>
            </div>
       </div>
   
   
   </>
  )
}
