import { Link } from "react-router-dom"
import { SearchBar, UserInfo } from "."
import { logout, selectUser } from "../redux/reducers/userSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectPageInfo } from "../redux/reducers/jobsSlice"
import { JOBS_PER_PAGE } from "../redux/reducers/consts"
const Navigation = (): JSX.Element => {
	const user = useAppSelector(selectUser)
	const pageInfo = useAppSelector(selectPageInfo)
	const dispatch = useAppDispatch()
	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<nav className="fixed top-0 left-0 flex flex-col justify-center items-center w-full ">
			<div className="w-full bg-dg">
				<div className="flex justify-between items-center px-5 max-width h-12  ">
					<Link to="/" className="text-[12px]">
						Kariera.gr
					</Link>
					{user?.email && (
						<button
							className="text-[color:var(--text-blue)] text-[12px]"
							onClick={handleLogout}>
							Logout
						</button>
					)}
				</div>
			</div>

			{user?.email && (
				<div className="bg-white w-full px-5 max-width">
					<UserInfo />
					<SearchBar />
					<h2 className="text-[20px] font-bold mb-5">
						Showing {pageInfo.page * JOBS_PER_PAGE} of {pageInfo.totalCount} job
						posts
					</h2>
				</div>
			)}
		</nav>
	)
}

export default Navigation
