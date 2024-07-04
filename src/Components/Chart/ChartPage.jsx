import React, { useState } from 'react';
import 'chart.js/auto';
import './Chart.scss'
import MoodLineChart from './LineChart';
import DonutChart from './PieChart'
import MoodBarChart from './BarChart'
import chartImg from '../../Assets/chartPage.svg'
import chartPageLogo from '../../Assets/chartPagelofo.svg'
import { delay, motion } from 'framer-motion';
import PopUpChart from './PopUpChart';
import { useBaseUrl } from '../../Context/BaseUrlContext';
export default function ChartPage ()  {
  const {closeTimePop,setTimePop}=useBaseUrl()
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
        transition={{ type: "tween", duration: .7, delay: .5 }}
      >
    <div className='row mt-3'>
      <div className='col-md-12 col-xl-12 col-lg-12 col-sm-12 col-12 d-flex'>
        <img src={chartPageLogo} alt="" className='Img_size_chart' />
         <h3 className='ms-4'>Emotional Analysis Charts</h3>
      </div>
    </div>
    <div className='container'>
      <div className='row  mt-5'  >
      <div className='col-md-12  d-flex justify-content-center mt-5'>
      <img src={chartImg} alt=""  className='Panner_img'/>
      </div>
      </div>
      <div className='row d-flex justify-content-center container'>
       <MoodLineChart/>
      </div>
      <div className='row container ' >
      <DonutChart/>
      <MoodBarChart/>
      </div>
       {closeTimePop?  <PopUpChart/>:''}
      <div className='row  mb-5 '>
       <div className=''>  <button className='btn  buton_width' onClick={()=>{setTimePop(true)}}>Change Estimation Time</button></div>
      </div>
    </div>
    </motion.div>
    </>
  );
};




// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import 'chart.js/auto';
// import 'chartjs-adapter-date-fns';
// import { Box, Typography } from '@mui/material';
// import positiveImg from '../../Assets/green_normal.svg';
// import neutralImg from '../../Assets/yellow_normal.svg';
// import negativeImg from '../../Assets/blue_normal.svg';

// const MoodLineChart = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: []
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await axios.get('https://localhost:7234/api/Sentiment/MoodPerDay', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (response.data && Array.isArray(response.data)) {
//         processChartData(response.data);
//       } else {
//         console.error("Data is not an array:", response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch mood data:", error);
//     }
//   };

//   const processChartData = (data) => {
//     const dates = data.map(item => item.date);
//     const sentiments = data.map(item => ({
//       x: new Date(item.date),
//       y: { 'Positive': 2, 'Neutral': 1, 'Negative': 0 }[item.sentiment]
//     }));

//     setChartData({
//       labels: dates,
//       datasets: [{
//         label: 'Mood',
//         data: sentiments,
//         borderColor: 'rgba(76, 175, 80, 0.5)',  // Green with opacity
//         backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green with more opacity
//         borderWidth: 1.7, // Thinner line
//         fill: false,
//         tension: 0.7, // Ensure no smoothing for sharp lines
//         segment: {
//           borderColor: (ctx) => {
//             const sentiment = ctx.p0.parsed.y;
//             if (sentiment === 2) return '#03964C';  // Positive - Green
//             if (sentiment === 1) return '#F0B518';  // Neutral - Amber
//             if (sentiment === 0) return '#0455AE';  // Negative - Red
//             return '#000000';  // Default - Black
//           }
//         },
//         pointBackgroundColor: (ctx) => {
//           const sentiment = ctx.raw.y;
//           if (sentiment === 2) return '#03964C';  // Positive - Green
//           if (sentiment === 1) return '#F0B518';  // Neutral - Amber
//           if (sentiment === 0) return '#0455AE'; // Negative - Blue with opacity
//           return 'rgba(0, 0, 0, 0.5)';  // Default - Black with opacity
//         },
//         pointBorderColor: (ctx) => {
//           const sentiment = ctx.raw.y;
//           if (sentiment === 2) return 'rgba(3, 150, 76, 1)';  // Positive - Green
//           if (sentiment === 1) return 'rgba(240, 181, 24, 1)';  // Neutral - Amber
//           if (sentiment === 0) return 'rgba(4, 85, 174, 1)';  // Negative - Blue
//           return 'rgba(0, 0, 0, 1)';  // Default - Black
//         }
//       }]
//     });
//   };

//   const customYAxisImages = {
//     id: 'customYAxisImages',
//     afterRender: (chart) => {
//       const { ctx, scales: { y }, chartArea: { left } } = chart;

//       const images = [
//         { src: negativeImg, value: 0 },
//         { src: neutralImg, value: 1 },
//         { src: positiveImg, value: 2 }
//       ];

//       images.forEach(({ src, value }) => {
//         const img = new Image();
//         img.src = src;
//         img.onload = () => {
//           const yPos = y.getPixelForValue(value);
//           ctx.drawImage(img, left - 50, yPos - 15, 27, 27); // Adjust position and size
//         };
//       });
//     }
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: 'index',
//       intersect: false // Ensure interaction mode is index and intersect is false
//     },
//     layout: {
//       padding: {
//         left: 60, // Adjust the left padding to ensure the images are visible
//         right: 20,
//         top: 20,
//         bottom: 20
//       }
//     },
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'day',
//           displayFormats: {
//             day: 'MMM dd'
//           },
//           tooltipFormat: 'MMM dd yyyy'
//         },
//         title: {
//           display: true,
//           text: 'Date'
//         },
//         ticks: {
//           font: {
//             size: 10 // Set the font size for X-axis labels
//           }
//         }
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1,
//           callback: function(value) {
//             return ''; // Remove default text labels
//           }
//         },
//         title: {
//           display: true,
//           text: 'Sentiment'
//         }
//       }
//     },
//     plugins: {
//       legend: {
//         display: false // Remove the legend box
//       },
//       tooltip: {
//         enabled: false // Disable tooltips to prevent flickering
//       },
//       customYAxisImages // Register the custom plugin
//     },
//     elements: {
//       point: {
//         radius: 6,
//         hoverRadius: 10
//       }
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='row d-flex justify-content-center'>
//         <div className='col-md-10'>
//           <Box sx={{ width: '100%', overflowX: 'auto' }}>
//             <Typography variant="h6" gutterBottom component="div" sx={{ mb: 2 }}>
//               Mood Analysis Over Time
//             </Typography>
//             <Box sx={{ minWidth: '1000px', width: `${chartData.labels.length * 50}px` }}>
//               <Line data={chartData} options={options} plugins={[customYAxisImages]} height={400} />
//             </Box>
//           </Box>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoodLineChart;
