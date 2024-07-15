import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import { faBold, faL, faWeight } from '@fortawesome/free-solid-svg-icons';
const LineChartComponent = ({ labels, data }) => {
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Transactions',
        data: data,
        fill: false,
        borderColor: 'rgba(105, 86, 229, 0.6)',
        backgroundColor: 'rgba(105, 86, 229, 0.1)',
        borderWidth: 2,
        tension: 0.7,


        segment: {
            borderColor: (ctx) => {
              return '#aba0f0'; 
            }
          },
          pointBackgroundColor: (ctx) => {
            return ' #aba0f0';  
          },
  
      },

      
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
            font:{
               size:10,
              
            },
          stepSize: 500,
          callback: function (value) {
            return `${value}$`;
          },
        },
      },
    },
    plugins: {
        
      legend: {
        display: false,
        position: 'top',
        labels: {
          boxWidth: 80,
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            return `Amount: ${context.raw}`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 10,
        displayColors: true,
      },
    },
    elements: {
        point: {
          radius: 4,
          hoverRadius: 8
        }
      },
  };

  return (
    <div style={{ height: '300px', width: '400px' }}>
      <Line data={lineChartData} options={options} />
    </div>
  );
};

export default LineChartComponent;
