import React from 'react'
import { useState,useContext } from 'react'
import Style from "./Login.module.css";
import { useFormik } from 'formik'
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.js'
import './Login.scss'
import Swal from 'sweetalert2'
import {useBaseUrl} from '../../Context/BaseUrlContext'
import { TextField, Button, CircularProgress } from '@mui/material';
export default function Form() {
    const {base ,setBase}=useBaseUrl()
    let {setUserToken}=useContext(UserContext)
    let navigate=useNavigate();
   
    const [isloading,setIsloading]=useState(false)
    const [err,setError]=useState(null)
    const [showPassword, setShowPassword] = useState(false);


    
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?`~]).{8,}$/;
    let x = Yup.object({
        email: Yup.string().email('Invalid email').required('email is required '),
        password: Yup.string().matches(passwordRegex, 'At least 8 characters,one uppercase,one lowercase,one digit').required('password is required'),
    })
   async function loginSubmit(values){
       console.log(values)

       setIsloading(true)
       let{data}= await  axios.post(`${base}/api/Auth/login`,values).catch((error)=>{
       console.log(error)
        Swal.fire({
            title: 'Error!',
            text: error.response.data || 'Something went wrong!', // Customize based on your API response
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
        setError(error.response.data);
       
       
        console.log(error.response.data)
        // setError(error.response.data)
         setIsloading(false)
         }
         )
         console.log(data.message)
        //  if(data.message=='Login successful'){
        //   setIsloading(false)
        //   localStorage.setItem('userToken',data.token);
        //   setUserToken(data.token)
        //   setError(false)
        //   navigate('/journal')
        //  }

        if (data.message === 'Login successful') {
            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem('userToken', data.token);
                    setUserToken(data.token);
                    setError(false);
                    setIsloading(false);
                    setTimeout(() => navigate('/journal'), 500); // Navigate after a short delay
                }
            });
        }


    }
    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: x,
        onSubmit:loginSubmit  
    })
    return (
        <>
<div className=" col-lg-6  col-md-12 col-sm-12 col-12 col-xl-6 animate-left  container">
                <div className="ps-3 pe-3 pt-3">
                    <p className={Style.EnterCred}>Enter your Credential to Login</p>
                    <form className="mt-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-3 " id='emaill'>
    <label htmlFor="Email1" className={`form-label ${Style.NameColor}`}>Email</label>
    <input
        type="email"
        className={`form-control ${Style.label} ${formik.errors.email&&formik.touched.email ? 'input-error' : ''}`}
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
                        <div className="mb-3 mt-5 " id='passwordd'>
    <label htmlFor="Password" className={`form-label ${Style.NameColor}`}> Password</label>
    <div className="d-flex position-relative">
        <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${Style.label} ${formik.errors.password&&formik.touched.password  ? 'input-error' : ''}`}
            id="Password1"
            placeholder="***********"
            value={formik.values.password}
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {showPassword
            ? <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y ${Style.mouse}`}></i>
            : <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y ${Style.mouse}`}></i>
        }
         <Link className={`position-absolute top-100  text-black ForgetPassPosition`} to='./forgetPassword'><p>Forget Password</p></Link>
    </div>
   
    {/* Optionally, replace the alert with subtler text or remove it entirely */}
    {formik.errors.password && formik.touched.password && (
        <div className="text-danger small mt-1"><h6><span>*!</span>{formik.errors.password}</h6></div>
    )}
</div>

                     
                    
     {
        isloading? <button className={` spinner btn w-100  ${Style.buton}`}><i className=" fa-solid fa-spinner fa-spin "></i></button>:   <div><button  className={`btn w-100  ${Style.buton}`} type='submit'>Sign in</button> </div>
      }
      {/* disabled={!(formik.dirty&&formik.isValid)} */}
                  
                    </form>
                    <div className=" d-flex justify-content-center align-items-center sinUp_font_size" >
                        <span>Don’t have an account ?</span>
                        <Link className='text-decoration-none ms-2 link_color' to="/register">Sign Up</Link>
                    </div>
                </div>
            </div> 

            {/* </motion.div> */}
        </>
    )
}
