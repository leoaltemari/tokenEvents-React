import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

// Utils

function Links({ navBorder }) {
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
				to="/eventos"
				className="navbar__link"
				onClick={() => navBorder(1)}
			>
				Eventos
			</Link>
			<Link
				to="/convites"
				className="navbar__link"
				onClick={() => navBorder(2)}
			>
				Convites
			</Link>
		</div>
	);
}

export default Links;
