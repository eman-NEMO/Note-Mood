import React from 'react'
import key from '../../Assets/key.svg'
import './ForgetPassword.scss'
import { motion } from 'framer-motion';
import { useFormik  } from 'formik'
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useBaseUrl} from '../../Context/BaseUrlContext'
export default function ForgetPassword() {
  const {base ,setBase}=useBaseUrl()


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

    const [isloading,setIsloading]=useState(false)
    const [err,setError]=useState(null)




    async function ForgetPasswordSubmit(values){
        console.log(values)
 
        setIsloading(true)
        const response = await axios.post(`${base}/api/Auth/ForgotPassword?email=${encodeURIComponent(values.email)}`).catch((error)=>{
       
         Swal.fire({
             title: 'Error!',
             text: error.response.data || 'Something went wrong!', // Customize based on your API response
             icon: 'error',
             confirmButtonText: 'Try Again'
         });
        //  setError(error.response.data);
        
        
         console.log(error.response.data)
         // setError(error.response.data)
          setIsloading(false)
          }
          )
        //   console.log(data.message)
         //  if(data.message=='Login successful'){
         //   setIsloading(false)
         //   localStorage.setItem('userToken',data.token);
         //   setUserToken(data.token)
         //   setError(false)
         //   navigate('/journal')
         //  }
         console.log(response)
 
         if (response.status === 200 || response.status===204) {
             Swal.fire({
                 title: 'Success!',
                 text: response.data,
                 icon: 'success',
                 confirmButtonText: 'Ok'
             }).then((result) => {
                 if (result.isConfirmed) {
                     setError(false);
                     setIsloading(false); 
                 }
             });
         }
 
 
     }

 
    let x = Yup.object({
        email: Yup.string().email('Invalid email').required('email is required ')

    })


    let formik = useFormik({
        initialValues: {
            email: '',
            // password: ''
        },
        validationSchema: x,
        onSubmit:ForgetPasswordSubmit  
    })
  return (

    <motion.div
    className='container '
    initial="out"
    animate="in"
    exit="out"
   // variants={pageVariants}
    variants={pageTransition} 
    transition={{ type: "tween", duration: .7 ,delay:.4 }}
  >
    
    <div className='container ' id='Foreget_page'>
<div className='d-flex justify-content-center align-items-center margin_top'>
        <div className='text-center'><div className=''><img src={key} alt="" className='spinning-image' /></div>
         <div><h2>Forget Password</h2></div>
         <div><p>No worries we will send you Reset instructions</p></div></div></div>
         <div className="  d-flex  justify-content-center">
                <div className=" width_emil ">
                  
                    <form className="mt-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-3 " id='emaill'>
    <label htmlFor="Email1" className={`form-label NameColor`}>Email</label>
    <input
        type="email"
        className={`form-control label ${formik.errors.email&&formik.touched.email ? 'input-error' : ''}`}
        id="Email1"
        placeholder="user@gmail.com"
        value={formik.values.email}
        name='email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    {formik.errors.email && formik.touched.email && (
         <div className="text-danger small mt-1">  <h6><span>*!</span>{formik.errors.email}</h6></div>
    )}
</div>                
     {
        isloading? <button className={` spinner btn w-100  buton`}><i className=" fa-solid fa-spinner fa-spin "></i></button>:   <div><button  className={`btn w-100  buton`} type='submit'>Reset Password</button> </div>
      }
     
                  
                    </form>
                  
                </div>
            </div>  

    </div>
    </motion.div>
  )
}
