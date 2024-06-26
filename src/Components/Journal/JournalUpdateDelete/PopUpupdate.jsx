import React, { useEffect, useState } from 'react'
import './PopUpUpdate.scss'
import axios from 'axios'
import book from '../../../Assets/170744339808091-2 1.svg'
import pen from '../../../Assets/Black-line1 1.svg'
import masaka from '../../../Assets/Black-shape 1.svg'
import mared from '../../../Assets/Line-Shape2 1.svg'
import close from '../../../Assets/ph_x-bold.svg'
import PopUpdateForm from './PopUpdateForm'
import { motion } from 'framer-motion';
import happy from '../../../Assets/happy 1.svg'
import{useCloseJournalsUpdate} from '../../../Context/JournalCloseUpdate'
import {useIdJournal} from '../../../Context/IdContext'
export default function PopUpupdate() {
  const  {closUpdate ,setCloseUpdate}=useCloseJournalsUpdate()
  const {id ,setId,specJournal,setSpecJournal}=useIdJournal()
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
  const [selectedDate, setSelectedDate] = useState();
  const [selectedtime, setSelectedTime] = useState();
  const [specLoading, setSpecLoading] = useState(false);  // State to track loading status
     // State to store the journal data
  const [specError, setSpecError] = useState(null); 

  async function fetchJournalEntry(journalId) {
    try {
        const token = localStorage.getItem('userToken');
        console.log(journalId.id)
        const response = await axios.get(`http://localhost:5289/api/Entry/GetEntry`, {
            params: { id: journalId },
            headers: {
                // Example header that might be required by your ngrok setup or API
                'Authorization': `Bearer ${token}`,
                "ngrok-skip-browser-warning": "sdfsdf",  // If such a header is supported to bypass warnings
            }
        });
      //  console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching journal entry:", error);
    }
}
  
  const handleJournalClick=(journalId)=>{
    setSpecLoading(true);
    fetchJournalEntry(journalId)
        .then(data => {
          console.log("jjj",data)
            setSpecJournal(data); // Set the fetched journals to state
            setSpecLoading(false);
            // setCloseUpdate(true)
           

            console.log(data.title)
            // console.log(data)
        })
        .catch(error => {
            console.error('Failed to fetch journals:', error);
            setSpecError(error);
            setSpecLoading(false);
        });
  }

  useEffect(() => {
    handleJournalClick(id)
    console.log(specJournal)
    setTimeout(() => setisLoading(true), 100)
  }, []);
 
  return (
  <>
    <motion.div
      initial="out"
      animate="in"
      exit="out"
     // variants={pageVariants}
      variants={pageTransition} 
      transition={{ type: "tween", duration: .4 }}
    >

   {isLoading? 
   <div className='POP' id='PopUpdate'>
    {closUpdate? <div className='ModContainer  '>
      
    <div className='ModContent rounded-4'>
       <div className='d-flex '>
         <img src={happy} alt="" className='m-3 emojy_size'  />
         <h4 className='write_journal'>{specJournal.title}</h4>
           
       </div>
       <PopUpdateForm/>
       <div className='position-absolute close' onClick={()=>{setCloseUpdate(false)}}> <img src={close} alt="" className='close_width' /></div>
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
