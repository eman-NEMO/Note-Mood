import React, { useState, useEffect } from 'react';
import axios from 'axios';
import green_colored from '../../Assets/New folder/happy-1.svg'
import green from '../../Assets/New folder/happy-1 1.svg';
import blue from '../../Assets/New folder/sad-1 1.svg'
import blue_colored from '../../Assets/New folder/sad-1.svg'
import yellow from '../../Assets/New folder/Normal-1.svg'
import yellow_colored from '../../Assets/New folder/Normal-1 1.svg'
import report1 from '../../Assets/Report1.svg';  // Add your report image paths
import report2 from '../../Assets/Report2.svg';
import report3 from '../../Assets/Report3.svg';
import food from '../../Assets/food.svg';
import weather from '../../Assets/weather.svg';
import Entertainment from '../../Assets/entertainment.svg';
import time from '../../Assets/time.svg';
import Fashion from '../../Assets/fashoin.svg';
import online_act from '../../Assets/online_activites.svg';
import Community from '../../Assets/community.svg';
import Education from '../../Assets/education.svg';
import reportPageLogo from '../../Assets/RepotPagelogo.svg'
import PopUpReport from './PopUpReport';
import { useBaseUrl } from '../../Context/BaseUrlContext';
import { motion } from 'framer-motion';
import './Report.scss';
const YourComponent = () => {

  const aspectImages = [report1, report2, report3];
  const {ReportPageData,setReportPageData}=useBaseUrl()
  const {closeTimePopReport,setTimePopReport}=useBaseUrl()

  const categoryImageMap = {
    'Person and related': report1,
    'Food and related': food,
    'Fashion and related': Fashion,
    'Places and related': report3,
    'Online Activities and related': online_act,
    'Entertainment and related': Entertainment,
    'Time and related': time,
    'Activities and related': report2,
    'Community and related': Community,
    'Weather and related': weather,
    'Education and related': Education
  };
  const categoryImageSize = {
    'Person and related': report1,
    'Food and related': food,
    'Fashion and related': Fashion,
    'Places and related': report3,
    'Online Activities and related': online_act,
    'Entertainment and related': Entertainment,
    'Time and related': time,
    'Activities and related': report2,
    'Community and related': Community,
    'Weather and related': weather,
    'Education and related': Education
  };
  const getCategoryImage = (categoryName) => {
    return categoryImageMap[categoryName] || null; // Return the image URL or null if not found
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get('https://localhost:7234/api/AspectAnalysis/EntitySentimentPercentage', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setReportPageData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const getSentimentPercentage = (sentiments, sentimentName) => {
    const sentiment = sentiments.find(s => s.sentimentName === sentimentName);
    return sentiment ? sentiment.percentage : 0;
  };

  const getHighestSentiment = (sentiments) => {
    if (!sentiments.length) return null;
    return sentiments.reduce((max, sentiment) => sentiment.percentage > max.percentage ? sentiment : max, sentiments[0]);
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
  return (<>
    <motion.div
        className='container '
        initial="out"
        animate="in"
        exit="out"
        // variants={pageVariants}
        variants={pageTransition}
        transition={{ type: "tween", duration: .7, delay: .5 }}
      >
    <div className="container py-3">
      <div className='col-md-12 col-xl-12 col-lg-12 col-sm-12 col-12 d-flex'>
        <img src={reportPageLogo} alt="" className='Img_size_chart' />
         <h3 className='ms-4'>Emotional Analysis Report</h3>
      </div>
      <div className="row mt-5">
        {ReportPageData.map((aspect, index) => (
          <div key={aspect.aspectName} className="row  margin_rows ">
            {index % 2 !== 0 && (
              <div className="col-md-5 d-flex justify-content-center align-items-center py-3">
                <img src={getCategoryImage(aspect.aspectName)} alt="Report"  className='picture_width'/>
              </div>
            )}
            <div className="col-md-7  ">
              <div className="aspect-container ">
                <div className="aspect-title">
                  <p>{aspect.aspectName}</p>
                </div>
                <div className="list-group overflow-auto custom-rounded-border p-3  " style={{ height: 270}}>
                  {aspect.entities.map(entity => {
                    const highestSentiment = getHighestSentiment(entity.sentiments);
                    return (
                      <a key={entity.entityName} href="#" className="bgg_normal list-group-item list-group-item-action custom-list-group-item mt-3">
                        <div className='row'>
                          <div className='col-md-12  col-sm-12 col-lg-4 col-12 col-xl-4 d-flex align-items-center'>
                            <h6><i className='fa-solid fa-caret-down me-3'></i>{entity.entityName}</h6>
                          </div>
                          <div className='col-md-12 col-sm-12 col-lg-8 col-12 col-xl-8 '>
                            <div className='row  '>
                              <div className='col-md-4  '>
                               
                                 <div className='row  '>
                                   <div className='col-md-4  d-flex align-items-center justify-content-center '>  <img className={highestSentiment?.sentimentName === 'Positive' ?'':''} src={highestSentiment?.sentimentName === 'Positive' ? green_colored : green} alt="" /></div>
                                    <div className='col-md-4  d-flex justify-content-center align-items-center'>  <span className=" ">{getSentimentPercentage(entity.sentiments, 'Positive')}%</span></div>
                                 </div>
                                   
                              </div>
                              <div className='col-md-4'>
                              <div className='row '>
                                   <div className='col-md-4 d-flex align-items-center justify-content-center'>  <img className={highestSentiment?.sentimentName === 'Negative' ?'':''} src={highestSentiment?.sentimentName === 'Negative' ? blue_colored : blue} alt="" /></div>
                                    <div className='col-md-4 d-flex align-items-center justify-content-center'>  <span className=" ">{getSentimentPercentage(entity.sentiments, 'Negative')}%</span></div>
                                 </div>
                              </div>
                              <div className='col-md-4 '>
                              <div className='row '>
                                   <div className='col-md-4 d-flex align-items-center justify-content-center'>  <img className={highestSentiment?.sentimentName === 'Neutral' ?'':''} src={highestSentiment?.sentimentName === 'Neutral' ? yellow_colored : yellow} alt="" /></div>
                                    <div className='col-md-4 d-flex align-items-center justify-content-center'>  <span className=" ">{getSentimentPercentage(entity.sentiments, 'Neutral')}%</span></div>
                                 </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            {index % 2 === 0 && (
              <div className="col-md-5 d-flex justify-content-center py-3">
                <img src={getCategoryImage(aspect.aspectName)} alt="Report" className='picture_width' />
              </div>
            )}
          </div>
        ))}
      </div>
      {closeTimePopReport?<PopUpReport/>:''}
      <div className='row  mb-5 mt-4 '>
       <div className=''>  <button className='btn  buton_width' onClick={()=>{setTimePopReport(true)}}>Change Estimation Time</button></div>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default YourComponent;
