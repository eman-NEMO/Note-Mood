import React from 'react'
import happy from '../../Assets/happy-2.svg'
import sad from '../../Assets/sad-2.svg'
import { motion } from 'framer-motion';

export default function RegisterDownImg() {

  const variants = {
    fromTop: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    },
    fromBottom: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    },
    fromLeft: {
        hidden: { opacity: 0, x: -100},
        visible: { opacity: 1, x: 0 }
    },
    fromRight: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    }
};
  return (
    <>
   
    <div className='invisible-on-small-screens'>
    {/* <motion.div  initial="hidden" animate="visible" transition={{ delay: 1.3 }}> */}
    <div className='position-absolute HappyPos '>
               <img src={happy} alt="" className='Anger_size ' />
         </div>
         {/* </motion.div> */}
         {/* <motion.div  initial="hidden" animate="visible" transition={{ delay: 1.4 }}> */}
         <div className='position-absolute SadPos'>
               <img src={sad} alt=""  className='Anger_size'/>
         </div>
         {/* </motion.div> */}
    </div>



</>
  )
}
