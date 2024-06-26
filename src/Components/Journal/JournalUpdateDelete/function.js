import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const useData = () => {
    const [popUp, setPopUp] = useState(false);

    // const setpopup = (newPopUp) => {
    //     setPopUp(newPopUp);
          console.log(popUp,'jssss')
    // };
    return { popUp, setPopUp };
};

export default  useData ;