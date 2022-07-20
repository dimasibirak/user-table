import { configureStore } from '@reduxjs/toolkit'

import { applicationReducer } from './application/reducer'
import userSlice from './users/slice';

export const createStore = () => configureStore({
  reducer: {
    application: applicationReducer,
    users: userSlice,
  }
})
