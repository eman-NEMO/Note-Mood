import React, { useEffect, useState } from 'react'
import './PopUp.scss'
import book from '../../../Assets/170744339808091-2 1.svg'
import all from '../../../Assets/images.svg'
import pen from '../../../Assets/Black-line1 1.svg'
import masaka from '../../../Assets/Black-shape 1.svg'
import mared from '../../../Assets/Line-Shape2 1.svg'
import close from '../../../Assets/ph_x-bold.svg'
import PopUpform from './PopUpform'
import  useData  from './Function.js';
import { faL } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import {useCloseJournals} from '../../../Context/JournalCloseContext'
export default function PopUp() {
  //let {PopUp,setPopUp}=props;

  
  const pageTransition = {
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      
    
    }
  };
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
     setTimeout(() => setisLoading(true), 100)
  })
  const  {clos ,setClose}=useCloseJournals()
  console.log(clos)
  return (
  <>
    <motion.div
      initial="out"
      animate="in"
      exit="out"
     // variants={pageVariants}
      variants={pageTransition} 
      transition={{ type: "tween", duration: .6 }}
    >

   {isLoading? 
   <div className='POPUP' id='PopUp' >
    {clos? <div className='ModContainer '>
      
    <div className='ModContent rounded-4'>
       <div className='d-flex '>
         <img src={book} alt="" className='m-4 book_width'  />
         <h5 className='write_journal'>Write New Journal</h5>
           
       </div>
       <PopUpform/>
       <div className='position-absolute close' onClick={()=>{setClose(false)}}> <i className="fa-regular fa-circle-xmark close_width fa-2xl" style={{color: '#12151c'}}></i></div>
    </div>
    <img src={mared} alt=""  className='position-absolute mared' />
    <img src={pen} alt="" className='position-absolute pen'  />
    <img src={masaka} alt=""  className='position-absolute masaka'/>
  </div>:''}
    </div>:''}
    </motion.div>
   
  </>
  )
}
