export interface JobType {
	id: number
	companyName: string
	address: string
	createdAt: number
	validUntil: number
	title: string
	description?: string
}

export interface JobsState {
	jobs: JobType[] | null
	status: string
	totalCount: number
	totalPages: number
	page: number
	selectedJobId: number | null
}
export interface GetJobsResponse {
	jobs: JobType[]
	totalCount: number
	totalPages: number
}

export interface UserState {
	user: {
		id: number
		email: string
		firstName: string
		lastName: string
		tokenType: string
		accessToken: string
		expiresIn: string
	} | null
	status: string
}
export interface LoginResponse {
	tokenType: string
	accessToken: string
	expiresIn: string
	id: number
	email: string
	firstName: string
	lastName: string
}
export interface UserFormData {
	email: string
	password: string
}
