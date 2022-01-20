const Loader = (): JSX.Element => {
	return (
		<div className="loader">
			<span style={{ animationDelay: "0.1s" }}></span>
			<span style={{ animationDelay: "0.2s" }}></span>
			<span style={{ animationDelay: "0.1s" }}></span>
		</div>
	)
}

export default Loader
