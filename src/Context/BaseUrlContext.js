import React, { createContext, useState, useContext,useEffect } from 'react';
import axios from 'axios';
const BaseUrl = createContext();

export function useBaseUrl() {
    return useContext(BaseUrl);
}

export const BaseUrlProvider = ({ children }) => {
      const [base,setBase]=useState('https://localhost:7234')
      const [ChartPageData,setChartPageData]=useState([])
      const [TopicsPageData,setTopicsPageData]=useState([])
      const [ReportPageData,setReportPageData]=useState([])
      const [closeTimePop,setTimePop]=useState(false)
      const [closeTimePopReport,setTimePopReport]=useState(false)
    const [  closeTimePopTopics,setTimePopTopics]=useState(false)
      const [LineChartData,setLineChartData]=useState([])
     const [journalDate ,setJournalDate]=useState(null)
     const [journalTime ,setJournalTime]=useState(null)

    return (
        <BaseUrl.Provider value={{closeTimePopTopics,setTimePopTopics,TopicsPageData,setTopicsPageData,journalDate ,setJournalDate,journalTime ,setJournalTime,closeTimePopReport,setTimePopReport,ReportPageData,setReportPageData,LineChartData,setLineChartData, base,setBase,ChartPageData,setChartPageData,closeTimePop,setTimePop}}>
            {children}
        </BaseUrl.Provider>
    );
};
