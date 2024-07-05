import React, { useState } from 'react';
import penn from '../../Assets/pennn.svg';
import close from '../../Assets/close.svg';
import time from '../../Assets/time 1.svg';
import star from '../../Assets/Stars-Shape 1.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useBaseUrl } from '../../Context/BaseUrlContext';
import { motion } from 'framer-motion';
export default function PopUpChart() {
    const {ChartPageData,setChartPageData}=useBaseUrl(null)
    const {closeTimePop,setTimePop}=useBaseUrl()
    const {LineChartData,setLineChartData}=useBaseUrl()
    const {show,setshow}=useBaseUrl()
    const {base ,setBase}=useBaseUrl()
    const validationSchema = Yup.object().shape({
        startDate: Yup.date()
          .nullable()
          .test(
            'startDate-future',
            'Start date cannot be in the future',
            value => !value || dayjs().isAfter(dayjs(value))
          )
          .test(
            'startDate-endDate',
            'Start date cannot be after end date',
            function (value) {
              const { endDate } = this.parent;
              return !value || !endDate || dayjs(value).isBefore(dayjs(endDate)) || dayjs(value).isSame(dayjs(endDate));
            }
          ),
        endDate: Yup.date()
          .nullable()
          .test(
            'endDate-future',
            'End date cannot be in the future',
            value => !value || dayjs().isAfter(dayjs(value))
          )
          .test(
            'endDate-startDate',
            'End date cannot be before start date',
            function (value) {
              const { startDate } = this.parent;
              return !value || !startDate || dayjs(value).isAfter(dayjs(startDate)) || dayjs(value).isSame(dayjs(startDate));
            }
          ),
      });
      
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
    const formik = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const token = localStorage.getItem('userToken');
        const params = {};
        if (values.startDate) params.startDate = values.startDate.format('YYYY-MM-DD');
        if (values.endDate) params.endDate = values.endDate.format('YYYY-MM-DD');

        const [sentimentCountsResponse, moodPerDayResponse] = await Promise.all([
          axios.get(`${base}/api/Sentiment/DailySentimentCounts`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params
          }),
          axios.get(`${base}/api/Sentiment/MoodPerDay`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params
          })
        ]);
        setTimePop(false)
        Swal.fire({
          icon: 'success',
          title: 'Dates submitted',
          text: `Start Date: ${params.startDate || 'Not provided'}, End Date: ${params.endDate || 'Not provided'}`,
        });
    

        setChartPageData(sentimentCountsResponse.data)
        setLineChartData(moodPerDayResponse.data)
        console.log(sentimentCountsResponse.data)
        console.log(moodPerDayResponse.data)
        if(moodPerDayResponse.data.length>0){
          setshow(true)
        }
        else{
          setshow(false)
        }
        // console.log('API Response:', response.data);

      } catch (error) {
        console.error('Failed to fetch data:', error);
        Swal.fire({
          icon: 'error',
          title: 'API Request Failed',
          text: 'There was an error processing your request. Please try again.',
        });
      }
    },
  });

  const handleSubmit = () => {
    if (!formik.isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid input',
        text: formik.errors.startDate || formik.errors.endDate,
      });
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <div id='popUpChart'>
           <motion.div
        className='container '
        initial="out"
        animate="in"
        exit="out"
        // variants={pageVariants}
        variants={pageTransition}
        transition={{ type: "tween", duration: .6 }}
      >
      <div className='overlay'>
        <div className='content rounded-4'>
          <form onSubmit={formik.handleSubmit}>
            <div className=''>
              <div className='d-flex m-3'>
                <img src={time} alt="" className='time' />
                <h4 className='ms-2 mt-1'>Edit Estimation Time</h4>
              </div>
              <div className='d-flex justify-content-between ms-5 me-5 mt-4'>
                <div className=''>
                  <h6 className='start_end_date'>Start Date</h6>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  className='me-3'
                    slotProps={{ textField: { size: 'small' } }}
                    label="Start Date"
                    value={formik.values.startDate}
                    onChange={value => formik.setFieldValue('startDate', value)}
                    renderInput={(params) => <TextField {...params} size="small" error={!!formik.errors.startDate} helperText={formik.errors.startDate} />}
                  />
                </LocalizationProvider>
                </div>
                 <div>
                 <h6 className='start_end_date'>End Date</h6>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      slotProps={{ textField: { size: 'small' } }}
                    label="End Date"
                    value={formik.values.endDate}
                    onChange={value => formik.setFieldValue('endDate', value)}
                    renderInput={(params) => <TextField {...params} size="small" error={!!formik.errors.endDate} helperText={formik.errors.endDate} />}
                  />
                </LocalizationProvider>
                 </div>
              </div>
              <div className='d-flex justify-content-end m-5'>
              <button type="submit" onClick={handleSubmit} className={`btn submit_btn`}> Save </button>
              </div>
            </div>
          </form>
        </div>
        <img src={star} alt="" className='position-absolute star' />
        <img src={penn} alt="" className='position-absolute pen' />
        <img src={close} onClick={()=>{setTimePop(false)}} alt="" className='position-absolute close pointer' />
      </div>
      </motion.div>
    </div>
  );
}
