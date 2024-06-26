import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import journall from '../../Assets/journalbook.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import profile from '../../Assets/profile.svg'
import happy from '../../Assets/happy 1.svg'
import normal from '../../Assets/Normal 1.svg'
import sad from '../../Assets/sad image.svg'
import mared from '../../Assets/Line-Shape2 1.svg'
import mared2 from '../../Assets/mirror.png'
import Form from './JournalDetails.scss';
import axios from "axios";
import { useJournals } from '../../Context/JournalContext';
import { useCloseJournals } from '../../Context/JournalCloseContext.js'
import { Link } from 'react-router-dom';
export default function JournalDetails() {
    let journalId = useParams(); // Get the journal ID from the URL
    const [journal, setJournal] = useState(null); // State to hold the journal details
    const [loading, setLoading] = useState(true); // State to handle loading status
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    // const { popUp, setPopUp } = useData();
    const { journals, setJournals } = useJournals();


    const { clos, setClose } = useCloseJournals()
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
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };


    async function fetchJournalEntry() {
        try {
            const token = localStorage.getItem('userToken');
            console.log(journalId.id)
            const response = await axios.get(`http://localhost:5289/api/Entry/GetEntry`, {
                params: { id: journalId.id },
                headers: {
                    // Example header that might be required by your ngrok setup or API
                    'Authorization': `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "sdfsdf",  // If such a header is supported to bypass warnings
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching journal entry:", error);
        }
    }
    const emotionVariants = {
        hide: {
            y: 10,
            scale: 0.8,
            opacity: 0.5,
            transition: {
                duration: 0.5,
                yoyo: Infinity
            }
        },
        show: {
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchJournalEntry()
            .then(data => {
                setJournal(data); // Set the fetched journals to state
                setLoading(false);
                // console.log(data)
            })
            .catch(error => {
                console.error('Failed to fetch journals:', error);
                setError(error);
                setLoading(false);
            });
    }, []);
    return (
        <>

            {/* <motion.div
      initial="out"
      animate="in"
      exit="out"
     // variants={pageVariants}
      variants={pageTransition} 
      transition={{ type: "tween", duration: 0.5 }}
    > */}

            {/* 
    journal ? (
                    <div>
                        <h1>{journal.title}</h1>
                        <p>{journal.content}</p>
                       
                    </div>
                ) : (
                    <p>Journal not found.</p> 
                )
     */}
            <div className='container'>
                <motion.div
                    initial="out"
                    animate="in"
                    exit="out"
                    // variants={pageVariants}
                    variants={pageTransition}
                    transition={{ type: "tween", duration: 0.5 }}
                >
                    <div className='head'>
                        <div className='row mt-3'>
                            <div className='col-md-6  col-sm-12  col-12 d-flex  '>
                                <img src={journall} alt="" className='mt-3 ' />
                                <h3 className='mt-3 ms-3 bold'>My Journal Details </h3>

                            </div>

                            <div className='col-md-6 mt-3 col-sm-12 col-12  d-flex justify-content-end ss'>


                                <div className=" position-relative">
                                    <div onClick={toggleOptions}>
                                        <img src={profile} alt="Profile" className="profile" />
                                    </div>
                                    {showOptions && (
                                        <div className="position-absolute top-100 start-0 z-2"  >
                                            <ul className="list-group">
                                                <li className="list-group-item pointer">Profile</li>
                                                <li className="list-group-item pointer">Logout</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        {/* <div className='row'>
                 <div className='col-md-8'>
                   <img src={mared} alt="" />
                 </div>
                 <div className='col-md-4'>
                 
                 </div>
               </div> */}

                        {journal ?
                            <div className=' mt-5 '>
                                <div className="row">
                                    <div className='col-md-7 j_1_color'>
                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                            <img src={happy} alt="" className='w-25' />
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className='d-flex'><p className='me-5'>{journal.date}</p> <p>{journal.time}</p></div>
                                            <h4>{journal.title}</h4>
                                            <p>{journal.content}</p>
                                        </div>

                                    </div>
                                    <div className='col-md-5'>
                                        <div className="card" style={{ width: '15rem' }}>

                                            <div className="card-body">
                                                <p className="card-text">Happy Emo</p>
                                                <img src={happy} className="card-img-top" alt="..." />
                                            </div>
                                        </div>
                                        <div className="card" style={{ width: '15rem' }}>

                                            <div className="card-body">
                                                <p className="card-text">{journal.date}</p>
                                                <img src={happy} className="card-img-top" alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''
                        }




                        {/* <div className='row'>
                 <div className='col-md-10'>
                
                 </div>
                 <div className='col-md-2'>
                   <img src={mared2} alt="" />
                 </div>
               </div> */}

                    </div>

                </motion.div>
            </div>


        </>
    )
}
