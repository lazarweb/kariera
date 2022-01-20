import { useEffect, useRef } from "react"
import {
	getJobs,
	selectJobs,
	selectPageInfo,
	selectSelectedJobId,
} from "../redux/reducers/jobsSlice"
import { JobType } from "../redux/redux_types"
import { selectUser } from "../redux/reducers/userSlice"
import { JobPopup, JobRow, Loader } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { JOBS_PER_PAGE } from "../redux/reducers/consts"
const JobBoard = (): JSX.Element => {
	const jobs = useAppSelector(selectJobs)
	const user = useAppSelector(selectUser)
	const pageInfo = useAppSelector(selectPageInfo)
	const selectedJobId = useAppSelector(selectSelectedJobId)
	const dispatch = useAppDispatch()
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: [0.8, 0.9, 1.0],
	}
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0.9 && user?.accessToken) {
				if (user) {
					dispatch(getJobs(user.accessToken))
				}
			}
		})
	}, options)
	useEffect(() => {
		if (user) {
			dispatch(getJobs(user.accessToken))
		}
		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current)
		}
	}, [])

	return (
		<div className="max-width mt-[315px] px-5">
			{selectedJobId !== null && <JobPopup />}
			{jobs !== null &&
				jobs.map((job: JobType, index: number) => (
					<JobRow item={job} key={index} />
				))}
			<div ref={loadMoreRef} className="mb-5">
				{pageInfo.page * JOBS_PER_PAGE === pageInfo.totalCount ? (
					<div
						className="flex justify-center gap-4 py-4 bg-[#ff9090] "
						onClick={() => {
							window.scrollTo(0, 0)
						}}>
						<p className="font-bold text-[18px]">Back to top</p>
					</div>
				) : (
					<div className="flex justify-center gap-4 py-4 bg-[#F2F2F2]">
						<Loader />
						<p className="font-bold text-[18px]">Loading more jobs</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default JobBoard
