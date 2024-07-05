import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import positiveImg from '../../Assets/green_normal.svg';
import neutralImg from '../../Assets/yellow_normal.svg';
import negativeImg from '../../Assets/blue_normal.svg';
import './Chart.scss';
import { useBaseUrl } from '../../Context/BaseUrlContext';
// Register only necessary components for PieChart
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const {base ,setBase}=useBaseUrl()
    const { ChartPageData, setChartPageData } = useBaseUrl()
    const [data, setData] = useState({
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: ['#03964C', '#F0B518', '#0455AE'],
            hoverBackgroundColor: ['#036e3e', '#d9a31b', '#03477a'],
            borderWidth: 1,
        }],
    });
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();  // Stop observing once it's in view
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
    }, []);

    useEffect(() => {
        if (isVisible) {
            fetchData();
        }
    }, [isVisible]);

    useEffect(() => {
        if (ChartPageData.length > 0) {
            process(ChartPageData);
        }
    }, [ChartPageData]);

    const fetchData = async () => {
        const token = localStorage.getItem('userToken');
        try {
            const response = await axios.get(`${base}/api/Sentiment/DailySentimentCounts`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.data && Array.isArray(response.data)) {
                setChartPageData(response.data);
                console.log(response.data);
            } else {
                console.error("Data is not an array:", response.data);
            }
        } catch (error) {
            console.error("Failed to fetch sentiment data:", error);
        }
    };

    const process = (data) => {
        const defaultData = { Positive: 0, Neutral: 0, Negative: 0 };
        data.forEach(item => {
            defaultData[item.sentiment] = Math.round(item.percentage);
        });

        setData({
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
                data: [defaultData.Positive, defaultData.Neutral, defaultData.Negative],
                backgroundColor: ['#03964C', '#F0B518', '#0455AE'],
                hoverBackgroundColor: ['#036e3e', '#d9a31b', '#03477a'],
                borderWidth: 1,
            }],
        });
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateScale: true,
            animateRotate: true,
        },
        plugins: {
            datalabels: {
                formatter: (value) => {
                    return value + '%';
                },
                color: '#fff',
                borderRadius: 3,
                font: {
                    weight: 'bold',
                    size: 12,
                },
                padding: 6,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += context.raw + '%';
                        }
                        return label;
                    }
                }
            },
            legend: {
                display: false
            },
        },
        cutout: '50%',
         radius: '100%',
    };

    return (
        <div ref={chartRef} className="col-md-6 mb-3 mt-5 p-4">
            <div className='chart-and-legend chart-container'>
                <div className="chart-container-title">Day Percentage</div>
                <div className="chart mt-5">
                    <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
                </div>
                <div className="legend d-flex justify-content-center">
                    <div className="legend-item mt-5 ms-3 me-3">
                        <img src={positiveImg} alt="Positive" />
                        <span>{data.datasets[0].data[0]}%</span>
                    </div>
                    <div className="legend-item mt-5 ms-3 me-3">
                        <img src={neutralImg} alt="Neutral" />
                        <span>{data.datasets[0].data[1]}%</span>
                    </div>
                    <div className="legend-item mt-5 ms-3 me-3">
                        <img src={negativeImg} alt="Negative" />
                        <span>{data.datasets[0].data[2]}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PieChart;
