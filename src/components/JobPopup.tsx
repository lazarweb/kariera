import React, { ChangeEvent, useEffect, useState } from "react"
import { JobInfo } from "."
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { applyToJob, getJobsWithId } from "../redux/reducers/jobsAPI"
import {
	selectSelectedJobId,
	setSelectedJob,
} from "../redux/reducers/jobsSlice"
import { JobType } from "../redux/redux_types"
import { logout, selectUser } from "../redux/reducers/userSlice"

interface ErrorMessage {
	message: string
	status: string
}

const JobPopup = (): JSX.Element => {
	const selectedJobId = useAppSelector(selectSelectedJobId)
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const [item, setItem] = useState<JobType | null>(null)
	const [isLoading, setisLoading] = useState<boolean>(false)
	const [response, setresponse] = useState<ErrorMessage>({
		message: "",
		status: "",
	})
	const [yearsOfXp, setyearsOfXp] = useState<string>("")
	const [refer, setrefer] = useState<string>("")
	const loadJob = async () => {
		if (user && selectedJobId !== null) {
			try {
				const formData = { id: selectedJobId, token: user.accessToken }
				const res = await getJobsWithId(formData)
				if (res.item) {
					setItem(res.item)
				} else if (res === 404) {
					setresponse({ message: "Job post does not exist", status: "fail" })
				} else if (res === 401) {
					dispatch(logout())
					dispatch(setSelectedJob(null))
				}
			} catch (error) {
				setresponse({
					message: "Unknown error, try again later",
					status: "fail",
				})
			}
		}
	}
	const handeYearsOfXpChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numb = parseInt(e.target.value)
		if (numb <= 70 && numb >= 0) {
			setyearsOfXp(e.target.value)
		} else setyearsOfXp("")
	}
	const handleApplication = async () => {
		setisLoading(true)
		if (user && selectedJobId !== null) {
			try {
				const data = {
					id: selectedJobId,
					token: user.accessToken,
					yearsOfXp: yearsOfXp,
				}
				const res = await applyToJob(data)
				if (res === 200) {
					setresponse({ message: `Application successfull`, status: "ok" })
				} else if (res === 422) {
					setresponse({ message: "Invalid values", status: "fail" })
				} else if (res === 401) {
					setresponse({
						message: "Only authenticated users can access the data",
						status: "auth",
					})
				} else if (res === 404) {
					setresponse({ message: "Job post does not exist", status: "fail" })
				} else if (res === 409) {
					setresponse({ message: "Job post not valid now", status: "fail" })
				} else {
					setresponse({
						message: "Unknown error, try again later",
						status: "fail",
					})
				}
			} catch (error) {
				setresponse({
					message: "Unknown error, try again later",
					status: "fail",
				})
			}
		}
		setisLoading(false)
	}

	const renderResponseElement = (): JSX.Element => {
		return (
			<div className="bg-white h-[94vh] mt-[3vh] w-full flex justify-center flex-col p-5">
				{response.status === "ok" ? (
					<p className="w-full text-[120px] text-center text-green-500">
						&#10004;
					</p>
				) : (
					<p className="w-full text-[120px] text-center text-red-500 ">
						&#x2718;
					</p>
				)}

				<h3
					className={`mb-2 text-center text-[18px] ${
						response.status !== "ok" && "text-red-500"
					}`}>
					{response.message}
				</h3>
				<h4 className="mb-10 text-center font-bold text-[18px]">
					{item?.title}
				</h4>
				<button
					onClick={() => dispatch(setSelectedJob(null))}
					className="py-[12px] px-[24px] text-[18px] text-center bg-dg">
					Back to job list
				</button>
			</div>
		)
	}
	const renderJobElement = (): JSX.Element => {
		return (
			<div className="bg-white h-full p-5 relative">
				<div className="flex justify-between items-center mb-5">
					<h4 className="test-[18px]">Apply for the job</h4>
					<button onClick={() => dispatch(setSelectedJob(null))}>X</button>
				</div>
				{item?.description && (
					<>
						<JobInfo item={item} />
						<div className="overflow-auto h-[60vh] mt-5">
							<div dangerouslySetInnerHTML={{ __html: item.description }}></div>
							<label htmlFor="yearsOfXp">How many years of experience?</label>
							<input
								className="border-solid border-2 border-black my-2 mb-6 input"
								type="number"
								name="yearsOfXp"
								placeholder="Enter a number"
								value={yearsOfXp}
								min="0"
								max="70"
								step="1"
								onChange={(e) => {
									handeYearsOfXpChange(e)
								}}
							/>
							<label htmlFor="refer">Can someone refer you?</label>
							<input
								className="border-solid border-2 border-black my-2 mb-6 input"
								type="email"
								name="refer"
								placeholder="Enter his/her email"
								value={refer}
								onChange={(e) => {
									setrefer(e.target.value)
								}}
							/>
						</div>
					</>
				)}
				<button
					className="absolute py-[12px] px-[24px] bottom-0 left-0 w-full text-[18px] bg-dg"
					onClick={handleApplication}
					disabled={isLoading}>
					{isLoading === true ? "Applying" : "Send Application"}
				</button>
			</div>
		)
	}

	useEffect(() => {
		loadJob()
	}, [selectedJobId])

	useEffect(() => {
		let t: ReturnType<typeof setTimeout>
		if (response?.status === "auth") {
			t = setTimeout(() => {
				dispatch(logout())
			}, 3000)
		}
		return () => {
			clearTimeout(t)
		}
	}, [response])
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-slate-800/50 backdrop-blur-sm px-5">
			{response.message ? renderResponseElement() : renderJobElement()}
		</div>
	)
}

export default JobPopup
