import React from "react";

import Login from "../components/login/Login";

import "../styles/login.css";

function LoginPage({ loginState, getUser }) {
	return (
		<main className="main__page">
			<Login loginState={loginState} getUser={getUser} />
		</main>
	);
}

export default LoginPage;
