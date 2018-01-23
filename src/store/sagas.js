import { takeLatest, call, put, fork, select } from 'redux-saga/effects'
import { getLatestScreenshot } from './selectors'
import { faceDetectionDone, faceDetectionFailed } from './actions'

const FACEAPI = 'http://localhost:61154/api/face/detect'

function* onFaceDetection() {
  yield takeLatest('FACE_DETECTION', handlePost)
}

function* handlePost() {
  const payload = yield select(getLatestScreenshot)
  const { result, error } = yield call(postData, FACEAPI, {
      method: 'POST',
      cache: 'default',
      headers: new Headers([['Content-Type', 'application/json']]),
      body: '"' + payload + '"'
  })
  if (error) {
    yield put(faceDetectionFailed(error))
  }
  
  yield put(faceDetectionDone(result))
}

const postData = (url, options) => {
  const postRequest = new Request(url, options)

  return fetch(postRequest)
    .then(response => response.json())
    .then(result => ({ result }))
    .catch(error => ({ error }))
}


export default function* root() {
  yield fork(onFaceDetection)
}