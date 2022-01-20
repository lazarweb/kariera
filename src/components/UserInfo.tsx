import { useAppSelector } from "../redux/hooks"
import { selectUser } from "../redux/reducers/userSlice"
const UserInfo = (): JSX.Element => {
	const user = useAppSelector(selectUser)
	return (
		<div className="py-5">
			<p className="text-[15px]">Hello</p>
			<p className="text-[20px] mb-5">{user?.email}</p>
			<hr className="bg-black" />
		</div>
	)
}

export default UserInfo
