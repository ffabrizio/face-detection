import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { faceDetectionReducer } from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const configureStore = () => {
  const store = createStore(
    combineReducers({ app: faceDetectionReducer }),
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(sagas)
  return store
}
