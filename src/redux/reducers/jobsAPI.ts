import axios from "axios"
import { JOBS_PER_PAGE } from "./consts"
import { logout } from "./userSlice"
import { GetJobsResponse } from "../redux_types"
export function getJobsApi(
	data: { token: string; page: number },
	dispatch: Function
) {
	return new Promise<GetJobsResponse>(async (resolve, reject) => {
		axios
			.get("https://ka-fe-assignment.azurewebsites.net/api/job-posts", {
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
				params: {
					page: data.page + 1,
					sizePerPage: JOBS_PER_PAGE,
				},
			})
			.then((response) => {
				resolve({
					jobs: [...response.data.items],
					totalCount: response.data.totalCount,
					totalPages: response.data.totalPages,
				})
			})
			.catch((error) => {
				dispatch(logout())
				reject()
			})
	})
}

export async function getJobsWithId(data: { id: number; token: string }) {
	return axios
		.get(
			`https://ka-fe-assignment.azurewebsites.net/api/job-posts/${data.id}`,
			{
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			}
		)
		.then((response) => {
			return { item: response.data }
		})
		.catch((error) => {
			return error.response.status
		})
}
export async function applyToJob(data: {
	id: number
	token: string
	yearsOfXp: string
}) {
	return axios
		.get(`https://ka-fe-assignment.azurewebsites.net/api/job-posts/apply`, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
			params: {
				id: data.id,
				yearsOfExperience: data.yearsOfXp,
			},
		})
		.then((response) => {
			return response.status
		})
		.catch((error) => {
			return error.response.status
		})
}
