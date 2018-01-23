import { handleActions } from 'redux-actions'
import products from './products.json'

const defaultState = { 
  user: {},
  loading: false,
  error: false,
  errorMsg: null,
  lastUpdate: null,
  lastScreenshot: null,
  log: 'Welcome to the experiment ...',
  current: 0,
  products,
  webcam: {}
}

const getProfile = (data) => {
    if (data && data.length > 0) {
        const item = data[0]

        return {
            name: item.person.name,
            age: item.face.faceAttributes.age,
            gender: item.face.faceAttributes.gender,
            emotions: item.face.faceAttributes.emotion
        }
    }
}

export const faceDetectionReducer = handleActions({
    WEBCAM_READY: (state, action) => {
        return { 
            ...state,
            webcam: action.payload
          }
    },
    WEBCAM_TAKE_SCREENSHOT: (state, action) => {
        const screenShot = state.webcam.getScreenshot()
        return { 
            ...state, 
            lastScreenshot: screenShot
          }
    },
    FACE_DETECTION: (state, action) => {
        return { 
            ...state, 
            loading: true,
            log: 'Detecting ...'
          }
    },
    FACE_DETECTION_DONE: (state, action) => {
        return { 
            ...state,
            loading: false,
            error: false,
            errorMsg: null,
            lastUpdate: new Date(),
            user: getProfile(action.payload),
            log: 'User detected!'
          }
    },
    FACE_DETECTION_FAILED: (state, action) => {
        return { 
            ...state, 
            loading: false,
            error: true,
            errorMsg: action.payload,
            log: 'An error occurred while processing the data.'
          }
    },
    CATALOG_GET_PRODUCTS: (state, action) => {
        const count = products.length
        let num = state.current+1
        if (num >= count) num = 0;
        return { 
            ...state, 
            products,
            count,
            current: num,
            log: 'Looking at new items...'
          }
    }
}, defaultState)