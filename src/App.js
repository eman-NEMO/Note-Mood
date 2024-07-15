import React from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Footer from "./Components/Footer/Footer";
import SideNav from "./Components/SideNav/SideNav";
import LoginPage from "./Components/Login/LoginPage";
import Header from "./Components/Header/Header";
import RegisterPage from "./Components/Register/RegisterPage";
import Home from "./Components/Journal/JournalPage";
import JournalPage from "./Components/Journal/JournalPage";

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChartPage from "./Components/Chart/ChartPage";
import LayoutSide from "./Components/Layout/LayoutSide";
import Report from "./Components/Report/Report";
import Help from "./Components/Help/Help";
import Settings from "./Components/Setting/Settings";
import ForgetPassword from "./Components/ForgetPassword.jsx/ForgetPassword.jsx";
import JournalDetails from './Components/JournalDetails/JournalDetails'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import ChangePassword from "./Components/ChangePassword/ChangePassword.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import Search from "./Components/Search/Search.jsx";
import Topics from "./Components/Topics/Topics.jsx";

function App() {

  let router=createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
      {index:true,element:<LoginPage/>},
      {path:'register',element:<RegisterPage/>},
    ]},
    {element:<LayoutSide/>,children:[
      {path:'journal',element:<ProtectedRoute><JournalPage/></ProtectedRoute>},
      {path:'chart',element:<ProtectedRoute><ChartPage/></ProtectedRoute>},
      {path:'report',element:<ProtectedRoute><Report/></ProtectedRoute>},
      {path:'help',element:<ProtectedRoute><Help/></ProtectedRoute>},
      {path:'topics',element:<ProtectedRoute><Topics/></ProtectedRoute>},
      {path:'JournalDetails/:id',element:<ProtectedRoute><JournalDetails/></ProtectedRoute>},
      {path:'settings',element:<ProtectedRoute><Settings/></ProtectedRoute>},
     
    ]},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'search',element:<ProtectedRoute><Search/></ProtectedRoute>},
    {path:'changePassword',element:<ProtectedRoute><ChangePassword/></ProtectedRoute>},
    {path:'api/Auth/ResetPassword',element:<ResetPassword/>},
   
    
  ])


  return (
    <>
     
      {/* <LoginPage /> */}
      {/* <RegisterPage/> */}
     {/* < SideNav/> */}
     {/* <JournalPage/> */}
     
     <RouterProvider router={router}></RouterProvider>
     {/* <PopUp/> */}
     {/* <Home/> */}
      {/* <Footer/> */}
    </>
  );
}

export default App;
