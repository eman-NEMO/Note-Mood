import ReactDOM from 'react-dom/client';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {ReactQueryDevtools} from "react-query/devtools"
import { QueryClient, QueryClientProvider } from 'react-query';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.min.css"
// import font awesome 
//import '@fortawesome/fontawesome-free/css/all.min.css';
import  {JournalProvider}  from './Context/JournalContext';
import UserContextProvider from './Context/UserContext';
import {JournalCloseContextProvider }from './Context/JournalCloseContext.js'
import { JournalCloseUpdateProvider } from './Context/JournalCloseUpdate.js';

import {IdContextProvider} from './Context/IdContext.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient=new QueryClient()
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}> 
       
  <JournalProvider>
  <JournalCloseUpdateProvider>
    <IdContextProvider>
    <JournalCloseContextProvider>
 
   <UserContextProvider>
       <App />
   </UserContextProvider>
   
   </JournalCloseContextProvider>
   </IdContextProvider>
   </JournalCloseUpdateProvider>
  </JournalProvider>
  <ReactQueryDevtools  position='bottom-right'/>
   
  
  </QueryClientProvider>
 
);








// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
