import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import key from '../../Assets/key.svg'
import { useFormik  } from 'formik'
import * as Yup from "yup"
import './ChangePassword.scss'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {useBaseUrl} from '../../Context/BaseUrlContext'
export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isloading,setIsloading]=useState(false)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');
  const [err,setError]=useState(null)
  const {base ,setBase}=useBaseUrl()
  let navigate =useNavigate()

  async function loginSubmit(values){
    console.log(values)
    let message="";
    // setIsloading(true)
    let response = await  axios.post(`${base}/api/Auth/ChangePassword`,values,{
        headers: {
            'Authorization': `Bearer ${token}`,
          
            }
    }).catch((error)=>{
     console.log("errors",error.response.data)
 
    if(error.response.data==="Invalid email"){
        message=error.response.data
        // console.log(error.response.data);
    }
    else{
        message=error.response.data.errors.ConfirmPassword;
    //   console.log(error.response.data.errors.ConfirmPassword)
    }
  // else if(error.response.data.errors){

  // }
    console.log("message", message)
     Swal.fire({
         title: 'Error!',
         text: message || 'Something went wrong!', // Customize based on your API response
         icon: 'error',
         confirmButtonText: 'Try Again'
     });
    // //  setError(error.response.data);
    
    
    //  console.log(error.response.data)
     setError(error.response.data)
      setIsloading(false)
      }
 )


 console.log(response.data)
   
    
        if (response.data === 'Password changed successfully') {
            Swal.fire({
                title: 'Success!',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                 
               
                 
                   
                    setTimeout(() => navigate('/settings'), 500); // Navigate after a short delay
                }
            });
   //      }
   
   
    }
    else{
        // if(response.data.PasswordMismatch.errors){
            console.log("ffff",response.data.PasswordMismatch.errors[0])
            Swal.fire({
                title: 'Error!',
                text: response.data.PasswordMismatch.errors[0].errorMessage || 'Something went wrong!', // Customize based on your API response
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        //   }

    }
 }




  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?`~]).{8,}$/;
  let x = Yup.object({
      Email: Yup.string().email('Invalid email').required('email is required '),
      CurrentPassword: Yup.string().matches(passwordRegex, 'At least 8 characters,one uppercase,one lowercase,one digit').required('Current Password is required'),
      NewPassword: Yup.string().matches(passwordRegex, 'At least 8 characters,one uppercase,one lowercase,one digit').required('New Password is required'),
      ConfirmPassword: Yup.string().matches(passwordRegex, 'At least 8 characters,one uppercase,one lowercase,one digit').required('Confirm Password is required'),
  })
  let formik = useFormik({
    initialValues: {
        Email: '',
        CurrentPassword:'',
        NewPassword: '',
        ConfirmPassword:'',
    },
    validationSchema: x,
    onSubmit:loginSubmit
})

const pageTransition = {
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
  
    }
  };
  return (
     
    <motion.div
    className='container '
    initial="out"
    animate="in"
    exit="out"
   // variants={pageVariants}
    variants={pageTransition} 
    transition={{ type: "tween", duration: .7 ,delay:.3 }}
  >
    <div className='container '  id='Change_page'>
    <div className='d-flex justify-content-center align-items-center margin_top'>
            <div className='text-center'><div className=''><img src={key} alt="" className='spinning-image ' /></div>
             <div className='mt-3'><h2>Change Password</h2></div>
             <div className='mt-4'><p> Follow these steps to update your password:</p></div></div></div>
    
    
    
        
             <div className="mt-4 ">
                    <div className="  ">
                      
                        <form className="" onSubmit={formik.handleSubmit}>
      
 <div className='row ps-5 pe-5 mb-4'>
 <div className="mb-2 col-md-12 col-sm-12 col-12 col-lg-6 col-xl-6  d-flex justify-content-center" id='emaill'>
   <div className='w-100'>
   <label htmlFor="Email1" className={`form-label NameColor`}>Email</label>
    <input
        type="email"
        className={`form-control label ${formik.errors.Email&&formik.touched.Email ? 'input-error' : ''}`}
        id="Email1"
        placeholder="user@gmail.com"
        value={formik.values.Email}
        name='Email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    {formik.errors.Email && formik.touched.Email && (
         <div className="text-danger small mt-1">  <h6><span>*!</span>{formik.errors.Email}</h6></div>
    )}
   </div>
</div>


<div className="mb-2  col-md-12 col-sm-12 col-12 col-lg-6 col-xl-6  d-flex justify-content-center  " id='passwordd'>
   <div className='w-100'>


   <label htmlFor="CurrentPassword" className={`form-label NameColor`}>Current Password </label>
    <div className="d-flex position-relative">
        <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control label ${formik.errors.CurrentPassword&&formik.touched.CurrentPassword  ? 'input-error' : ''}`}
            id="CurrentPassword"
            placeholder="***********"
            value={formik.values.CurrentPassword}
            name='CurrentPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {showPassword
            ? <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y `}></i>
            : <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y`}></i>
        }
    </div>
   
    {formik.errors.CurrentPassword && formik.touched.CurrentPassword && (
        <div className="text-danger small mt-1"><h6><span>*!</span>{formik.errors.CurrentPassword}</h6></div>
    )}
   </div>
</div> 
    
    </div> 
<div className='row ps-5 pe-5'>
     <div className="mb-2 mt-3 col-md-12 col-sm-12 col-12 col-lg-6 col-xl-6  d-flex justify-content-center " id='passwordd'>
 <div className='w-100'>
 <label htmlFor="NewPassword" className={`form-label NameColor`}> New Password</label>
    <div className="d-flex position-relative">
        <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control label ${formik.errors.NewPassword&&formik.touched.NewPassword  ? 'input-error' : ''}`}
            id="NewPassword"
            placeholder="***********"
            value={formik.values.password}
            name='NewPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {showPassword1
            ? <i onClick={() => setShowPassword1(!showPassword1)} className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y `}></i>
            : <i onClick={() => setShowPassword1(!showPassword1)} className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y`}></i>
        }
    </div>
    {formik.errors.NewPassword && formik.touched.NewPassword && (
        <div className="text-danger small mt-1"><h6><span>*!</span>{formik.errors.NewPassword}</h6></div>
    )}
 </div>
    
   
</div>
    <div className="mb-3  mt-3 col-md-12 col-sm-12 col-12 col-lg-6 col-xl-6  d-flex justify-content-center" id='passwordd'>
       <div className='w-100'>
       <label htmlFor="ConfirmPassword" className={`form-label NameColor`}> Confirm Password</label>
    <div className="d-flex position-relative">
        <input
            type={showPassword ? 'text' : 'ResetPassword'}
            className={`form-control label ${formik.errors.ConfirmPassword&&formik.touched.ConfirmPassword  ? 'input-error' : ''}`}
            id="ConfirmPassword"
            placeholder="***********"
            value={formik.values.ConfirmPassword}
            name='ConfirmPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {showPassword2
            ? <i onClick={() => setShowPassword2(!showPassword2)} className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y `}></i>
            : <i onClick={() => setShowPassword2(!showPassword2)} className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y`}></i>
        }
    </div>
    {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword && (
        <div className="text-danger small mt-1"><h6><span>*!</span>{formik.errors.ConfirmPassword}</h6></div>
    )}
       </div>
 
   
</div>
</div>
           
        <div className='row d-flex justify-content-center mt-5'>
            <div className='btton_width'>
                                
         {
            isloading? <button className={` spinner btn w-100  buton`}><i className=" fa-solid fa-spinner fa-spin "></i></button>:   <div><button  className={`btn w-100  buton`} type='submit'>Change Password</button> </div>
          }
        
            </div>
        </div>
                      
                        </form>
                      
                    </div>
                </div>  
    
        </div>
        </motion.div>
  )
}
