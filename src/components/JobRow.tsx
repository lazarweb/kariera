import { JobInfo } from "."
import { useAppDispatch } from "../redux/hooks"
import { setSelectedJob } from "../redux/reducers/jobsSlice"
import { JobType } from "../redux/redux_types"
type JobProps = {
	item: JobType
}

const JobRow = ({ item }: JobProps): JSX.Element => {
	const dispatch = useAppDispatch()
	const handleApply = () => {
		dispatch(setSelectedJob(item.id))
	}
	return (
		<article className="bg-card p-4 mb-3 flex flex-col">
			<JobInfo item={item} />
			<button
				className="py-[12px] px-[24px] text-[18px] bg-dg"
				onClick={handleApply}>
				Apply Now
			</button>
		</article>
	)
}

export default JobRow
