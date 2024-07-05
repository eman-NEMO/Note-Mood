import { useState,useContext ,useEffect} from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { UserContext } from '../../Context/UserContext.js'
import {  useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {useBaseUrl} from '../../Context/BaseUrlContext'
const useData = () => {
  const [data, setData] = useState([]);
  const [Days, setDays] = useState([]);
  const [mon, setMon] = useState([]);
  const [year, setYear] = useState([]);

  // const {base ,setBase}=useBaseUrl()

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  function getMonthsOfYear() {
    const months = [];
    const date = new Date();
    for (let month = 0; month < 12; month++) {
      date.setMonth(month);
      const monthName = date.toLocaleDateString(undefined, { month: "long" });
      months.push(monthName);
    }
    return months;
  }

  const monthsOfYear = getMonthsOfYear();

  function getAllYears(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }

  // Example usage:
  const startYear = 1900; // Change as needed
  const endYear = new Date().getFullYear(); // Get the current year
  const allYears = getAllYears(startYear, endYear);

  useEffect(() => {
    const getcont = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const con = await res.json();
      setData(con);
    };
    getcont();
    setDays(daysOfMonth);
    setMon(monthsOfYear);
    setYear(allYears);
  }, []);

  return { data, Days, mon, year };
};
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?`~]).{8,}$/;
const useSignUpForm = () => {
  let {setUserToken}=useContext(UserContext)
  const [isloading,setIsloading]=useState(false)
  const [err,setError]=useState(null)
  let navigate=useNavigate();
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters,1 upper,1 lower,1 digit,1 special char"
      )
      .required("Password is required"),
     country: Yup.string().required("Country is required"),
     day: Yup.number().required("Day required"),
     month: Yup.string().required("Month required"),
     year: Yup.number().required("Year required"),
     gender: Yup.string().required("Gender is required"),
  });


async function  Submit(vales){
  // const {base ,setBase}=useBaseUrl()
  console.log(vales)
  // vales.month=2;
    setIsloading(true)
     let{data}= await  axios.post(`https://notemoodapibackend.azurewebsites.net/api/Auth/register`,vales).catch((error)=>{
      console.log(error.response)
      Swal.fire({
        title: 'Error!',
        text: error.response.data || 'Something went wrong!', // Customize based on your API response
        icon: 'error',
        confirmButtonText: 'Try Again'
        
    });
    // setError(error.response.data);
   
   
    // console.log(error.response.data)
    // setError(error.response.data)
     setIsloading(false)
       }
       )
       console.log(data)
       if (data.message === 'Registration successful') {
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
                setTimeout(() => navigate('/'), 500); // Navigate after a short delay
            }
        });
    }
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      country:"",
      gender:"",
      day:null,
      month:"",
      year:null,
      email: "",
      password: "",

      // Add initial values for other fields...
    },
   
     validationSchema: validationSchema,
     onSubmit:Submit
  });







  return { formik ,isloading};
};

export { useData, useSignUpForm };
