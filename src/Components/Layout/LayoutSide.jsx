import React from 'react'
import SideNav from '../SideNav/SideNav'
import { Outlet } from 'react-router-dom'
import './Layout.scss'
import { useJournals } from '../../Context/JournalContext'
import { useCloseJournals } from '../../Context/JournalCloseContext'
import { useCloseJournalsUpdate } from '../../Context/JournalCloseUpdate'
import { useBaseUrl } from '../../Context/BaseUrlContext'
export default function LayoutSide() {
  const { clos, setClose } = useCloseJournals()
  const { journals, setJournals ,zIndex,setZIndex} = useJournals();
  const { closUpdate, setCloseUpdate } = useCloseJournalsUpdate()
  const {closeTimePop,setTimePop}=useBaseUrl()
  const {closeTimePopReport,setTimePopReport}=useBaseUrl()
  const {closeTimePopTopics,setTimePopTopics}=useBaseUrl()
  return (
   <>
    <div className={`d-flexx ${zIndex?'z-0':''}`}>
    <div className={`side-nav ${clos ||closUpdate||closeTimePop||closeTimePopReport||closeTimePopTopics ?'z-0':''}`}>
        <SideNav />
    </div>
    <div className={`outlet-container ${clos||closUpdate||closeTimePop||closeTimePopReport||closeTimePopTopics ? 'z-0':''}`}>
    <Outlet />
    </div>
</div>

   </>
  )
}

