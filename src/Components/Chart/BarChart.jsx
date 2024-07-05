import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import positiveImg from '../../Assets/green_normal.svg';
import neutralImg from '../../Assets/yellow_normal.svg';
import negativeImg from '../../Assets/blue_normal.svg';
import './Chart.scss';
import { useBaseUrl } from '../../Context/BaseUrlContext';

const MoodBarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const imagesLoaded = useRef({ positive: null, neutral: null, negative: null });
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);
  const { ChartPageData, setChartPageData } = useBaseUrl();
  const {base ,setBase}=useBaseUrl()
  useEffect(() => {
    loadImages();
    setupIntersectionObserver();
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

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once it's in view
        }
      });
    }, { threshold: 0.5 });

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  };

  useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  useEffect(() => {
    if (ChartPageData.length > 0) {
      processChartData(ChartPageData);
    }
  }, [ChartPageData]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${base}/api/Sentiment/DailySentimentCounts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data)) {
        setChartPageData(response.data);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch sentiment data:', error);
    }
  };

  const processChartData = (data) => {
    const defaultData = { Positive: 0, Neutral: 0, Negative: 0 };
    data.forEach(item => {
      defaultData[item.sentiment] = item.count;
    });

    const labels = Object.keys(defaultData);
    const counts = Object.values(defaultData);
    const backgroundColors = labels.map(label => {
      if (label === 'Positive') return '#03964C';
      if (label === 'Neutral') return '#F0B518';
      if (label === 'Negative') return '#0455AE';
      return '#000000';
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Number of Days',
          data: counts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          barThickness: 40,
        },
      ],
    });
  };

  const customXAxisImages = {
    id: 'customXAxisImages',
    afterDraw: (chart) => {
      const { ctx, scales: { x }, chartArea: { bottom } } = chart;

      if (!imagesLoaded.current.positive) return;

      const sentimentToImage = {
        'Positive': imagesLoaded.current.positive,
        'Neutral': imagesLoaded.current.neutral,
        'Negative': imagesLoaded.current.negative
      };

      chart.data.labels.forEach((label, index) => {
        const xPos = x.getPixelForValue(index);
        const img = sentimentToImage[label];
        ctx.drawImage(img, xPos - 15, bottom + 10, 30, 30);
      });
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 30,
        top: 20,
        bottom: 50
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'No. of Days'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      customXAxisImages
    }
  };

  return (
    <div ref={chartRef} className="col-md-6 mt-5 mb-3 p-4">
      <div className=''>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-12 chart-container'>
            <div className="chart-container-title">Days per Mood</div>
            <Box>
              <Box>
                <Bar data={chartData} plugins={[customXAxisImages]} options={options} height={400} />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodBarChart;
