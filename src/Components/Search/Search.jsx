import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import './Search.scss';
import dayjs from 'dayjs';
import axios from 'axios';
import { Query } from 'react-query';
import { useEffect } from 'react';
import { set } from 'rsuite/esm/internals/utils/date';
import happy from '../../Assets/happy 1.svg'
import { motion } from 'framer-motion';
import {useBaseUrl} from '../../Context/BaseUrlContext'
import search from '../../Assets/search_page.svg'
import green_colored from '../../Assets/New folder/happy-1.svg'
import green from '../../Assets/New folder/happy-1 1.svg';
import blue from '../../Assets/New folder/sad-1 1.svg'
import blue_colored from '../../Assets/New folder/sad-1.svg'
import yellow from '../../Assets/New folder/Normal-1.svg'
import resetEmotions from '../../Assets/resetemotion.svg'
import logo from '../../Assets/logo-ver2.png'
import { Helmet } from 'react-helmet';
import normal from '../../Assets/Normal 1.svg'
import sad from '../../Assets/sad image.svg'
export default function Search() {
  const [query, setQuery] = useState('');
  const [first, setFirst] = useState(false);
  const {base ,setBase}=useBaseUrl()
  const [journals,setJournals]=useState([])
  const [dateRange, setDateRange] = useState([null, null]);
  const [emotion,setemotion]=useState(null)
  useEffect(() => {
    handleSearch();
  }, [query, dateRange,emotion]);
async function handleSearch() {
  console.log(emotion)
  
    const params = {};
    if (query) params.Query = query;
    if(dateRange!==null){
    if (dateRange[0] && dateRange[1]) {
        params.StartDate = dayjs(dateRange[0]).format('YYYY-M-DD');
        params.EndDate = dayjs(dateRange[1]).format('YYYY-M-DD');
    }
  }
  if(emotion!==null){
    params.SentimentName=emotion;
  }
    console.log("params",params)
    try {
        const token = localStorage.getItem('userToken'); // Assuming the token is stored in localStorage
        const response = await axios.get(`${base}/api/Entry/Search`, {
            params,
            headers: {
                'Authorization':` Bearer ${token}`
            }
        });
        setJournals(response.data)
        console.log("respones",response)
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
    
};
function getEmotionImage(emotion) {
  switch (emotion) {
    case 'Positive':
      return happy;
    case 'Negative':
      return sad;
    case 'Neutral':
      return normal;
    default:
      return normal; // Default image if none of the cases match
  }
}
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

  const variants = {
    fromTop: {
        hidden: { opacity: 0, y: -50 },
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
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    },
    fromRight: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    }
};

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setFirst(true)
    // handleSearch()
  };
  function handlemotion(emo){
    // console.log(emo)
       setemotion(emo)
       setFirst(true)
      //  handleSearch()
  }
  const handleDateRangeChange = (event) => {
    
      if(event!==null){
        if (event.length=== 2) {
            const formattedStart = dayjs(event[0]).format('YYYY-MM-DD');
            const formattedEnd = dayjs(event[1]).format('YYYY-MM-DD');
            setDateRange([event[0],event[1]]);
            
            console.log("Formatted Date Range: ", formattedStart, formattedEnd);
            // handleSearch()
          }
      }
      else{
          setDateRange(null,null);
          // handleSearch()
      }
      setFirst(true)
  };

  return (
    <>
          <Helmet>
    <link rel="icon" href={logo} sizes="10x10" />
        <title>Search</title>
       
       
      </Helmet>
         <motion.div
    className='container '
    initial="out"
    animate="in"
    exit="out"
   // variants={pageVariants}
    variants={pageTransition} 
    transition={{ type: "tween", duration: .7 ,delay:.2 }}
  >

    <div className='container' id='searchPage'>
    <div className='blue_back_ground '>
           <div className=' mt-5 '>
           <motion.div variants={variants.fromTop} initial="hidden" animate="visible" transition={{ delay: .7,duration:.4}}> 
           <div className='d-flex justify-content-center'>
             <img src={search} alt="" className='image_size'  /> 
              
              </div>
              </motion.div>
              <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1.2,duration:.4}}> 
                 <div className='d-flex justify-content-center '><h3 className='text_search'>Search For Journals </h3></div>

                
                 <div className='d-flex justify-content-center text-center  grey_color '><p className=' words_width'>find your missed journals! just need to write what you remember of their content, and you can also use the date and emotions.</p></div>
                 </motion.div>
           </div>



        
       <div className='padding'>
       <div className='row '>
       <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1.7,duration:.4}}> 
           <div className='row'>
           <div className='col-md-12 col-xl-12 col-lg-12 col-sm-12 mt-4 me-5 d-flex justify-content-center align-items-center '>
          <DateRangePicker
            showOneCalendar
            // onChange={handleDateRangeChange}
            format="MM-dd-yyyy"
            onChange={handleDateRangeChange}
            // value={dateRange}
            // onChange={handleDateRangeChange}
          />
         
           <div className='ms-3 me-2 pointer' onClick={()=>{handlemotion('Positive')}}> <img src={green_colored} alt="" /></div>
           <div className='ms-3 me-2 pointer' onClick={()=>{handlemotion('Neutral'); }}> <img src={yellow} alt="" /></div>
           <div className='ms-3 me-2 pointer' onClick={()=>{handlemotion('Negative'); }}> <img src={blue_colored} alt="" /></div>
           <div className='ms-3 me-2 pointer' onClick={()=>{handlemotion(null); }}> <img src={ resetEmotions} alt="" /></div>
        </div>
           </div>
           </motion.div>
           <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1.9,duration:.4}}> 
        <div className='mt-4 col-md-12 col-xl-12 col-lg-12 col-sm-12 d-flex justify-content-center '>
             <div className='form_width'>
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
        </motion.div>
        
      
      </div>
        
       </div>
  
       </div>
       
  {/* {console.log(journals.length)} */}
   <div className='container'>
      <div className='ps-5 pe-5 pb-5'>



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
                            <img src={getEmotionImage(journal.overallSentiment)} alt="" className='emo_size' />
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
                // <motion.div variants={variants.fromLeft} initial="hidden" animate="visible" transition={{ delay: 1,duration:.4}}>
                <div> 
                  {first?   <motion.div variants={variants.fromLeft} initial="hidden" animate="visible" transition={{ delay: 1,duration:.4}}> <div className='d-flex justify-content-center align-items-center  mt-5'> <h5 className='centered-content mt-2'>No Matching Journal !</h5></div></motion.div>:''}
                </div>
           

              )}
      </div>
   </div>


    </div>
    
    </motion.div>
    </>
  );
}