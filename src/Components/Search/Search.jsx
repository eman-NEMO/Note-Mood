import React, { useState } from 'react';
import ReactSearchBox from "react-search-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DateRangePicker } from 'rsuite';
import './Search.scss';
import dayjs from 'dayjs';
import axios from 'axios';
import { Query } from 'react-query';
import { useEffect } from 'react';
import { set } from 'rsuite/esm/internals/utils/date';
import happy from '../../Assets/happy 1.svg'
import { motion } from 'framer-motion';
import blure from '../../Assets/blur2.svg'

import search from '../../Assets/search_page.svg'
export default function Search() {
  // State for storing search input
  const [query, setQuery] = useState('');
  // State for storing date range
  const [journals,setJournals]=useState([])
  const [dateRange, setDateRange] = useState([null, null]);
  useEffect(() => {
    handleSearch();
  }, [query, dateRange]);

async function handleSearch() {
    // console.log(query,dateRange)
    const params = {};
    // params.query = 'kkk';
    if (query) params.query = query;
    // dateRange[0]='2024-6-18';
    // dateRange[1]='2024-6-25';
    // console.log(dateRange[0],dateRange[1],"kkkk")
    if(dateRange!==null){
    if (dateRange[0] && dateRange[1]) {
        params.startdate = dayjs(dateRange[0]).format('YYYY-M-DD');
        params.enddate = dayjs(dateRange[1]).format('YYYY-M-DD');
    }
  }
    console.log("params",params)
    try {
        const token = localStorage.getItem('userToken'); // Assuming the token is stored in localStorage
        const response = await axios.get('http://localhost:5289/api/Entry/Search', {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setJournals(response.data)
        console.log("respones",response)
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
    }
};
const journalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    // console.log("ff",query)
    // console.log("Search Query: ", value);
    handleSearch()
  };
  const handleDateRangeChange = (event) => {
    // console.log("event",event[0])
      if(event!==null){
        if (event.length=== 2) {
            const formattedStart = dayjs(event[0]).format('YYYY-MM-DD');
            const formattedEnd = dayjs(event[1]).format('YYYY-MM-DD');
            setDateRange([event[0],event[1]]);
            
            console.log("Formatted Date Range: ", formattedStart, formattedEnd);
            handleSearch()
          }
      }
      else{
          setDateRange(null,null);
          handleSearch()
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
    <div className='blue_back_ground'></div>
    <div className='container ' id='searchPage'>

           <div className=' mt-5 '>
           <div className='d-flex justify-content-center'>
                <img src={search} alt=""  />
              </div>
                 <div className='d-flex justify-content-center'><h3>Search For Journals </h3></div>


                 <div className='d-flex justify-content-center text-center '><p className=''>find your missed journals! just need to write what you remember of their content, and you can also use the date.</p></div>
           </div>




       <div className='padding'>
       <div className='row '>
        <div className='mt-4 col-md-12 col-xl-12 col-lg-12 col-sm-12 d-flex justify-content-center '>
             <div className=' w-75'>
             <input
            className='form-control'
            placeholder="Search..."
            value={Query}
            onKeyUp={handleSearchChange}
          
            // leftIcon={
            //   <div className='d-flex justify-content-center align-items-end mt-2'>
            //     <FontAwesomeIcon icon={faSearch} style={{ fontSize: '20px' }} />
            //   </div>
            // }
            // iconBoxSize='50px'
          />
             </div>
        </div>
        <div className='col-md-12 col-xl-12 col-lg-12 col-sm-12 mt-4  d-flex justify-content-center '>
          <DateRangePicker
            showOneCalendar
            // onChange={handleDateRangeChange}
            format="MM-dd-yyyy"
            onChange={handleDateRangeChange}
            // value={dateRange}
            // onChange={handleDateRangeChange}
          />
        </div>
      </div>

       </div>


  {/* {console.log(journals.length)} */}
   <div className='container'>
      <div className='p-5'>



      {journals.length > 0 ? (
                journals.map(journal => (
                    
                    <motion.div
                    key={journal.id}
                    initial="hidden"

                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={journalVariants}
                    // onClick={() => handleJournalClick(journal.id)}
                    className='journal_1 mt-2 j_1_color'
                  >
                    <div >
                      <div className='journal_1 mt-1 j_1_color  mt-3' >
                        <div className="row">
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
                <div> 
                  {/* <h5 className='centered-content mt-2'>No Journal Yet !</h5> */}
                </div>

              )}
      </div>
   </div>


    </div>
    
    </motion.div>
    </>
  );
}
