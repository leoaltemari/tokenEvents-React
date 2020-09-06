import React from "react";
import { Link } from "react-router-dom";

import "../../styles/hamburguer.css";

function DropDown({ loginState, user, logOutUser }) {
	function closeMenu(id) {
		const checkBox = document.querySelector("#menu-hamburguer");
		checkBox.checked = !checkBox.checked;

		if (id === 4) {
			loginState();
		}
		if (id === 5) {
			logOutUser();
		}
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
					<Link
						to={user.token ? "/user/events" : "/login"}
						onClick={
							user.token ? () => closeMenu() : () => closeMenu(4)
						}
					>
						Meus Eventos
					</Link>
				</li>
				<li>
					{!user.token ? (
						<Link to="/login" onClick={() => closeMenu(4)}>
							Login
						</Link>
					) : (
						<Link to="/user" onClick={() => closeMenu()}>
							Perfil
						</Link>
					)}
				</li>
				<li>
					{user.token && (
						<Link to="/" onClick={() => closeMenu(5)}>
							Sair
						</Link>
					)}
				</li>
			</ul>
		</div>
	);
}

export default DropDown;
