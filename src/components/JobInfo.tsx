import { JobType } from "../redux/redux_types"
type JobProps = {
	item: JobType
}

const JobInfo = ({ item }: JobProps): JSX.Element => {
	const convertTimestampToDate = (timestamp: number): string => {
		const date = new Date(timestamp)
		const str = date.toLocaleString("default", {
			day: "2-digit",
			month: "short",
		})
		return str
	}
	return (
		<div className="bg-card p-5">
			<div className="flex mb-4 ">
				<img src="w-[83px]" alt="Company Logo" />
				<div className="ml-3">
					<p className="text-[#848484] text-[12px]">{item.companyName}</p>
					<h4 className="text-[18px] font-bold">{item.title}</h4>
				</div>
			</div>
			<div className="flex justify-start gap-5 mb-4">
				<div>
					<p className="text-[12px]">Date Posted</p>{" "}
					<p className="text-[12px] font-bold">
						{convertTimestampToDate(item.createdAt)}
					</p>
				</div>
				<div>
					<p className="text-[12px]">Apply Until</p>{" "}
					<p className="text-[12px] font-bold">
						{convertTimestampToDate(item.validUntil)}
					</p>
				</div>
				<div>
					<p className="text-[12px]">Location</p>{" "}
					<p className="text-[12px] font-bold">{item.address}</p>
				</div>
			</div>
		</div>
	)
}

export default JobInfo
