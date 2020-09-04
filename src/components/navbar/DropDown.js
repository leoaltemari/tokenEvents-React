import React from "react";
import { Link } from "react-router-dom";

import "../../styles/hamburguer.css";

function DropDown() {
	function closeMenu() {
		const checkBox = document.querySelector("#menu-hamburguer");
		checkBox.checked = !checkBox.checked;
	}
	return (
		<div>
			<input id="menu-hamburguer" type="checkbox" />
			<label htmlFor="menu-hamburguer">
				<div className="menu">
					<span className="hamburguer"></span>
				</div>
			</label>
			<ul>
				<li>
					<Link to="/" onClick={() => closeMenu()}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/eventos" onClick={() => closeMenu()}>
						Eventos
					</Link>
				</li>
				<li>
					<Link to="/convites" onClick={() => closeMenu()}>
						Convites
					</Link>
				</li>
				<li>
					<Link to="/login" onClick={() => closeMenu()}>
						Login
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default DropDown;
