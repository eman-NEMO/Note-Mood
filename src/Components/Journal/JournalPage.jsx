import React, { useEffect } from 'react'
import SideNav from '../SideNav/SideNav'
import journal from '../../Assets/journalbook.svg'
import './Journal.scss'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import profile from '../../Assets/profile.svg'
import happy from '../../Assets/happy 1.svg'
import normal from '../../Assets/Normal 1.svg'
import sad from '../../Assets/sad image.svg'
import PopUp from './JournalPopUp/PopUp';
import useData from './JournalPopUp/Function.js';
import './JournalPopUp/PopUp.scss'
import { useQuery } from "react-query";
import axios from "axios";
import { useJournals } from '../../Context/JournalContext';
import { useCloseJournalsUpdate } from '../../Context/JournalCloseUpdate.js'
import { useCloseJournals } from '../../Context/JournalCloseContext.js'
import { Link, useNavigate } from 'react-router-dom';
import PopUpupdate from './JournalUpdateDelete/PopUpupdate.jsx';
import { useIdJournal } from '../../Context/IdContext'
import noNote from '../../Assets/no-notes 11.svg'
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Component } from "react";
import ReactSearchBox from "react-search-box";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/styles/rsuite-default.css'
import { DateRangePicker } from 'rsuite';
import { addDays } from 'date-fns';
import search from '../../Assets/search.svg'
export default function JournalPage() {
  
const predefinedRanges = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left'
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left'
  },
  {
    label: 'Last 7 Days',
    value: [addDays(new Date(), -7), new Date()],
    placement: 'left'
  },
  {
    label: 'Last 30 Days',
    value: [addDays(new Date(), -30), new Date()],
    placement: 'left'
  }
];
  const [expanded, setExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  // const { popUp, setPopUp } = useData();
  const { journals, setJournals ,zIndex,setZIndex} = useJournals();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id, setId } = useIdJournal()
  const { clos, setClose } = useCloseJournals()

  const { closUpdate, setCloseUpdate } = useCloseJournalsUpdate()


  // Function to fetch journals
  async function getJournals() {
    const token = localStorage.getItem('userToken');
    //console.log(token)// Retrieve the token from local storage
    try {
      const response = await axios.get('http://localhost:5289/api/Entry/GetAll', {
        headers: {
          'Authorization': `Bearer ${token}`,
          "ngrok-skip-browser-warning": "sdfsdf",
          //  accept: 'application/json',
          //  withCredentials: true,

          // Include the Authorization header
        }

      });
      //console.log(response)
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching journals:', error);
      throw error; // Handle errors or re-throw as needed
    }
  }
  let navigate=useNavigate()
  function navigateSearch(){

    navigate('/search')
  }
  useEffect(() => {



    setLoading(true);
    getJournals()
      .then(data => {
        setJournals(data); // Set the fetched journals to state
        setLoading(false);
        // console.log(data)
      })
      .catch(error => {
        console.error('Failed to fetch journals:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  const journalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const toggleSearch = () => {
    setExpanded(!expanded);
  };


  const handleJournalClick = (ID) => {

    setId(ID)
    setCloseUpdate(true)
    console.log(ID)
  }

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

      {/* <Helmet>
        <body className="JournalPageBody "   />
      </Helmet> */}
      <motion.div
        className='container '
        initial="out"
        animate="in"
        exit="out"
        // variants={pageVariants}
        variants={pageTransition}
        transition={{ type: "tween", duration: .7, delay: .5 }}
      >
        <div className={`Journal_page_Id container `} id='Journal_page_Id'>

          <div className='Journal_font d-flex row '>
            <div className='  col-lg-6'>
              <div className='ps-5  d-flex'>  <img src={journal} alt="" className='mt-3  book_size' />
                <h3 className='mt-3 ms-3 bold Journal_font'>My Journaling Space </h3></div></div>
            {/* <div className='ms-5 mt-2'>
         <ReactSearchBox
        placeholder="Search ....."
        value="Doe"
        // leftIcon={ />}
        // data={this.data}
   
        callback={(record) => console.log(record)}
      />
            <FontAwesomeIcon icon={faSearch} className=''/>
         </div> */}
            <div className='col-lg-6 mt-2 '>

               <div className='d-flex search_margin' onClick={()=>{navigateSearch()}}>  <img src={search} alt="" /></div>

              {/* <div className='search_width ps-5'>
                <ReactSearchBox

                  placeholder="Search..."

                  leftIcon={
                    <div className='d-flex justify-content-center align-items-end mt-2'>
                      <div> <FontAwesomeIcon icon={faSearch} style={{ fontSize: '20px' }} /></div>
                    </div>
                  }
                  iconBoxSize='50px'
                />

              </div> */}
              {/* <div className='ps-2 pe-5 mt-2 '> */}

              {/* <DateRangePicker showOneCalendar ranges={[]} format="MM-dd-yyyy" /> */}
              {/* </div> */}

            </div>





          </div>

          <div className='container ' >




            <div className=' mt-4 '>


              {journals.length > 0 ? (
                journals.map(journal => (
                  <motion.div
                    key={journal.id}
                    initial="hidden"

                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={journalVariants}
                    onClick={() => handleJournalClick(journal.id)}
                    className='journal_1 mt-2 j_1_color'
                  >
                    <div >
                      <div className='journal_1 mt-1 j_1_color  mt-3' >
                        <div className="row " onClick={() => handleJournalClick(journal.id)}>
                          <div className="col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center align-items-center">
                            <img src={happy} alt="" className='emo_size' />
                          </div>
                          <div className="col-md-10 col-lg-10 col-xl-10">
                            <div >
                              <div className='d-flex mt-3 ms-3 journal_font_Date_time'><p className='me-5'>{journal.date}</p> <p>{journal.time}</p></div>
                              <h4 className='ms-3 Journal_font_title'>{journal.title}</h4>
                              {journal.content.length > 200 ? <p className='me-3 ms-3 journal_font_content'>{journal.content.substring(0, 200)}<span>......<span className='see_more'> See More</span></span></p> : <p className='me-3 ms-3 journal_font_content'>{journal.content}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div> <div className="centered-content mt-5 ">
                  <img src={noNote} alt="No journals available" className='centered-image' />

                </div>
                  <h5 className='centered-content mt-2'>No Journal Yet !</h5>
                </div>

              )}



              {clos ? <PopUp /> : ''}
              {closUpdate ? <PopUpupdate /> : ''}
            </div>


          </div>
          <div className=' fixed-button-container text-center '  >
            <div className={` d-flex align-items-center`}> <button onClick={() => { setClose(true)}} className='btn maincolor rounded-1' ><i class="fa-solid fa-plus  m-1" style={{ color: "white" }}></i> New Journal</button></div>
          </div>
        </div>
      </motion.div>



    </>


  )
}
