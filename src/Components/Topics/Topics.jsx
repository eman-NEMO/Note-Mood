import React, { useState, useEffect } from 'react';
import side_girl from '../../Assets/sideGirl 1.svg';
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
export default function Topics() {
  const { base } = useBaseUrl();
  const {TopicsPageData,setTopicsPageData} = useBaseUrl()
  const {closeTimePopTopics,setTimePopTopics}=useBaseUrl()
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
    if (maxSentiment === sentiments.Positive) return 'box1';
    if (maxSentiment === sentiments.Neutral) return 'box2';
    if (maxSentiment === sentiments.Negative) return 'box3';
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

  return (
    <div className="topics-container mt-5">
      <div className="container">
        <div className="row back_ground_color">
          <div className="col-md-10 col-lg-10 col-sm-10 overflow-auto" style={{ maxHeight: '300px' }}>
            {TopicsPageData.map((topic, index) => (
              <div key={index} className="d-flex row mt-3">
                <div className="col-md-3 col-lg-3 col-sm-12 col-12 ">
                  <h6>{topic.topicName}</h6>
                </div>
                <div className="col-md-9 col-lg-9 col-sm-12 col-12 d-flex align-items-center">
                  <div className="me-2 mt-1"><h6>{topic.percentage}%</h6></div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${topic.percentage}%` }} aria-valuenow={topic.percentage} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <div className="ms-3 mt-1"><h6>In {topic.frequency} Journals</h6></div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-2 col-lg-2 d-flex align-items-center">
            <img src={side_girl} alt="Side girl" className="side-girl-img" />
          </div>
        </div>

        <div className="boxes">
          <div className="row">
            {TopicsPageData.map((topic, index) => (
              <div key={index} className="col-md-6 mt-5">
                {/* {console.log(topic.sentiments)} */}
                <div className={`box ${getBoxClass(topic.sentiments)} d-flex justify-content-center align-items-center`}>
                  <div className=''><p>{topic.topicName}</p></div>
                  <div className="overlay">
                    <div className="row">
                      {['Positive', 'Neutral', 'Negative'].map((sentimentType) => (
                        <div key={sentimentType} className="col-md-4 col-sm-4 col-4 col-lg-4 col-xl-4 d-flex flex-column align-items-center">
                          <img src={getImage(sentimentType, topic.sentiments[sentimentType] === Math.max(topic.sentiments.Positive, topic.sentiments.Neutral, topic.sentiments.Negative))} alt={sentimentType} />
                          <p>{topic.sentiments[sentimentType]}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {closeTimePopTopics?<PopUpTopics/>:''}
      <div className='row  mb-5 mt-4 '>
       <div className=''>  <button className='btn  buton_width' onClick={()=>{setTimePopTopics(true)}}>Change Estimation Time</button></div>
      </div>
      </div>

    
    </div>
  );
}
