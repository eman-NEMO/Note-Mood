import React from 'react';
import './SideBar.scss';
import journal from '../../Assets/jouranl.svg'
import logo from '../../Assets/logo-ver2.png'
import help from '../../Assets/help.svg'
import setting from '../../Assets/profile1.svg'
import chart from '../../Assets/chart.svg'
import topics from '../../Assets/topics.svg'
import topics_colored from '../../Assets/toics_colored.svg'
import report from '../../Assets/report_small.svg'
import journal_color from '../../Assets/simple-icons_livejournal.svg'
import logo_color from '../../Assets/logo-ver2.png'
import help_color from '../../Assets/help_icon.svg'
import setting_color from '../../Assets/profile_colored.svg'
import chart_color from '../../Assets/chart_icon.svg'
import report_color from '../../Assets/report icon.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo_desc from '../../Assets/logo-describtin.png'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useCloseJournals} from '../../Context/JournalCloseContext'
import { NavLink } from 'react-router-dom';
import { Collapse } from 'react-pro-sidebar';
import { render } from '@testing-library/react';
import log_out from '../../Assets/log-out.svg'
import log_out_colored from '../../Assets/logout_colored.svg'
import { UserContext } from '../../Context/UserContext.js'
import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useJournals } from '../../Context/JournalContext.js';
import { CircularProgress } from '@mui/material'; // Example using MUI
export default function SideNav() {
    const { journals, setJournals ,zIndex,setZIndex} = useJournals();
    const [collapsed, setCollapsed] = useState(true);
    const  {clos ,setClose}=useCloseJournals()
    let navigate=useNavigate()
    let {setUserToken}=useContext(UserContext)
    const [logoutLoading, setLogoutLoading] = useState(false);
    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };
    const menuItems = [
        { path: "/journal", icon: journal, iconActive: journal_color, text: "Journal" },
        { path: "/chart", icon: chart, iconActive: chart_color, text: "Chart" },
        { path: "/report", icon: report, iconActive: report_color, text: "Report" },
        { path: "/topics", icon: topics, iconActive: topics_colored, text: "Help" },
        { path: "/help", icon: help, iconActive: help_color, text: "Help" },
     
        { path: "/settings", icon: setting, iconActive: setting_color, text: "Profile" },
       
    ];
    const menuLogout=[
      
        {  icon: log_out, iconActive: log_out_colored, text: "Log Out" },
      
    ]
    // function logOut(){
    //   localStorage.removeItem('userToken')
    //       setUserToken(null)
    //   // localStorage.setItem('userId',null)
    //     navigate('/')
    // }
    function logOut() {
      setZIndex(true)
      setLogoutLoading(true); // Start loading

      // Simulate a logout delay, e.g., API call to backend
      setTimeout(() => {
          localStorage.removeItem('userToken'); // Clear user token
          setUserToken(null); // Update context or global state
          navigate('/'); // Redirect to homepage or login page
          setLogoutLoading(false);
          setZIndex(false)
      }, 1000); // Delay for demonstration, adjust as needed
  }
  

    return( <>
   <div className='Side_Nav_ID over'>
   {clos? <Sidebar
            className={`custom-sidebar custom-menu ${collapsed ? 'collapsed' : 'expanded'}`}
            collapsed={collapsed} 
        >   
            {!collapsed? <i className="fa-solid fa-xmark fa-2xl collapse-button open-close " onClick={handleCollapseToggle}></i>: <i class="fa-solid fa-bars collapse-button fa-2xl open-close"  onClick={handleCollapseToggle} ></i>}   
            <Menu iconShape="square" >
            <MenuItem  className='mt-5'>
                    <img src={logo} alt="Menu Icon" className="menu-icon logo" />
                    <img src={logo_desc} alt="Menu Icon" className="logo" />
                </MenuItem>
           
                            {menuItems.map((item, index) => (
  <MenuItem key={index} className='menu-item mt-3 ms-1 '>
    <NavLink
      to={item.path}
      className={({ isActive }) => isActive ? 'menu-item-text-active ms-2' : 'menu-item-text ms-2'}
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? item.iconActive : item.icon}
            alt="Icon"
            className="menu-icon"
          />
          {item.text}
        </>
      )}
    </NavLink>
  </MenuItem>
))}
            </Menu>
        </Sidebar>: <Sidebar
            className={`custom-sidebar custom-menu  ${collapsed ? 'collapsed' : 'expanded'}`}
            collapsed={collapsed} 
        >   
            {!collapsed? <i className="fa-solid fa-xmark fa-2xl collapse-button open-close " onClick={handleCollapseToggle}></i>: <i class="fa-solid fa-bars collapse-button fa-2xl open-close"  onClick={handleCollapseToggle} ></i>}   
            <Menu iconShape="square" >
            <MenuItem  className='mt-5'>
                    <img src={logo} alt="Menu Icon" className="menu-icon logo" />
                    <img src={logo_desc} alt="Menu Icon" className="menu-icon logo" />
                </MenuItem>
          
                            {menuItems.map((item, index) => (
  <MenuItem key={index} className='menu-item mt-3 ms-1'>
    <NavLink
      to={item.path}
      className={({ isActive }) => isActive ? 'menu-item-text-active ms-2' : 'menu-item-text ms-2'}
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? item.iconActive : item.icon}
            alt="Icon"
            className="menu-icon"
          />
          {item.text}
        </>
      )}
    </NavLink>
  </MenuItem>
))}

<MenuItem className='menu-item mt-3 ms-2' onClick={logOut}>
                    {logoutLoading ? (
                        <div className='d-flex align-items-center full-screen-overlay'>
                            <CircularProgress size={50} color='success' /> {/* MUI Circular Progress */}
                            <span className="ms-2 text-white log_out_text">Logging out...</span>
                        </div>
                    ) : (
                        <>
                            <img src={log_out} alt="Log Out Icon" className="menu-icon" />
                            {menuLogout[0].text}
                        </>
                    )}
                </MenuItem>


            </Menu>
            
        </Sidebar>}
   </div>
       
        </>
    )


}


