import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

// Utils

function Links({ navBorder, removeNavBorder, user }) {
	return (
		<div className="navbar__links">
			<Link
				to="/"
				className="navbar__link navbar__links__underline"
				onClick={() => navBorder(0)}
			>
				Home
			</Link>
			<Link
				to="/events"
				className="navbar__link"
				onClick={() => navBorder(1)}
			>
				Eventos
			</Link>

			<Link
				to={user.token ? "/user/events" : "/login"}
				className="navbar__link"
				onClick={
					user.token
						? () => navBorder(2)
						: () => removeNavBorder("login")
				}
			>
				Meus Eventos
			</Link>
		</div>
	);
}

export default Links;
