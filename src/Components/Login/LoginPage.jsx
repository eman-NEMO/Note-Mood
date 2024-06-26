import React from "react";

import Form from "./Form";
import Image from "./Image";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { motion } from 'framer-motion';




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
    const variantsLeft = {
      hidden: { x: -300, opacity: 0 },
      visible: { x: 0, opacity: 1 }
  };

  const variantsRight = {
      hidden: { x: 1000, opacity: 0 },
      visible: { x: 0, opacity: 1 }
  };
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
 <div className="Login container " id="Login_id">
            <div className="row mt-5">
                    <Form />
                    <Image />
            </div>
        </div>
    </>
    );
}

