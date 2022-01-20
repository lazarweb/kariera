import React, { useState } from "react"

const SearchBar = (): JSX.Element => {
	const [search, setsearch] = useState("")
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.currentTarget
		setsearch(value)
	}
	return (
		<div className="mb-5">
			<form>
				<label htmlFor="search">Search for a job</label>
				<input
					className="flex flex-col input mt-2.5"
					type="text"
					value={search}
					placeholder="Enter keyword"
					onChange={(e) => handleInputChange(e)}
				/>
			</form>
		</div>
	)
}

export default SearchBar
