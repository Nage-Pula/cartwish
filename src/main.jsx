import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/* <!-- Gainsight PX Tag--> */
  
  (function(n,t,a,e,co){
    var i="aptrinsic";
    n[i]=n[i]||function(){
      (n[i].q=n[i].q||[]).push(arguments)},
      n[i].p=e;n[i].c=co;
    var r=t.createElement("script");
    r.async=!0,r.src=a+"?a="+e;
    var c=t.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(r,c)
  })
  (window,document,"https://web-sdk.aptrinsic.com/api/aptrinsic.js","AP-WLHVOASMAZVB-2-4"),({iframeModeEnabled: true});

/*!-- Gainsight PX Tag--*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>,
)
  
