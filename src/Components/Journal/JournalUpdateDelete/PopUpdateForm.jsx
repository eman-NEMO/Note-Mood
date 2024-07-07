import React, { useEffect } from "react";
import { useState } from "react";
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
import './PopUpUpdate.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{useCloseJournalsUpdate} from '../../../Context/JournalCloseUpdate';

import {useIdJournal} from '../../../Context/IdContext'
import {useBaseUrl} from '../../../Context/BaseUrlContext'
dayjs.extend(customParseFormat);
export default function PopUpdateForm() {
  const {base ,setBase}=useBaseUrl()
    const { journals, setJournals} = useJournals();
    const  {clos ,setClose}=useCloseJournals()
    const  {closUpdate ,setCloseUpdate}=useCloseJournalsUpdate()
    const {id ,setId,specJournal,setSpecJournal}=useIdJournal()
    const [selectedDate, setSelectedDate] = useState();
    const [selectedtime, setSelectedTime] = useState();
    const [specLoading, setSpecLoading] = useState(false);  // State to track loading status
       // State to store the journal data
       const [update,setUpdate]=useState(false)
       const [isLoading, setisLoading] = useState(false);
    
 

    
   


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

 

        async  function JournalUpdate(values){
          console.log("values",values)
             const token = localStorage.getItem('userToken');
           
           
       
             if(values.Time===null&&values.Date===null){
              //  toast.error('Time and Date Are reqired');
              values.Date=specJournal.date
              values.Time=specJournal.time
              //  return
             }
             if(values.Time===null){
              //  toast.error('Time is reqired');
              //  return
              values.Time=specJournal.time
             }
             if(values.Date===null){
              //  toast.error('Date is reqired');
              //  return
              values.Date=specJournal.date
             }
             const updatedValues = {
              id: id, 
              title: values.title,
              content: values.content,
              date:values.Date,
              time: values.Time,
              overallSentiment:specJournal.overallSentiment
              
          };
          console.log("updated values",updatedValues)
          setSpecLoading(true)
             try {
              // console.log(updatedValues);
               const response = await axios.put(`${base}/api/Entry/Update`, updatedValues, {
                 headers: {
                 'Authorization': `Bearer ${token}`,
                 "Content-Type":'application/json',
                 "ngrok-skip-browser-warning" : "ssdf",
                 }
               });
               if (response.status === 200 || response.status === 201) {
                 const updatedJournal = response.data; 
                 console.log("updatedjouranl00",updatedJournal)
                 setJournals(prevJournals => prevJournals.map(journal => 
                  journal.id === updatedJournal.id ? updatedJournal : journal
                ));
                
            
                 setCloseUpdate(false)
                 Swal.fire({
                   title: 'Success!',
                   text: 'Updated Successfully',
                   icon: 'success',
                   confirmButtonText: 'Ok'
               })
            
     
                
             }
             setSpecLoading(false)
     
               return response.data;
             } catch (error) {
              Swal.fire({
                title: "Error",
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            setSpecLoading(false)
               throw error; 
             }
           
       }
       
       async  function JournalDelete(){
           const token = localStorage.getItem('userToken');
           console.log(token)
           setCloseUpdate(false)
           const result = await Swal.fire({
            title: 'Delete',
            text: 'Are you sure to Delete?',
            icon: 'warning',
            showCancelButton: true,  
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        
        if(result.value){
           try {
             const response = await axios.delete(`${base}/api/Entry/Delete`,{
              params: { id: id },
              headers: {
                'id':id,
               'Authorization': `Bearer ${token}`,
               "Content-Type":'application/json',
               "ngrok-skip-browser-warning" : "ssdf",
               }
             });
             if (response.status === 204 || response.status === 200) {
              setJournals(prevJournals => prevJournals.filter(journal => journal.id !== id));
              setCloseUpdate(false)
               Swal.fire({
                 title: 'Success!',
                 text: 'Deleted Successfully',
                 icon: 'success',
                 confirmButtonText: 'Ok'
             })           
           }
           } catch (error) {
            Swal.fire({
              title: "Error",
              text: error,
              icon: 'error',
              confirmButtonText: 'Ok'
          })
             throw error; 
           }
     }
     
    }
  
    let formik = useFormik({
      initialValues: {
        id:1,
        title: '',
        content: '',
        Date:null,
        Time: null,
      
      },
      validationSchema: validationSchema,
      onSubmit:JournalUpdate  
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
  useEffect(() => {
 
   
    formik.setValues({
        title: specJournal.title,
        content: specJournal.content,
        Date:null,
        Time: null,
       
    });
  }, []);
  return (
     <>
<form onSubmit={formik.handleSubmit}>
<div className="pop_up_form mt-2">
  
     <div className="date-time-picker me-2 mt-2 mb-2">
     {/* {console.log(id)} */}
       {update?<LocalizationProvider dateAdapter={AdapterDayjs} >
       {/* <h5>{specJournal.date}</h5>  */}
     <DatePicker
       label="Date"
       slotProps={{ textField: { size: 'small' } }}
       value={selectedDate}
       onChange={value => formik.setFieldValue('Date', value.format('YYYY-MM-DD'))}
     
       renderInput={(params) => <input {...params}  />}
       inputFormat="YYYY-MM-DD" 
     />
    </LocalizationProvider>:


       <div className="d-flex"><i class="fa-regular fa-calendar" style={{color: '#181c21',fontSize:'25px'}}></i>  <h5 className="
       ms-2">{specJournal.date}</h5></div>
    }
     
    {update? <LocalizationProvider dateAdapter={AdapterDayjs} >
    {/* <h4>{specJournal.time}</h4>  */}
        <TimePicker
          label="Time"
          slotProps={{ textField: { size: 'small' } }}
          onChange={value => formik.setFieldValue('Time', value.format('HH:mm:ss'))}
          
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
         
          }}
       
       
        />
  
    </LocalizationProvider>: 
    
    
    
    
    <div className="d-flex ms-5"><i class="fa-regular fa-clock" style={{color: '#181c21',fontSize:'25px'}}></i>  <h5 className="
       ms-2">{specJournal.time}</h5></div> }
     </div>
    
      <div className="mt-3">
   
      <label htmlFor="title" className={`journal_title`} > Journal Title </label>
      {update? <input  placeholder="" type="text" className={`form-control title mt-2 `} id="title"  value={formik.values.title} name='title'onChange={formik.handleChange} onBlur={formik.handleBlur} />: <input  placeholder="eman" type="text" className={`form-control title mt-2 `} id="title"  value={formik.values.title} name='title' disabled   onChange={formik.handleChange} onBlur={formik.handleBlur} />}
      {(formik.errors.title  && formik.touched.title) ?   <h6  className="text-danger"><span>*!</span>{formik.errors.title}</h6> : null}
      </div>
      <div>
      <label htmlFor="content" className="form-label content_title">Journal Content</label>
          {update?  <textarea
            
              type="text"
              className="form-control content"
              id="content"
              rows="7"
              style={{ maxHeight: ` ${formik.errors.title||formik.errors.content ?'100px':'150px'}` , overflowY: 'auto',height:` ${formik.errors.content||formik.errors.title ?'100px':'150px'}` }}
              value={formik.values.content} name='content'  onChange={formik.handleChange} onBlur={formik.handleBlur}
            ></textarea>:  <textarea
            disabled  
            type="text"
            className="form-control content"
            id="content"
            rows="7"
            style={{ maxHeight: ` ${formik.errors.title||formik.errors.title ?'100px':'150px'}` , overflowY: 'auto',height:` ${formik.errors.content||formik.errors.content ?'100px':'150px'}` }}
            value={formik.values.content} name='content'  onChange={formik.handleChange} onBlur={formik.handleBlur}
          ></textarea>}
              {(formik.errors.content && formik.touched.content) ?   <h6  className="text-danger"><span>*!</span>{formik.errors.content}</h6> : null}
      </div>
      <div className="d-flex justify-content-end">
    {!update?<button type="button" className={` btn w-50 Delete_btn bg-danger`} onClick={()=>{JournalDelete()}}> Delete </button>:''}
     {update? specLoading ?<button type="button" className={`btn w-50 submit_btn`}> <i className=" fa-solid fa-spinner fa-spin "></i> </button>:<button type="submit" onClick={handleSubmit} className={`btn w-50 submit_btn`}> Save </button>:''}
      {update? '':<button type="button" className={` btn w-50 submit_btn me-5`} onClick={()=>{setUpdate(true)}}> Update </button>}
       </div>
    </div>

      </form>
     


      <ToastContainer

/>





     

     </>
  );
}
