import React from 'react'

import { Provider } from 'react-redux'
import { configureStore } from './store'

import Carousel from './components/Carousel'
import VideoStream from './components/VideoStream'
import Log from './components/Log'

import './styles/app.css'

const store = configureStore()

export default () => 
<Provider store={store}>
  <div >
    
    <Carousel />

    <div className="controls">
      <VideoStream interval={10000} width={250} height={190} />
      <Log />
    </div>
  </div>

</Provider>