import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import positiveImg from '../../Assets/green_normal.svg';
import neutralImg from '../../Assets/yellow_normal.svg';
import negativeImg from '../../Assets/blue_normal.svg';
import { useBaseUrl } from '../../Context/BaseUrlContext';
import './Chart.scss'
const MoodLineChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const imagesLoaded = useRef({ positive: null, neutral: null, negative: null });
  const {LineChartData,setLineChartData}=useBaseUrl()
  const {show,setshow}=useBaseUrl()
  const {bool,setBool}=useBaseUrl()
     const {base ,setBase}=useBaseUrl()
  useEffect(() => {

    loadImages();
    fetchData();
    fetchBool()
  }, []);



  const loadImages = () => {
    const loadImage = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
      img.src = src;
    });

    Promise.all([
      loadImage(positiveImg),
      loadImage(neutralImg),
      loadImage(negativeImg)
    ]).then(([positive, neutral, negative]) => {
      imagesLoaded.current = { positive, neutral, negative };
    }).catch(error => {
      console.error("Error loading images:", error);
    });
  };
  useEffect(() => {
    if (LineChartData.length > 0) {
      processChartData(LineChartData);
      // setshow(true)
    }
    // else{
    //   setshow(false)
    // }
  }, [LineChartData]);

  const fetchData = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.get(`${base}/api/Sentiment/MoodPerDay`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data && Array.isArray(response.data)) {
        setLineChartData(response.data);
        if(response.data.length>0){
          setshow(true)
        }
        else{
          setshow(false)
        }
     
      } else {
        console.error("Data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch mood data:", error);
    }
  };
  const fetchBool = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.get(`${base}/api/Sentiment/test`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // console.log(response.data.flag)
      if (response.data) {
        setBool(response.data.flag)
       
      } 
      else{
        console.error("Failed to fetch mood data:");
      }
    } catch (error) {
      console.error("Failed to fetch mood data:", error);
    }
  };
  const processChartData = (data) => {
    const dates = data.map(item => item.date);
    const sentiments = data.map(item => ({
      x: item.date,
      y: { 'Positive': 2, 'Neutral': 1, 'Negative': 0 }[item.sentiment],
      sentiment: item.sentiment
    }));

    setChartData({
      labels: dates,
      datasets: [
        {
        label: 'Mood',
        data: sentiments,
        borderColor: 'rgba(76, 175, 80, 0.5)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 1.7,
        fill: false,
        tension: 0.7,


        segment: {
          borderColor: (ctx) => {
            const sentiment = ctx.p0?.parsed?.y;
            if (sentiment === 2) return '#03964C';  // Positive - Green
            if (sentiment === 1) return '#F0B518';  // Neutral - Amber
            if (sentiment === 0) return '#0455AE';  // Negative - Red
            return '#000000';  // Default - Black
          }
        },
        pointBackgroundColor: (ctx) => {
          const sentiment = ctx.raw.y;
          if (sentiment === 2) return '#03964C';  // Positive - Green
          if (sentiment === 1) return '#F0B518';  // Neutral - Amber
          if (sentiment === 0) return '#0455AE';  // Negative - Blue
          return 'rgba(0, 0, 0, 0.5)';  // Default - Black with opacity
        },

        // borderColor: (ctx) => {
        //     const sentiment = ctx.p0.parsed.y;
        //     if (sentiment === 2) return '#03964C';  // Positive - Green
        //     if (sentiment === 1) return '#F0B518';  // Neutral - Amber
        //     if (sentiment === 0) return '#0455AE';  // Negative - Red
        //     return '#000000';  // Default - Black
        //   },
        
        pointBackgroundColor: (ctx) => {
          const sentiment = ctx.raw.y;
          if (sentiment === 2) return '#03964C';  // Positive - Green
          if (sentiment === 1) return '#F0B518';  // Neutral - Amber
          if (sentiment === 0) return '#0455AE'; // Negative - Blue with opacity
          return 'rgba(0, 0, 0, 0.5)';  // Default - Black with opacity
        },
        pointBorderColor: (ctx) => {
          const sentiment = ctx.raw.y;
          if (sentiment === 2) return 'rgba(3, 150, 76, 1)';  // Positive - Green
          if (sentiment === 1) return 'rgba(240, 181, 24, 1)';  // Neutral - Amber
          if (sentiment === 0) return 'rgba(4, 85, 174, 1)';  // Negative - Blue
          return 'rgba(0, 0, 0, 1)';  // Default - Black
        }
    }]
    });
  };

  const customYAxisImages = {
    id: 'customYAxisImages',
    afterDraw: (chart) => {
      const { ctx, scales: { y }, chartArea: { left } } = chart;

      if (!imagesLoaded.current.positive) return;

      const drawImage = (img, value) => {
        const yPos = y.getPixelForValue(value);
        ctx.drawImage(img, left - 50, yPos - 15, 27, 27);
      };

      drawImage(imagesLoaded.current.positive, 2);
      drawImage(imagesLoaded.current.neutral, 1);
      drawImage(imagesLoaded.current.negative, 0);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 60,
        right: 20,
        top: 20,
        bottom: 20
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          font: {
            size: 9
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function() {
            return '';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            let label = context.dataset.label || '';
            const sentiment = context.raw.sentiment; // Get the sentiment from the data point
            if (label) label += ': ';
            label += sentiment;
            return `${context.raw.x}: ${label}`; // Show date and sentiment
          },
          labelColor: (context) => {
            const sentiment = context.raw.sentiment;
            let color = 'rgba(0, 0, 0, 0.5)'; // Default color
            if (sentiment === 'Positive') color = '#03964C';
            if (sentiment === 'Neutral') color = '#F0B518';
            if (sentiment === 'Negative') color = '#0455AE';
            return {
              borderColor: color,
              backgroundColor: color,
              borderWidth: 2,
              borderDash: [2, 2],
              borderRadius: 2
            };
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 10,
        displayColors: true
      },
      customYAxisImages // Register the custom plugin
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8
      }
    }
  };


  return (
   
    <div className='col-md-11 mt-5' style={{ position: 'relative' }}>
    <Typography
      variant="h6"
      gutterBottom
      component="div"
      sx={{ mb: 2 }}
      style={{
        fontWeight:'bold',
        fontSize:'15px',
        color:'rgba(105, 86, 229, 1)',
        position: 'absolute',
        top: '-15px',  // Adjust the positioning as needed
        left: '20px',  // Adjust the positioning as needed
        background: '#fff',  // Optional: background color to make the text stand out
        padding: '0 10px',   // Optional: padding to add space around the text
        borderRadius: '5px'  // Optional: rounded corners
      }}
    >
      Mood per Day
    </Typography>
    <Box sx={{ width: '100%', overflowX: 'auto', border: '2px solid   rgba(105, 86, 229, 1)', padding: '20px', borderRadius: '10px' }}>
      <Box className='' sx={{ minWidth: '1000px', width: `${chartData.labels.length * 55}px` }}>
        <Line data={chartData} plugins={[customYAxisImages]} options={options} height={400} />
      </Box>
    </Box>
  </div>
  );
};

export default MoodLineChart;
