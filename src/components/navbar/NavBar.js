import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<div>
			<h1>NavBar</h1>
			<Link to="/login">Login</Link>
		</div>
	);
}

export default NavBar;
