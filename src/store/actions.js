import { createAction } from 'redux-actions'

export const webcamReady = createAction('WEBCAM_READY')
export const webcamTakeScreenshot = createAction('WEBCAM_TAKE_SCREENSHOT')

export const faceDetection = createAction('FACE_DETECTION')
export const faceDetectionDone = createAction('FACE_DETECTION_DONE')
export const faceDetectionFailed = createAction('FACE_DETECTION_FAILED')

export const catalogGetProducts = createAction('CATALOG_GET_PRODUCTS')