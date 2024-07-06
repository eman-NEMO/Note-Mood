import React, { useState } from 'react';
import 'chart.js/auto';
import './Chart.scss'
import MoodLineChart from './LineChart';
import DonutChart from './PieChart'
import MoodBarChart from './BarChart'
import chartImg from '../../Assets/chartPage.svg'
import chartPageLogo from '../../Assets/chartPagelofo.svg'
import { delay, motion } from 'framer-motion';
import PopUpChart from './PopUpChart';
import { useBaseUrl } from '../../Context/BaseUrlContext';
import empty_img from '../../Assets/ERROR-chart.svg'
import logo from '../../Assets/logo-ver2.png'
import { Helmet } from 'react-helmet';
export default function ChartPage ()  {
  const {closeTimePop,setTimePop}=useBaseUrl()
  const {LineChartData,setLineChartData}=useBaseUrl()
  const {show,setshow}=useBaseUrl()
  const pageTransition = {
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      //   y: "100%"
    }
  };
 
  return (
    <>
     <motion.div
        className='container '
        initial="out"
        animate="in"
        exit="out"
        // variants={pageVariants}
        variants={pageTransition}
        transition={{ type: "tween", duration: .7, delay: .5 }}
      >
           <Helmet>
    <link rel="icon" href={logo} sizes="10x10" />
        <title>Chart Page</title>
       
       
      </Helmet>
    <div id='Chart_page'>
    <div className='row mt-3' >
      <div className='col-md-12 col-xl-12 col-lg-12 col-sm-12 col-12 d-flex'>
        <img src={chartPageLogo} alt="" className='chart_Icon_size' />
         <h3 className='ms-4 Chart_page_title_size mt-1'>Emotional Analysis Charts</h3>
      </div>
    </div>
    <div className='container'>
      {/* {console.log(show)} */}
      {show ?     <div> <div className='row  mt-5'  >
      <div className='col-md-12  d-flex justify-content-center mt-5'>
      <img src={chartImg} alt=""  className='Panner_img'/>
      </div>
      </div>
      <div className='row d-flex justify-content-center container'>
       <MoodLineChart/>
      </div>
      <div className='row container ' >
      <DonutChart/>
      <MoodBarChart/>
      </div></div>:<motion.div
className='container '
initial="out"
animate="in"
exit="out"
// variants={pageVariants}
variants={pageTransition}
transition={{ type: "tween", duration: .7, delay: .5 }}
>
<div className="container">
<div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
  <img src={empty_img} alt="No Topics" className="img-fluid" style={{ maxWidth: '35%' }} />
  <h3 className="mt-3 text-center">No Charts !</h3>
</div>

</div>
</motion.div>}
       {closeTimePop?  <PopUpChart/>:''}
      <div className='row  mb-5 '>
       <div className=''>  <button className='btn  buton_width' onClick={()=>{setTimePop(true)}}>Change Estimation Time</button></div>
      </div>
    </div>
    </div>
    </motion.div>
    </>
  );
};




