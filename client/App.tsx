import React from 'react'
import Main from './components/Main'
import Map from './components/Map'
import Weather from './components/Weather'
import './style/style.css'

function App() {
  return(
    <div id="all">
      <div id="top">
        <Main />
      </div>
      
      <div id="bottom">
        <Weather />
        <Map />
      </div>
    </div>
  )
}

export default App