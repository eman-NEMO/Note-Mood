import React, { useEffect } from 'react'
import Style from './Register.module.css'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../Styles/register.scss'
import RegsterUpImg from './RegsterUpImg';
import RegisterHaveacount from './RegisterHaveacount';
import RegisterDownImg from './RegisterDownImg';
import { useData, useSignUpForm } from './Functions.js';
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from '../Header/Header.jsx';
// import './Register.scss'
import { motion } from 'framer-motion';
export default function RegisterPage() {
    // const [showPassword, setShowPassword] = useState(false);
    const { data, Days, mon, year, } = useData();
    const [showPassword, setShowPassword] = useState(false);
    const {formik ,isloading}=useSignUpForm()
    // {console.log(formik.fullName)}
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

    const pageVariants = {
        in: {
          opacity: 1,
          x: 0
        },
        out: {
          opacity: 0,
         // x: "-100%"
        }
      };
      
    //   const pageTransition = {
    //     type: "tween",
    //     ease: "anticipate",
    //     duration: 1  // Increase duration to 1.5 seconds
    //   };

    const variants = {
        fromTop: {
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 }
        },
        fromBottom: {
            hidden: { opacity: 0, y: 350},
            visible: { opacity: 1, y: 0 }
        },
        fromIts: {
            hidden: { opacity: 0, y: 0 },
            visible: { opacity: 1, y: 0 }
        },
        fromLeft: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 }
        },
        fromRight: {
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 }
        }
    };
    // useEffect(() => {
    //     // Set the body style on component mount
    //     document.body.style.overflow = 'hidden';
    
    //     // Revert the body style on component unmount
    //     return () => {
    //       document.body.style.overflow = 'hidden';
    //     };
    //   }, []);
    

    return (
        <>

{/* <motion.div
      initial="out"
      animate="in"
      exit="out"
     // variants={pageVariants}
      variants={pageTransition} 
      transition={{ type: "tween", duration: .1 }}
    > */}
<div className='container register mt-3 position-relative' id='regester_id'>

                <form className='' onSubmit={formik.handleSubmit}>
                    <div className='row'>
                    <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1,duration:.4}}>
                        <RegsterUpImg/>
                        </motion.div>
                        <div className='col-md-6  '>
                        <motion.div variants={variants.fromBottom} initial="hidden" animate="visible" transition={{ delay: .2 ,duration:.6 }}>
                        <div className='p-3'>
    <h5 className='bold'>Create your Account</h5>

    <div className="mb-2 marg">
            <label htmlFor="Name" className="form-label mainColor bold">Name</label>
            <input
                type="text"
                className={`form-control bold ${formik.errors.fullName && formik.touched.fullName ? 'input-error' : ''}`}
                id="Name"
                name="fullName"
                placeholder='User Name '
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {console.log(formik.errors.fullName && formik.touched.fullName)}
            {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-danger small mt-1">
                    <h6><span>*!</span>{formik.errors.fullName}</h6>
                </div>
            )}
        </div>

    <div className="mb-2 mt-5">
        <label htmlFor="email" className="form-label mainColor ">Email</label>
        <input
            type="email"
            className={`form-control bold ${formik.errors.email && formik.touched.email ? 'input-error' : ''}`}
            id="email"
            name="email"
            placeholder='user@gnail.com'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
           <div className="text-danger small mt-1">
           <h6><span>*!</span>{formik.errors.email}</h6>
       </div>
        )}
    </div>

    <div className="mb-3 mt-5">
        <label htmlFor="password" className="form-label mainColor bold">Password</label>
        <div className="d-flex position-relative">
            <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control bold ${formik.errors.password && formik.touched.password ? 'input-error' : ''}`}
                id="Password1"
                placeholder="***********"
                value={formik.values.password}
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {showPassword ? (
                <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`fa-regular fa-eye position-absolute end-0 top-50 translate-middle-y ${Style.mouse}`}
                ></i>
            ) : (
                <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`fa-regular fa-eye-slash position-absolute end-0 top-50 translate-middle-y ${Style.mouse}`}
                ></i>
            )}
        </div>
        {formik.errors.password && formik.touched.password && (
           <div className="text-danger small mt-1">
           <h6><span>*!</span>{formik.errors.password}</h6>
       </div>
        )}
    </div>
</div>
</motion.div>

                        </div>



                        <div className='col-md-6 margin '>
                        <motion.div variants={variants.fromBottom} initial="hidden" animate="visible" transition={{ delay: 0.4, duration:.6 }}>
                        <div className='p-3'>
    <div>
        <label htmlFor='country' className='form-label mainColor bold'>Country</label>
        <select
            className={`w-100 form-select bold-light ${formik.errors.country && formik.touched.country ? 'input-error' : ''}`}
            name='country'
            id='country'
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        >
            <option value="">Select a country</option>
            {data.map(country => (
                <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
            ))}
        </select>
        {formik.touched.country && formik.errors.country && (
                <div className="text-danger small mt-1">
                <h6><span>*!</span>{formik.errors.country}</h6>
            </div>
        )}
    </div>

    <div className='mt-5 '>
        <div><label htmlFor='DateOfBirth' className='form-label mainColor bold'>Date of Birth</label></div>
        <div className='DateBirth d-flex justify-content-between bold'>
        <div className='birth'>
        <select
                className={`form-select bold-light ${formik.errors.day && formik.touched.day ? 'input-error' : ''}`}
                name='day'
                id='day'
                value={formik.values.day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">Days</option>
                {Days.map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            {formik.touched.day && formik.errors.day && (
                    <div className="text-danger small mt-1">
                    <h6><span>*!</span>{formik.errors.day}</h6>
                </div>
            )}
        </div>
        <div className='birth'>
        <select
                className={`form-select  bold-light d-flex ms-auto ${formik.errors.month && formik.touched.month ? 'input-error' : ''}`}
                name='month'
                id='month'
                value={formik.values.month}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">Month</option>
                {mon.map(month => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            {formik.touched.month && formik.errors.month && (
                   <div className="text-danger small mt-1">
                   <h6><span>*!</span>{formik.errors.month}</h6>
               </div>
            )}
        </div>
         <div className='birth'>
         <select
                className={`form-select  bold-light d-flex ms-auto ${formik.errors.year && formik.touched.year ? 'input-error' : ''}`}
                name='year'
                id='year'
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">Year</option>
                {year.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            {formik.touched.year && formik.errors.year && (
                   <div className="text-danger small mt-1">
                   <h6><span>*!</span>{formik.errors.year}</h6>
               </div>
            )}
         </div>
        </div>
    </div>

    <div className='Gender mt-5'>
        
            <label className='mainColor  '>Gender</label>
            <div className='d-flex row justify-content-between mt-1'>
                <div className={`col-md-6 gender d-flex align-items-center rounded-1 bold-light ${formik.errors.gender && formik.touched.gender ? 'input-error' : ''}`}>
                    <input
                        className='m-2'
                        type="radio"
                        value="Male"
                        name="gender"
                        id="male"
                        checked={formik.values.gender === 'Male'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    /> Male
                </div>
                <div className={`col-md-6 gender d-flex align-items-center rounded-1 bold-light ${formik.errors.gender && formik.touched.gender ? 'input-error' : ''}`}>
                    <input
                        className='m-2'
                        type="radio"
                        value="Female"
                        name="gender"
                        id="female"
                        checked={formik.values.gender === 'Female'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    /> Female
                </div>
            </div>
            {formik.touched.gender && formik.errors.gender && (
                    <div className="text-danger small mt-1">
                    <h6><span>*!</span>{formik.errors.gender}</h6>
                </div>
            )}
     
    </div>
</div>
</motion.div>


                        </div>

                    </div>



                    {
        isloading?
         <div className={` d-flex justify-content-center`}>
        <button className={` spinner btn w-50 buton `}><i className=" fa-solid fa-spinner fa-spin "></i></button>
            {/* <button type="submit" className={`buton btn w-50`}> Sign Up </button> */}
        </div>  :
           <motion.div variants={variants.fromBottom} initial="hidden" animate="visible" transition={{ delay: .5, duration:.6}}>
         <div className={` d-flex justify-content-center`}>
                
         <button type="submit" className={`buton btn w-50`}> Sign Up </button>
     </div>
     </motion.div>
        

      }
                   
                </form>
                <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1 ,duration:.4 }}>
                <RegisterDownImg />
                </motion.div>
                <motion.div variants={variants.fromIts} initial="hidden" animate="visible" transition={{ delay: 1 ,duration:.4 }}>
                <RegisterHaveacount />
                </motion.div>
               

            </div>
            {/* </motion.div> */}
        </>
    )
}
