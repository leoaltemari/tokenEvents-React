import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

import Links from "./Links";
import DropDown from "./DropDown";

function NavBar() {
	let [dropDown, setDropDown] = useState(false);

	const dropDownMenu = <DropDown />;
	const normalMenu = (
		<div>
			<Links />
			<div className="navbar__login">
				<Link to="/login">Login</Link>
			</div>
		</div>
	);

	// Responsivity of the navBar
	useEffect(() => {
		function onWindowResize() {
			const windowWidth = window.innerWidth;
			windowWidth < 980 ? setDropDown(true) : setDropDown(false);
		}
		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, []);

	return (
		<header className="navbar">
			<div to="/" className="navbar__logo">
				<img
					src={require("../../assets/logos/tevents_logo.png")}
					alt="token-events-logo"
				/>
			</div>
			{dropDown ? dropDownMenu : normalMenu}
		</header>
	);
}

export default NavBar;
