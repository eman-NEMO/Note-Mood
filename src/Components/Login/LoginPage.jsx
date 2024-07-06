import React from "react";

import Form from "./Form";
import Image from "./Image";
import { Helmet } from "react-helmet";

import logo from '../../Assets/logo-ver2.png'




export default function Login() {

    // const pageTransition = {
    //     in: {
    //       opacity: 1,
    //       x: 0
    //     },
    //     out: {
    //       opacity: 0,
    //     //   y: "100%"
    //     }
    //   };
 
    return (
    //     <>
    //     <motion.div
    //   initial="out"
    //   animate="in"
    //   exit="out"
    //  // variants={pageVariants}
    //   variants={pageTransition} 
    //   transition={{ type: "tween", duration: 0.5 }}
    // >
    //         <div className="Login container ">
    //             <div className="row mt-5">
                  
    //                 <Form />
    //                 <Image />
    //                 <Footer/>
    //             </div>
    //         </div>
    //         </motion.div>
    //     </>
    <>
    <Helmet>
      <link rel="icon" href={logo} sizes="10x10" />
        <title >Login</title>
       
       
      </Helmet>
 <div className="Login container " id="Login_id">
            <div className="row mt-5">
                    <Form />
                    <Image />
            </div>
        </div>
    </>
    );
}

