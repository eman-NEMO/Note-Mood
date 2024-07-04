import React from 'react';
import './Settting.scss';  // Assume CSS styles are defined here
import { useState, useEffect } from 'react';
import { useData, useSignUpForm } from '../../Components/Register/Functions.js';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Swal from 'sweetalert2';
import user_profile from '../../Assets/userProfile.png'
import info_icon from '../../Assets/info_icon.svg'
import update_profile_btn from '../../Assets/update_profile_btn.svg'
import change_password_btn from '../../Assets/change_password_btn.svg'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import pattern from '../../Assets/pattern.svg'
import young_girl from '../../Assets/young-girl.png'
import {useBaseUrl} from '../../Context/BaseUrlContext'
function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(young_girl);
  const [profileData, setJProfileData] = useState([]);
  const [profileUpdate, setProfileUpdate] = useState(false)
  const [loading, setLoading] = useState(false);
  const [Update_loading, Update_setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {base ,setBase}=useBaseUrl()
  let navigate = useNavigate()
  const { data, Days, mon, year, } = useData();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  function ResetPge() {
    navigate('/ChangePassword')
  }


  async function profile_update(values) {

    const token = localStorage.getItem('userToken');
    console.log("ghsfgsj", values)
    // values.month=2
    const updatedValues =
    {
      fullName: values.fullName,
      country: values.country,
      gender: values.gender,
      day: values.day,
      month: values.month,
      year: values.year,
      email: values.email,
      password: "!@123hHJkljjnk"
    };
    console.log(updatedValues)




    try {
      const response = await axios.put(`${base}/api/Profile/Update`, updatedValues, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": 'application/json'

        }
      });
      if (response.status === 200 || response.status === 201) {

        Swal.fire({
          title: 'Success!',
          text: 'Updated Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })



        setProfileUpdate(false)


      }


      return response.data;

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

  async function ProfileData() {
    const token = localStorage.getItem('userToken');
    console.log(token)
    try {
      const response = await axios.get(`${base}/api/Profile/GetProfile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "ngrok-skip-browser-warning": "sdfsdf",
        }

      });
      return response.data;
    } catch (error) {
      console.error('Error fetching journals:', error);
      throw error;
    }
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?`~]).{8,}$/;
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // password: Yup.string()
    //   .matches(
    //     passwordRegex,
    //     "Password must contain at least 8 characters,1 upper,1 lower,1 digit,1 special char"
    //   )
    //   .required("Password is required"),
    country: Yup.string().required("Country is required"),
    day: Yup.number().required("Day required"),
    month: Yup.string().required("Month required"),
    year: Yup.number().required("Year required"),
    gender: Yup.string().required("Gender is required"),
  });


  const formik = useFormik({
    initialValues: {
      fullName: '',
      country: '',
      gender: '',
      day: '',
      month: '',
      year: '',
      email: ''
      // password: "",

      // Add initial values for other fields...
    },

    validationSchema: validationSchema,
    onSubmit: profile_update


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

  useEffect(() => {



    setLoading(true);
    ProfileData()
      .then(data => {
        setJProfileData(data);
        formik.setFieldValue('gender', data.gender)
        formik.setFieldValue('fullName', data.fullName)
        formik.setFieldValue('country', data.country)
        // formik.setFieldValue('password','')
        formik.setFieldValue('email', data.email)
        formik.setFieldValue('day', data.day)
        formik.setFieldValue('month', 'April')
        formik.setFieldValue('year', data.year)
        //     Set the fetched journals to state
        setLoading(false);
        console.log(data)
      })
      .catch(error => {
        console.error('Failed to fetch journals:', error);
        setError(error);
        setLoading(false);
      });
  }, []);


  // const formik = useFormik({
  //   initialValues: {
  //     fullName: '',
  //     email: '',
  //     country: '',
  //     gender: '',
  //     // other fields as necessary
  //   },
  //   validationSchema: Yup.object({
  //     fullName: Yup.string().required('Full name is required'),
  //     email: Yup.string().email('Invalid email address').required('Email is required'),
  //     // other validations as necessary
  //   }),
  //   onSubmit: values => {
  //     console.log('Form data', values);
  //     // Perform submission logic here
  //   },
  // });

  //  function print(){
  //   console.log("wdw")
  // }

  return (
    <>
      {/* <div className='background'></div>
            <div className='background1'></div>
            <div className='background2'></div>
            <div className='background3'></div> */}
      <motion.div
        className='container '
        initial="out"
        animate="in"
        exit="out"
        // variants={pageVariants}
        variants={pageTransition}
        transition={{ type: "tween", duration: .7, delay: .3 }}
      >

        <div className='container Setting_page' id='Profile_id'>

          <div className='row mt-3'>
            <div className='d-flex '>
              <img src={user_profile} alt="" className='profile_img_size' />
              <p className='Profile_style ms-3'>Profile </p>
            </div>
          </div>
          <div className="container mt-3 mb-4 Main_con_color   ">


            <div className=" ">
              <div className="">
                {/* <div className='row'> */}


                {/* </div> */}
                <div className="row justify-content-center">

                  <div className="col-lg-12 mb-4 d-flex justify-content-center align-items-center">

                    <div className="   text-center " > {/* Increase height here */}


                      <div className='bg-light rounded-circle ' style={{ width: '250px', height: '200px' }}>
                        <img src={profileImage}
                          className=""
                          alt="avatar"
                          style={{ width: '170px', height: '170px', cursor: 'pointer' }}
                        />
                      </div>

                      <div className="card_body mt-2 ">
                        <h5 className="card_title">{profileData.fullName}</h5>
                        <p className="card_text">{profileData.email}</p>
                        <p className="card_text">{'Note Mood User'}</p>
                        <div className=''>
                          {/* <button className="btn buton   " onClick={()=>{setProfileUpdate(true)}}> <img src={update_profile_btn} alt=""  className=''/><span className='ms-1'>Update Profile</span></button> */}
                          {/* <button className="btn butonn bg-danger " onClick={()=>{ResetPge()}}> <img src={change_password_btn} alt=""  className=''/><span className='ms-1'>Reset Password</span></button> */}
                        </div>
                        {/* <button className="btn btn-outline-secondary ms-2">Message</button> */}
                      </div>
                    </div>
                  </div>


                  <div className="col-lg-12">
                    <div className="card-body pe-5 ps-5 ">
                      <form onSubmit={formik.handleSubmit}>

                        <div className="row mt-3 ">
                             
                             <div className='col-md-6'>
                                            <div className='ps-4 pe-4'>
                                            <div className='col-md-12 mt-4'>
                            <div className="  ">
                              <div><h6 className="mb-1 Font_des" >Full Name</h6></div>
                            </div>
                            <div className=" ">
                              <input
                                type="text"
                                disabled={!profileUpdate}
                                className={`form-control bold ${formik.errors.fullName && formik.touched.fullName ? 'input-error' : ''} `}
                                id="Name"
                                name="fullName"
                                placeholder='Eman ibrahim'
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.touched.fullName && formik.errors.fullName && (
                                <div className="text-danger small mt-1">
                                  <h6><span>*!</span>{formik.errors.fullName}</h6>
                                </div>
                              )}
                            </div>


                             </div>
                             <div className='col-md-12 mt-5'>
                            <div className="col-md-3 mt-2">
                              <h6 className="mb-0 Font_des">Email</h6>
                            </div>
                            <div className=" text-secondary">
                              <input
                                disabled={!profileUpdate}
                                type="email"
                                className={`form-control bold ${formik.errors.email && formik.touched.email ? 'input-error' : ''}`}
                                id="email"
                                name="email"
                                placeholder="emanelkaser@gmail"
                                value={formik.values.email}
                                // values={profileData.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.email && formik.touched.email && (
                                <div className="text-danger small mt-1">
                                  <h6><span>*!</span>{formik.errors.email}</h6>
                                </div>
                              )}
                            </div>



                          </div>
                          <div className='col-md-12 mt-5'>
                            <div className=" mt-2">
                              <h6 className="mb-0 Font_des">Country</h6>
                            </div>
                            <div className="text-secondary">
                              <select
                                className={`w-100 form-select bold-light ${formik.errors.country && formik.touched.country ? 'input-error' : ''}`}
                                name='country'
                                id='country'
                                disabled={!profileUpdate}
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">Country</option>
                                {data.map(country => (
                                  <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                                ))}
                              </select>
                              {formik.touched.country && formik.errors.country && (
                                <div className="text-danger small mt-1">
                                  <h6><span>*!</span>{formik.errors.password}</h6>
                                </div>
                              )}
                            </div>


                          </div>
                                            </div>
                               </div>



                             <div className='col-md-6'> 

                             <div className='ps-4 pe-4'>
                             <div className='col-md-12 mt-4'>
                            <div className=" mt-2">
                              <h6 className="mb-0 Font_des">Gender</h6>
                            </div>
                            <div className=" text-secondary ">
                              <div className='d-flex row justify-content-between mt-1 bg-light'>
                                <div className={`col-md-6 gender d-flex align-items-center rounded-1 bold-light ${formik.errors.gender && formik.touched.gender ? 'input-error' : ''}`}>
                                  <input
                                    disabled={!profileUpdate}
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
                                    disabled={!profileUpdate}
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
                             <div className='col-md-12 mt-5'>
                            <div className=" mt-2 ">
                              <h6 className="mb-0 Font_des">Date of Birth</h6>
                            </div>
                            <div className=" text-secondary ">
                              <div className='DateBirth d-flex justify-content-between bold '>
                                <div className='birth '>
                                  <select
                                    className={`form-select bold-light ${formik.errors.day && formik.touched.day ? 'input-error' : ''}`}
                                    name='day'
                                    id='day'
                                    value={formik.values.day}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={!profileUpdate}
                                  >
                                    <option value="">Day</option>
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
                                    disabled={!profileUpdate}
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
                                    disabled={!profileUpdate}
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









                          </div>
                             </div>
                      
                       
                          
                         



            

                         
                 




                              <div className='col-md-12 mt-5'>
                              {profileUpdate ? <>         {
                              !Update_setLoading ?
                                <div className={` d-flex justify-content-center`}>
                                  <button type='submit' className={` spinner btn  buton `}><i className=" fa-solid fa-spinner fa-spin "></i></button>

                                </div> :

                                <div className={`d-flex`}>

                                  <button type="submit" className={`buton btn `}>Save Changes</button>
                                </div>



                            }</> : ''}
                              </div>


                             </div>




                       

                          
                       
                        </div>

                       
                     




                      </form>
                    </div>



                  </div>



                  <div className='col-md-12 d-flex justify-content-center mt-5'>
                    <div className=' d-flex'>
                      <div className='m-3'>  <button className="btn buton   " onClick={() => { setProfileUpdate(true) }}> <img src={update_profile_btn} alt="" className='' /><span className='ms-1'>Update Profile</span></button></div>
                      <div className='m-3'> <button className="btn butonn bg-danger " onClick={() => { ResetPge() }}> <img src={change_password_btn} alt="" className='' /><span className='ms-1'>Reset Password</span></button></div>
                    </div>
                  </div>

                </div>
              </div>


            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ProfilePage;
