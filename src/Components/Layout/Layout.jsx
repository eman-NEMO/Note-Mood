import React from 'react'
import SideNav from '../SideNav/SideNav'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

export default function Layout() {
  return (
  
  <>
    <Header/>
    <Outlet></Outlet>
    <Footer/>
 
 
 </>
  )
}
