import axios from "axios"
import { LoginResponse, UserFormData } from "../redux_types"

export function loginUser(formData: UserFormData) {
	return new Promise<LoginResponse>(async (resolve, reject) => {
		const params = new URLSearchParams()
		params.append("email", formData.email)
		params.append("password", formData.password)
		axios
			.post("https://ka-fe-assignment.azurewebsites.net/api/login", params, {
				headers: {
					"content-type": "application/x-www-form-urlencoded",
				},
			})
			.then((response) => {
				const data = { ...response.data.user, ...response.data.token }
				localStorage.setItem("user", JSON.stringify(data))
				resolve(data)
			})
			.catch((error) => {
				reject(error.response.status)
			})
	})
}
