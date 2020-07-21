import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import mySaga from '../sagas'

import reducer from './index'

export default () => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(reducer, applyMiddleware(sagaMiddleware))

  // persistor
  const persistor = persistStore(store)

  // run the saga
  sagaMiddleware.run(mySaga)

  return { store, persistor }
}
