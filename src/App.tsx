import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Navigation } from "./components"
import { JobBoard, Login } from "./pages"
import { selectUser, setUserFromLocalStore } from "./redux/reducers/userSlice"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
const App = (): JSX.Element => {
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const userLocalStorage = localStorage.getItem("user")
	if (!user && userLocalStorage) {
		dispatch(setUserFromLocalStore(JSON.parse(userLocalStorage)))
	}

	return (
		<div className="App">
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route
						path="/job-board"
						element={user ? <JobBoard /> : <Navigate to="/" />}
					/>
					<Route
						path="/"
						element={!user ? <Login /> : <Navigate to="/job-board" />}
					/>
					<Route
						path="*"
						element={!user ? <Login /> : <Navigate to="/job-board" />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
