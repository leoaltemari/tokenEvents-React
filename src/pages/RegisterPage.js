import React from "react";

import Register from "../components/login/Register";

import "../styles/login.css";

function RegisterPage({ loginState, getUser }) {
	return (
		<main className="main__page">
			<Register loginState={loginState} />
		</main>
	);
}

export default RegisterPage;
