import React, { useState, useEffect } from 'react';
import side_girl from '../../Assets/Frame 43.svg';
import './Topics.scss';
import axios from 'axios';
import { useBaseUrl } from '../../Context/BaseUrlContext';
import green_colored from '../../Assets/New folder/happy-1.svg'
import green from '../../Assets/New folder/happy-1 1.svg';
import blue from '../../Assets/New folder/sad-1 1.svg'
import blue_colored from '../../Assets/New folder/sad-1.svg'
import yellow from '../../Assets/New folder/Normal-1.svg'
import yellow_colored from '../../Assets/New folder/Normal-1 1.svg'
import PopUpTopics from './PopUpTopics'
import topic_page_logo from '../../Assets/topicsPageLogo.svg'
import logo from '../../Assets/logo-ver2.png'
import empty_img from '../../Assets/ERROR-report.svg'
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function Topics() {
  const { base } = useBaseUrl();
  const {TopicsPageData,setTopicsPageData} = useBaseUrl()
  const {closeTimePopTopics,setTimePopTopics}=useBaseUrl()


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
 

  

  useEffect(() => {
    
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get(`${base}/api/TopicAnalysis/TopicAnalysis`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = response.data.map(topic => ({
          ...topic,
          sentiments: {
            Positive: topic.sentiments.find(sentiment => sentiment.sentimentName === 'Positive')?.percentage || 0,
            Neutral: topic.sentiments.find(sentiment => sentiment.sentimentName === 'Neutral')?.percentage || 0,
            Negative: topic.sentiments.find(sentiment => sentiment.sentimentName === 'Negative')?.percentage || 0,
          },
        }));
        setTopicsPageData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const getBoxClass = (sentiments) => {
    const maxSentiment = Math.max(sentiments.Positive, sentiments.Neutral, sentiments.Negative);
    if (maxSentiment === sentiments.Positive) return 'box2';
    if (maxSentiment === sentiments.Neutral) return 'box3';
    if (maxSentiment === sentiments.Negative) return 'box1';
    return '';
  };

  const getImage = (sentimentType, isColored) => {
    switch (sentimentType) {
      case 'Positive':
        return isColored ? green_colored : green;
      case 'Neutral':
        return isColored ? yellow : yellow_colored;
      case 'Negative':
        return isColored ? blue_colored : blue;
      default:
        return blue;
    }
  };

  const getTextColor = (sentimentType, sentiments) => {
    const maxSentiment = Math.max(sentiments.Positive, sentiments.Neutral, sentiments.Negative);
    if (sentiments[sentimentType] === maxSentiment) {
      switch (sentimentType) {
        case 'Positive':
          return 'green';
        case 'Neutral':
          return 'yellow';
        case 'Negative':
          return 'blue';
        default:
          return 'black';
      }
    }
    return 'black';
  };


  return (
    
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
    <link rel="icon" href={topic_page_logo} sizes="10x10" />
        <title>Topics Page</title>
        {/* <meta name="description" content="Detailed description of the page for SEO" /> */}
       
      </Helmet>
    <div className="topics-container " id='topics-container'>
      
      <div className='d-flex align-items-center row'>
            <div className=' col-md-12 col-xl-12 col-sm-12 col-12  col-lg-12 '>
              <div className=' d-flex'>  <img src={topic_page_logo} alt="" className='mt-3 ms-3  topics_Icon_size' />
                <h3 className='mt-3 ms-3 bold topics_page_title_size'>Life Themes and Emotions</h3></div></div>
            
          </div>
         
        <div className="container mt-5  ">
        {TopicsPageData.length >0?  <div>    <p className='topic_frequency'>Topic Frequency</p>
        <div className="row   ">
          <div className="col-md-10 col-lg-10 col-sm-10 overflow-auto  back_ground_color " style={{ maxHeight: '350px' }}>
     <div className=''>
     {TopicsPageData.map((topic, index) => (
              <div key={index} className="d-flex row mt-3 ">
                <div className="col-md-3 col-lg-3 col-sm-12 col-12 title_topic ">
                  <h6>{topic.topicName}</h6>
                </div>
                <div className="col-md-9 col-lg-9 col-sm-12 col-12 d-flex align-items-center">
                  <div className="me-2 mt-1 topics_pers_numJournals"><h6>{topic.percentage}%</h6></div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${topic.percentage}%` }} aria-valuenow={topic.percentage} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <div className="ms-3 mt-1 topics_pers_numJournals"><h6>In {topic.frequency} Journals</h6></div>
                </div>
              </div>
            ))}
     </div>
          </div>
          <div className="col-md-2 col-lg-2 col-sm-12 col-12 col-xl-2 d-flex d-none d-md-flex align-items-center back_ground_color  ">
             <div className=''>
             <img src={side_girl} alt="Side girl" className="bg-white" />
             </div>
          </div>
        </div>

        <div className="boxes mt-3 ">
          <div className="row custom_container_width ">
            {TopicsPageData.map((topic, index) => (
              <div key={index} className="col-md-4 col-sm-12 col-12 col-lg-4 col-xl-4 mt-5 ">
                {/* {console.log(topic.sentiments)} */}
                <div className={`box ${getBoxClass(topic.sentiments)} d-flex justify-content-center align-items-center`}>
                  <div className='topic_name'><p>{topic.topicName}</p></div>
                  <div className="overlay">
                    <div className="row">
                      {['Positive', 'Neutral', 'Negative'].map((sentimentType) => (
                        <div key={sentimentType} className="col-md-4 col-sm-4 col-4 col-lg-4 col-xl-4 d-flex flex-column align-items-center">
                          <img src={getImage(sentimentType, topic.sentiments[sentimentType] === Math.max(topic.sentiments.Positive, topic.sentiments.Neutral, topic.sentiments.Negative))} alt={sentimentType} />
                          <p className={`${ getTextColor(sentimentType, topic.sentiments) }`}>{topic.sentiments[sentimentType]}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div></div>:
        <motion.div
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
  <h3 className="mt-3 text-center">No Topics!</h3>
</div>

</div>
</motion.div>
}

        {closeTimePopTopics?<PopUpTopics/>:''}
      <div className='row  mb-5 mt-5 '>
       <div className=''>  <button className='btn  button_width' onClick={()=>{setTimePopTopics(true)}}>Change Estimation Time</button></div>
      </div>
      </div>

    
    </div>
    </motion.div>
  );
}
