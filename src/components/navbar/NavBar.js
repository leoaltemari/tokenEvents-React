import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

import Links from "./Links";
import DropDown from "./DropDown";

function NavBar({ loginState }) {
	let [dropDown, setDropDown] = useState(false);

	function navBorder(id) {
		const links = document.getElementsByClassName("navbar__link");
		for (let i = 0; i < 3; i++) {
			if (i === id) links[i].classList.add("navbar__links__underline");
			else links[i].classList.remove("navbar__links__underline");
		}
	}

	const dropDownMenu = <DropDown loginState={loginState} />;
	const normalMenu = (
		<div>
			<Links navBorder={navBorder} />
			<div className="navbar__login">
				<Link to="/login" onClick={loginState}>
					Login
				</Link>
			</div>
		</div>
	);

	// Responsivity of the navBar
	useEffect(() => {
		function onWindowResize() {
			const windowWidth = window.innerWidth;
			windowWidth < 750 ? setDropDown(true) : setDropDown(false);
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
