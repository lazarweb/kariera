import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
	login,
	selectisUserLoading,
	selectUser,
} from "../redux/reducers/userSlice"
import { UserFormData } from "../redux/redux_types"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
const Login = (): JSX.Element => {
	const user = useAppSelector(selectUser)
	const isLoading = useAppSelector(selectisUserLoading)
	const navigate = useNavigate()
	const [error, setError] = useState<string | null>(null)
	const dispatch = useAppDispatch()
	const [formData, setformData] = useState<UserFormData>({
		email: "",
		password: "",
	})
	const handleSubmitForm = (e: React.SyntheticEvent) => {
		e.preventDefault()
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.currentTarget
		setformData((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}
	const handleLogin = async () => {
		try {
			await dispatch(login({ ...formData })).unwrap()
		} catch (error) {
			if (error === 422) {
				setError("Invalid values")
			} else if (error === 401) {
				setError("Incorrect email or password")
			} else {
				setError("Unknown error, try again later")
			}
		}
	}

	useEffect(() => {
		if (user) {
			navigate("/job-board", { replace: false })
		}
	}, [user])
	useEffect(() => {
		let t: ReturnType<typeof setTimeout>
		if (error)
			t = setTimeout(() => {
				setError(null)
			}, 5000)
		return () => {
			clearTimeout(t)
		}
	}, [error])

	return (
		<div className="mt-12 pt-12 px-5 max-width">
			<form
				onSubmit={handleSubmitForm}
				className="flex flex-col max-w-[300px] mx-auto">
				<label htmlFor="email">Enter your email</label>
				<input
					className="border-solid border-2 border-black my-2 mb-6 input"
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={(e) => handleInputChange(e)}
				/>
				<label htmlFor="password" className="label">
					Enter your password
				</label>
				<input
					className="border-solid border-2 border-black my-2 mb-8 input"
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={(e) => handleInputChange(e)}
				/>
				<button
					type="submit"
					className={`py-[12px] px-[24px] self-center bg-dg ${
						formData.email !== "" && formData.password !== ""
							? "opacity-100"
							: "opacity-40"
					}`}
					disabled={
						formData.email !== "" && formData.password !== "" ? false : true
					}
					onClick={handleLogin}>
					{isLoading ? "Checking..." : "Login"}
				</button>
				{error && <h1 className="text-red-500 text-center mt-8 ">{error}</h1>}
			</form>
			john.doe@kariera.gr <br /> Kar1era!
		</div>
	)
}

export default Login
