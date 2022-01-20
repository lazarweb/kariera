import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { getJobsApi } from "./jobsAPI"
import { JobsState, GetJobsResponse } from "../redux_types"
export const getJobs = createAsyncThunk(
	"jobs/get_jobs",
	async (token: string, { getState, dispatch }) => {
		const jobState = getState() as { jobs: JobsState }
		const data = { token, page: jobState.jobs.page }
		const response = await getJobsApi(data, dispatch)
		return response
	}
)

const initialState: JobsState = {
	jobs: null,
	status: "idle",
	totalCount: 0,
	totalPages: 0,
	page: 0,
	selectedJobId: null,
}

export const jobsSlice = createSlice({
	name: "jobs",
	initialState,
	reducers: {
		setSelectedJob: (state, action: PayloadAction<number | null>) => {
			state.selectedJobId = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getJobs.pending, (state) => {
				state.status = "loading"
			})
			.addCase(getJobs.rejected, (state) => {
				state.jobs = null
				state.status = "idle"
			})
			.addCase(
				getJobs.fulfilled,
				(state, action: PayloadAction<GetJobsResponse>) => {
					state.status = "idle"
					if (action.payload.jobs?.length > 0) {
						state.jobs = state.jobs
							? [...state.jobs, ...action.payload.jobs]
							: [...action.payload.jobs]
						state.page = state.page + 1
					}
					state.totalCount = action.payload.totalCount
					state.totalPages = action.payload.totalPages
				}
			)
	},
})
export const { setSelectedJob } = jobsSlice.actions

export const selectJobs = (state: RootState) => state.jobs.jobs
export const selectPage = (state: RootState) => state.jobs.page
export const selectSelectedJobId = (state: RootState) =>
	state.jobs.selectedJobId
export const selectPageInfo = (state: RootState) => ({
	page: state.jobs.page,
	totalCount: state.jobs.totalCount,
	totalPages: state.jobs.totalPages,
})

export default jobsSlice.reducer
