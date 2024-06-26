import React from 'react'
import blur from '../../Assets/blur2.svg'
import Q_A from '../../Assets/qestion_image.svg'
import Q_A_text from '../../Assets/Question and Answer.svg'
import write_journal from '../../Assets/write_journals.svg'
import search from '../../Assets/search_jornal.svg'
import know_yourself from '../../Assets/know_yourself.svg'
import helpCenter from  '../../Assets/helpCenter.svg'
import './Help.scss'
import "animate.css/animate.compat.css"
import ScrollAnimation from 'react-animate-on-scroll';
import write_journal_explain from '../../Assets/writeJournal_explanation.svg'
import new_journal_help from '../../Assets/newJournal_help.svg'
import save_button_help from '../../Assets/saveButton_help.svg'
import help_journal from '../../Assets/help_journal.svg'
import help_update_delete from '../../Assets/help_update_delete.svg'
import help_content from '../../Assets/help_journal_content.svg'
import help_1 from '../../Assets/help_journal_bar.svg'
import help_2 from '../../Assets/help_new_journal.svg'
import help_3 from '../../Assets/help_date_time.svg'
import help_4 from '../../Assets/help_save_btn.svg'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Help() {

  const variants = {
    fromTop: {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 }
    },
    fromBottom: {
        hidden: { opacity: 0, y: 350},
        visible: { opacity: 1, y: 0 }
    },
    fromIts: {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 }
    },
    fromLeft: {
        hidden: { opacity: 0, x: -350 },
        visible: { opacity: 1, x: 0 }
    },
    fromRight: {
        hidden: { opacity: 0, x: 350 },
        visible: { opacity: 1, x: 0 }
    }
};
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
    transition={{ type: "tween", duration: .7 ,delay:.3 }}
  >
<div className='container ' id='Main_Help_page'>
<div className=' container conscroll '>
    <div className='mainCon'>
    <div className='d-flex m-3'>
       <img src={helpCenter} alt="" />
      <p className='help ms-3'>Help Center</p>
    </div>
   <div className="container">
   
             <div className='row '>
             
           <div className='row'>
           <div className='col-xl-12 col-md-12 col-lg-12 mt-3 '>
           <motion.div variants={variants.fromTop} initial="hidden" animate="visible" transition={{ delay: .5 ,duration:.4 }}>
           <div className=' d-flex justify-content-center'><img src={Q_A} alt="" className=''/></div>
                </motion.div>
                
                    <div className='text-center'>
                    <motion.div variants={variants.fromRight} initial="hidden" animate="visible" transition={{ delay: 1 ,duration:.5 , type:'keyframes'}}>
                  <h1>Questions And Answer</h1>
                  </motion.div>

                  <motion.div variants={variants.fromLeft} initial="hidden" animate="visible" transition={{ delay: 1.4 ,duration:.5 , type:'keyframes'}}>
                  <p>We understand that sometimes you may encounter difficulties or have questions while using</p>
                 
                  </motion.div>
                  <motion.div variants={variants.fromLeft} initial="hidden" animate="visible" transition={{ delay: 1.7 ,duration:.5 , type:'keyframes'}}>
                  <p>our platform, and we’re here to assist you every step of the way.</p>
                 
                  </motion.div>
              
                  </div>
            </div>
   
           </div>
      
      
  
         <div className=' mt-5'>
         <div className='row mt-5 d-flex justify-content-center'>
             
       
         <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 text-center'>
         <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1.9 ,duration:.5 , type:'keyframes'}}>
                     <div className='text-center ps-3 pe-3'>
                     <div className=' d-flex justify-content-center'><img src={write_journal} alt="" className=''/></div>
                  <div className=' d-flex justify-content-center mt-2 '><p className='Icons_title'>Write Journals</p></div>
                 <div className=' d-flex justify-content-center ps-5 pe-5'><p>Write your diary journal easily at any time.</p></div>
                     </div>
                     </motion.div>
                 </div>
                 
            
        
                 <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12'>

                 <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 2.2 ,duration:.5 , type:'keyframes'}}>
                    <div className='  text-center ps-3 pe-3'>
                    <div className=' d-flex justify-content-center'><img src={know_yourself} alt="" className=''/></div>
                  <div className=' d-flex justify-content-center mt-2'><p className='Icons_title'>Know Yourself</p></div>
                 <div className=' d-flex justify-content-center ps-5 pe-5'><p>Get deeply insights about yourself from your journals.</p></div>
                    </div>
                    </motion.div>
                 </div>
           
                 <div className='col-xl-4 col-md-4 col-lg-4 col-sm-12 '>
                 <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 2.5 ,duration:.5 , type:'keyframes'}}>
                   <div className=' text-center ps-3 pe-3'>  
                    <div className=' d-flex justify-content-center'><img src={search} alt="" className=''/></div>
                  <div className=' d-flex justify-content-center mt-2'><p className='Icons_title'>Journaling Search </p></div>
                 <div className=' d-flex justify-content-center ps-5 pe-5'><p>Search about any old journals easily in efficient way.</p></div></div>
                 </motion.div>
                 </div>
       
           </div>
         </div>
           </div>
   </div>
    </div>

<div className='container mt-5 mb-5 '>
  <div className='row '>
    <div className='col-lg-6 col-xl-6 col-sm-12'>
 
      <div className="accordion " id="accordionExample1" >
        <div className="accordion-item mt-5">
          <h2 className="accordion-header" id="headingOne1">
            <button className="accordion-button  collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1" aria-expanded="false" aria-controls="collapseOne1">
                 <p className='accordion_title'>What makes this website special?
                 </p>
            </button>
          </h2>
          <div id="collapseOne1" className="accordion-collapse collapse " aria-labelledby="headingOne1" data-bs-parent="#accordionExample1">
            <div className="accordion-body">
             <div> 
                   <div className='row'>
                    <div className='col-xl-12 col-md-12'>
                         <div> <p>Think of this website as your personal reflection pool, allowing you to write down thoughts, feelings, and experiences, analyzing them to uncover hidden patterns and improve self-understanding.</p></div>
                   
                    </div>
                   </div>
             </div>
            </div>
          </div>
        </div>
        {/* </ScrollAnimation> */}
        <div className="accordion-item mt-5">
          <h2 className="accordion-header" id="headingTwo1">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo1" aria-expanded="false" aria-controls="collapseTwo1">
            <p className='accordion_title'>How to edit or delete existing journal?</p>
            </button>
          </h2>
          <div id="collapseTwo1" className="accordion-collapse collapse" aria-labelledby="headingTwo1" data-bs-parent="#accordionExample1">
            <div className="accordion-body">
            <div> 
                   <div className='row'>
                    <div className='col-xl-12 col-md-12'>


                         <div> <p>  <strong>1.</strong>go to Journals page, you can find his title is My Journaling Space.</p></div>
                     <div className='ms-5 mt-3 mb-3 d-flex justify-content-center'> <img src={help_journal} alt=""  /></div>
                     <div className='mt-5'>  <p><strong className='me-1 '>2.</strong>click on existing journal you want to edit or delete.</p></div>
                     <div className='d-flex align-items-center justify-content-center'><div className='ms-5 mt-3 mb-3 me-5'> <img src={help_content} alt=""  /></div></div>
                     <div className='mt-5'>  <p><strong className='me-1 '>3.</strong>now you can see all details of this journal, at the right bottom you will find delete and edit button, click on what you want.</p></div>
                     <div className='d-flex align-items-center justify-content-center'><div className='ms-5 mt-3 mb-3 me-5'> <img src={help_update_delete} alt=""  /></div></div>
                    </div>
                   </div>
             </div>
            </div>
          </div>
        </div>
        <div className="accordion-item mt-5 ">
          <h2 className="accordion-header" id="headingThree1">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree1" aria-expanded="false" aria-controls="collapseThree1">
            <p className='accordion_title'>What's the deal with the chart page?
            </p>
            </button>
          </h2>
          <div id="collapseThree1" className="accordion-collapse collapse" aria-labelledby="headingThree1" data-bs-parent="#accordionExample1">
            <div className="accordion-body">
            <div> 
                   <div className='row'>
                    <div className='col-xl-12 col-md-12'>


                      <div> <p>The chart page takes your report a step further and turns it into a visual masterpiece! You'll see cool charts and graphs that show trends in your entries. Did you write more about friends lately? Are you feeling more positive than usual? The charts will reveal these insights in a fun and easy-to-understand way. Think of it as your own personal data story the chart page enhances.
                      </p></div>
                   
                    </div>
                   </div>
             </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className='col-lg-6 col-xl-6 col-sm-12'>
      <div className="accordion" id="accordionExample2">
        <div className="accordion-item mt-5">
          <h2 className="accordion-header" id="headingOne2">
            <button className="accordion-button  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2" aria-expanded="false" aria-controls="collapseOne2">
            <p className='accordion_title'>How to Create My Journal ?</p>
            </button>
          </h2>
          <div id="collapseOne2" className="accordion-collapse collapse " aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
            <div className="accordion-body">
            <div> 
                   <div className='row'>
                    <div className='col-xl-12 col-md-12'>


                         <div> <p>  <strong>1.</strong>go to Journals page, you can find his title is My Journaling Space.</p></div>
                     <div className='ms-5 mt-3 mb-3 d-flex justify-content-center'> <img src={help_1} alt=""  /></div>
                     <div className='mt-5'>  <p><strong className='me-1 '>2.</strong>you can find + new journal button, click on it.</p></div>
                     <div className='d-flex align-items-center justify-content-center'><div className='ms-5 mt-3 mb-3 me-5'> <img src={help_2} alt=""  /></div></div>
                     <div className='mt-5'>  <p><strong className='me-1 '>3.</strong>now you can write your journal.</p></div>
                     
                    <div className='d-flex align-items-center justify-content-center'><div className='ms-5 mt-3 mb-3 me-5'> <img src={help_3} alt=""  /></div></div>
                    <div className='mt-5'>  <p><strong className='me-1 '>4.</strong>after ending, you can click save.</p></div>
                     <div className='d-flex align-items-center justify-content-center'><div className='ms-5 mt-3 mb-3 me-5'> <img src={help_4} alt=""  /></div></div>
                   
                    </div>
                   </div>
             </div>
            </div>
          </div>
        </div>
        <div className="accordion-item mt-5">
          <h2 className="accordion-header" id="headingTwo2">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
            <p className='accordion_title'>What is the report page and how can 
            it help me?</p>
            </button>
          </h2>
          <div id="collapseTwo2" className="accordion-collapse collapse" aria-labelledby="headingTwo2" data-bs-parent="#accordionExample2">
            <div className="accordion-body">
            <div> 
                   <div className='row'>
                    <div className='col-xl-12 col-md-12'>


                      <div> <p> The report page is your personal roadmap to self-discovery! We analyze your entries and create a report summarizing the people, places, etc... and emotions that pop up the most. This helps you see what truly matters to you and how you're feeling over time. It's like having a magic mirror that reflects your inner world.</p></div>
                    
                   
                    </div>
                   </div>
             </div>
            </div>
          </div>
        </div>
        <div className="accordion-item mt-5">
          <h2 className="accordion-header" id="headingThree2">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
            <p className='accordion_title'>Can I search through my journals?

</p>
            </button>
          </h2>
          <div id="collapseThree2" className="accordion-collapse collapse" aria-labelledby="headingThree2" data-bs-parent="#accordionExample2">
            <div className="accordion-body">
            <div> 
                   <div className='row'>
                    <div className='col-xl-12 col-md-12'>


                      <div> <p>This website is your personal archive.</p></div>
                      <div> <p> <strong>•</strong> Use a search bar for specific keywords.</p></div>
                      <div> <p> <strong>•</strong> Use a date filter for specific time frame entries.</p></div>
                    
                   
                    </div>
                   </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


   

   
   </div>
   </div>
   </motion.div>
   </>
  )
}
