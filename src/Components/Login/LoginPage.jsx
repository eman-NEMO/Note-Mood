import React from "react";

import Form from "./Form";
import Image from "./Image";





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
 <div className="Login container " id="Login_id">
            <div className="row mt-5">
                    <Form />
                    <Image />
            </div>
        </div>
    </>
    );
}

