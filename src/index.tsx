import React from 'react'
import ReactDOM from 'react-dom'
import Popup from './Popup'
import Options from './Options'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import './style.css'

if (process.env.REACT_APP_TARGET === 'popup') {
  ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <Popup />
      </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root') || document.createElement('div')
  )
}

if (process.env.REACT_APP_TARGET === 'options') {
  ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <Options />
      </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root') || document.createElement('div')
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
