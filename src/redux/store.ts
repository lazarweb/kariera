import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "./reducers/userSlice"
import jobsReducer from "./reducers/jobsSlice"

export const store = configureStore({
	reducer: {
		user: userReducer,
		jobs: jobsReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
