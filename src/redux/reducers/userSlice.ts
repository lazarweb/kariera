import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { UserFormData, UserState, LoginResponse } from "../redux_types"

import { loginUser } from "./userAPI"

const initialState: UserState = {
	user: null,
	status: "idle",
}

export const login = createAsyncThunk(
	"user/login",
	async (formData: UserFormData, { rejectWithValue }) => {
		try {
			const response = await loginUser(formData)
			return response
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null
			localStorage.setItem("user", "")
		},
		setUserFromLocalStore: (state, action: PayloadAction<LoginResponse>) => {
			state.user = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = "loading"
			})
			.addCase(login.rejected, (state) => {
				state.status = "idle"
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<LoginResponse>) => {
					state.status = "idle"
					state.user = action.payload
				}
			)
	},
})

export const { logout, setUserFromLocalStore } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectisUserLoading = (state: RootState) =>
	state.user.status === "loading" ? true : false

export default userSlice.reducer
