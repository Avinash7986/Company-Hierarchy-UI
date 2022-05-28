import { configureStore } from '@reduxjs/toolkit'
import { companyHierarchyReducer } from '../features/companyHierarchy/companyHierarchySlice'

export const store = configureStore({
  reducer: {
    companyHierarchy: companyHierarchyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
