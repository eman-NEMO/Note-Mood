import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import key from '../../Assets/key.svg'
import { useFormik  } from 'formik'
import * as Yup from "yup"
import './ResetPassword.scss'
import Swal from 'sweetalert2';
import axios from 'axios';
import {useBaseUrl} from '../../Context/BaseUrlContext'
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo-ver2.png'
import { Helmet } from 'react-helmet';
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isloading,setIsloading]=useState(false)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');
  const [err,setError]=useState(null)
  let navigate =useNavigate()
  const {base ,setBase}=useBaseUrl()



async function ResetPassword(values) {
  console.log(values);
  setIsloading(true); // Assuming setIsLoading updates a loading state

  try {
      const response = await axios.post(`${base}/api/Auth/ResetPassword`, {
          password: values.password,
          confirmPassword: values.ResetPassword, // Ensure this matches your form field for confirmPassword
          token: token, // Make sure token and email are being correctly passed
          email: email,
      });

      console.log(response.data);
      if (response.status === 200 || response.status === 204) {
          Swal.fire({
              title: 'Success!',
              text: 'Your password has been reset successfully.', // Customize the success message
              icon: 'success',
              confirmButtonText: 'Ok'
          }).then((result) => {
              if (result.isConfirmed) {
                  setError(false);
                  setIsloading(false);
                  navigate('/'); // Navigate or perform further actions
              }
          });
      }
  } catch (error) {
      console.error("Error: ", error);
      setIsloading(false);
      let message = 'Something went wrong!'; // Default error message

      if (error.response && error.response.data) {
          message = error.response.data.title || message; // Customize based on your API error structure
          if (error.response.data.errors) {
              const firstErrorKey = Object.keys(error.response.data.errors)[0];
              message = error.response.data.errors[firstErrorKey][0]; // Display the first error message from the first error key
          }
      }

      Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Try Again'
      });
  }
}

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?`~]).{8,}$/;
  let x = Yup.object({
      // email: Yup.string().email('Invalid email').required('email is required '),
      password: Yup.string().matches(passwordRegex, 'At least 8 characters,one uppercase,one lowercase,one digit').required('password is required'),
      ResetPassword: Yup.string().matches(passwordRegex, 'At least 8 characters,one uppercase,one lowercase,one digit').required('Confirm Password is required'),
  })
  let formik = useFormik({
    initialValues: {
        password: '',
        ResetPassword:''
        // password: ''
    },
    validationSchema: x,
    onSubmit:ResetPassword
})
  return (
    <>
    <Helmet>
    <link rel="icon" href={logo} sizes="10x10" />
        <title>Reset Password</title>
       
       
      </Helmet>
    <div className='container '  id='Reset_page'>
    <div className='d-flex justify-content-center align-items-center margin_top'>
            <div className='text-center'><div className=''><img src={key} alt="" className='spinning-image' /></div>
             <div><h2>Reset Password</h2></div>
             <div><p>No worries we will send you Reset instructions</p></div></div></div>
    
    
    
        
             <div className="  d-flex  justify-content-center">
                    <div className=" width_emil ">
                      
                        <form className="" onSubmit={formik.handleSubmit}>
      
    

       
                        <div className="mb-3 mt-4 " id='passwordd'>
    <label htmlFor="Password" className={`form-label NameColor`}> Password</label>
    <div className="d-flex position-relative">
        <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control label ${formik.errors.password&&formik.touched.password  ? 'input-error' : ''}`}
            id="Password1"
            placeholder="***********"
            value={formik.values.password}
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {showPassword
            ? <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y `}></i>
            : <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y`}></i>
        }
    </div>
    {/* Optionally, replace the alert with subtler text or remove it entirely */}
    {formik.errors.password && formik.touched.password && (
        <div className="text-danger small mt-1"><h6><span>*!</span>{formik.errors.password}</h6></div>
    )}
</div>
    <div className="mb-3  " id='passwordd'>
    <label htmlFor="ResetPassword" className={`form-label NameColor`}> Confirm Password</label>
    <div className="d-flex position-relative">
        <input
            type={showPassword ? 'text' : 'ResetPassword'}
            className={`form-control label ${formik.errors.ResetPassword&&formik.touched.ResetPassword  ? 'input-error' : ''}`}
            id="ResetPassword"
            placeholder="***********"
            value={formik.values.ResetPassword}
            name='ResetPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {showPassword1
            ? <i onClick={() => setShowPassword1(!showPassword1)} className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y `}></i>
            : <i onClick={() => setShowPassword1(!showPassword1)} className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y`}></i>
        }
    </div>
    {/* Optionally, replace the alert with subtler text or remove it entirely */}
    {formik.errors.ResetPassword && formik.touched.ResetPassword && (
        <div className="text-danger small mt-1"><h6><span>*!</span>{formik.errors.ResetPassword}</h6></div>
    )}
</div>
           
                        
         {
            isloading? <button className={` spinner btn w-100  buton`}><i className=" fa-solid fa-spinner fa-spin "></i></button>:   <div><button  className={`btn w-100  buton`} type='submit'>Reset Password</button> </div>
          }
          {/* disabled={!(formik.dirty&&formik.isValid)} */}
                      
                        </form>
                      
                    </div>
                </div>  
    
        </div>
        </>
  )
}
