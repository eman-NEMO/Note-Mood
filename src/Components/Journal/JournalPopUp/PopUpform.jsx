import React from "react";
import { useState } from "react";


import { TextField } from '@mui/material';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios  from "axios";
import Swal from 'sweetalert2'
import { useJournals } from '../../../Context/JournalContext';
import {useCloseJournals} from '../../../Context/JournalCloseContext'
import {  DatePicker  } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import './PopUp.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useBaseUrl} from '../../../Context/BaseUrlContext'
dayjs.extend(customParseFormat);
export default function DatePickerMaterialUI() {
  const {base ,setBase}=useBaseUrl()
    const { journals, setJournals } = useJournals();
    const  {clos ,setClose}=useCloseJournals()
 
  const [selectedDate, setSelectedDate] = useState();
  const [loading , setLoading]=useState();
  const handleDateChange = (newValue) => {

   // Ensure the new value is valid
      // setSelectedDate(newValue);
      setSelectedDate(newValue); // Store the Day.js object
      // const formatted = newValue.format('YYYY-MM-DD'); // Format for display or backend
     
  
      // setSelectedDate(newValue.format('YYYY-MM-DD')); 
      // console.log(newValue.format('YYYY-MM-DD')); 
  };
  const [time, setTime] = useState();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Journal content is required'),
    Date: Yup.date()
      .nullable()
      .test(
        'date-valid',
        'Invalid date',
        value => !value || dayjs(value).isValid()
      )
      .test(
        'date-future',
        'Date cannot be in the future',
        value => !value || dayjs().isAfter(dayjs(value))
      ),
    Time: Yup.string()
      .nullable()
      .test(
        'time-format',
        'Invalid time format',
        value => !value || dayjs(value, 'HH:mm:ss', true).isValid()
      )
      .test(
        'time-future',
        'Time cannot be in the future',
        function (value) {
          const { Date: date } = this.parent;
          if (!value || !date) return true;
  
          const selectedDate = dayjs(date);
          const currentTime = dayjs();
  
          // If the selected date is today, validate time
          if (selectedDate.isSame(currentTime, 'day')) {
            return currentTime.isAfter(dayjs().startOf('day').add(dayjs(value, 'HH:mm:ss').hour(), 'hour').add(dayjs(value, 'HH:mm:ss').minute(), 'minute'));
          }
  
          // If the selected date is in the past, any time is valid
          return true;
        }
      ),
  });
  async  function JournalSubmit(values){
     console.log(values)
        const token = localStorage.getItem('userToken');
        console.log(token)
        console.log(values)
    
     
        setLoading(true);
        try {
          const response = await axios.post(`${base}/api/Entry/Create`, values, {
            headers: {
          'Authorization': `Bearer ${token}`,
          //  "ngrok-skip-browser-warning" : "ssdf",
            }
          });
          if (response.status === 200 || response.status === 201) {
            const newJournal = response.data; // adjust this depending on how the response is structured
            setJournals(prevJournals => [...prevJournals, newJournal]);
           setClose(false)
            Swal.fire({
              title: 'Success!',
              text: 'Added Successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
          })
       //  setClose(true)

           
        }
        setLoading(false);

        return response.data;
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data,
          });
          // console.error('Error creating entry:', error);
          setLoading(false)
          throw error; 
        }
      
  }
    let formik = useFormik({
      initialValues: {
        id:1,
        title:'',
        content: '',
        Date: null,
        Time: null,
   
      
      },
      validationSchema: validationSchema,
      onSubmit:JournalSubmit  
  })
  const handleSubmit = () => {
    if (!formik.isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid input',
        text: formik.errors.Date || formik.errors.Time,
      });
    } else {
      formik.handleSubmit();
    }
  };
    // useEffect(() => {
    //     // This function will run whenever selectedDate changes
    //     console.log("Selected Date:", selectedDate);
    //     // You can perform any other action here, such as updating the state or sending the selected date to the server
    //   }, [selectedDate]); // Watch for changes in selectedDate
  return (
     <>
      <form onSubmit={formik.handleSubmit}>
       <div className="pop_up_form">
  
     <div className="date-time-picker me-2 mt-2 mb-2">
     <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
        label="Date"
        slotProps={{ textField: { size: 'small' } }}
        value={selectedDate}
        // onChange={handleDateChange}
        onChange={value => formik.setFieldValue('Date', value.format('YYYY-MM-DD'))}
        renderInput={(params) => <input {...params}  />}
        inputFormat="YYYY-MM-DD"  // Specify the format here
      />
     </LocalizationProvider>
     <LocalizationProvider dateAdapter={AdapterDayjs} >
        <TimePicker
          label="Time"
          slotProps={{ textField: { size: 'small' } }}
          // onChange={handleTimeChange}
          // values={formik.values.content}
          onChange={value => formik.setFieldValue('Time', value.format('HH:mm:ss'))}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
         
          }}
       
       
        />
  
    </LocalizationProvider>
     </div>
    
      <div className="mt-3">
   
      <label htmlFor="title" className={`journal_title`} > Journal Title </label>
      <input type="text" className={`form-control title mt-2  ${formik.errors.title&&formik.touched.title ? 'input-error' : ''}` } id="title"  value={formik.values.title} name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.title && formik.touched.title && (
  <h6  className="text-danger"><span>*!</span>{formik.errors.title}</h6>
    )}
      </div>
      <div>
      <label htmlFor="content" className="form-label content_title">Journal Content</label>
            <textarea
              type="text"
              className={` form-control content ${formik.errors.email&&formik.touched.email ? 'input-error' : ''}`}
              id="content"
              rows="7"
              style={{ maxHeight: ` ${formik.errors.content||formik.errors.title ?'100px':'150px'}` , overflowY: 'auto',height:` ${formik.errors.content||formik.errors.title ?'100px':'150px'}` }}
              value={formik.values.content} name='content' onChange={formik.handleChange} onBlur={formik.handleBlur}
            ></textarea>
             {formik.errors.content && formik.touched.content && (
              
     <h6  className="text-danger"><span>*!</span>{formik.errors.content}</h6>
    )}
      </div>
       <div className="d-flex justify-content-end">
        {loading? <button type="button" className={` btn w-50 submit_btn`}><i className=" fa-solid fa-spinner fa-spin "></i></button>: <button type="submit" onClick={handleSubmit} className={` btn w-50 submit_btn`}> Save </button>}
       </div>
    </div>

      </form>
     


      <ToastContainer
 


/>





     

     </>
  );
}