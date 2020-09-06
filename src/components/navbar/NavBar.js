import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

import Links from "./Links";
import DropDown from "./DropDown";

function NavBar({ loginState, user, logOut }) {
	let [dropDown, setDropDown] = useState(false);

	function navBorder(id) {
		const links = document.getElementsByClassName("navbar__link");
		for (let i = 0; i < 3; i++) {
			if (i === id) links[i].classList.add("navbar__links__underline");
			else links[i].classList.remove("navbar__links__underline");
		}
	}

	function removeNavBorder(event) {
		if (event === "login") {
			loginState();
		}
		if (event === "logout") {
			logOut();
			navBorder(0);
			return;
		}

		const links = document.getElementsByClassName("navbar__link");
		for (let i = 0; i < 3; i++) {
			links[i].classList.remove("navbar__links__underline");
		}
	}

	function logOutUser() {
		setTimeout(() => {
			logOut();
		}, 500);
	}

	const dropDownMenu = (
		<DropDown loginState={loginState} user={user} logOutUser={logOutUser} />
	);
	const normalMenu = (
		<div>
			<Links navBorder={navBorder} />
			<div className="navbar__login">
				{user.token ? (
					<div>
						<Link
							to="/user"
							className="navbar__user"
							onClick={() => removeNavBorder()}
						>
							<h5>{user.name}</h5>
							<h6>{user.email}</h6>
						</Link>
						<Link to="/" onClick={() => removeNavBorder("logout")}>
							<h4 className="navbar__user__logout">SAIR</h4>
						</Link>
					</div>
				) : (
					<Link to="/login" onClick={() => removeNavBorder("login")}>
						Login
					</Link>
				)}
			</div>
		</div>
	);

	// Responsivity of the navBar
	useEffect(() => {
		function onWindowResize() {
			const windowWidth = window.innerWidth;
			windowWidth < 750 ? setDropDown(true) : setDropDown(false);
		}
		if (window.innerWidth < 750) onWindowResize();
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
