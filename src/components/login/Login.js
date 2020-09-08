import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../utils/Input";
import UserApi from "../../services/user-api";
import "../../styles/utils.css";

function Login({ loginState, getUser }) {
	const [inputData, setInputData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	// Function to get the user input
	function handleLogin(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputData(prevData => {
			return { ...prevData, [name]: value };
		});
	}

	// Authenticate the user in the backend
	async function authenticate(event) {
		// Reset errors
		setErrors({});
		event.preventDefault();

		// Request
		const userApi = new UserApi();
		const res = await userApi.login(inputData.email, inputData.password);

		// Response
		if (res.status === 0) {
			// Authentication Success
			getUser(res.user);
			window.localStorage.setItem("user", JSON.stringify(res.user));
			loginState();
			document.querySelector("#user-page").click();
		} else {
			// Authentication failed
			if (res.errors) {
				setErrors(res.errors);
				document
					.querySelector(".form__errors")
					.classList.add("form__errors__show");
			}
		}
	}

	return (
		<div className="login__content">
			<form className="login__form">
				{/* Banner */}
				<div className="form__banner">
					<Link to="/">
						<img
							src={require("../../assets/logos/tevents_logo.png")}
							alt="token events logo"
							onClick={loginState}
						/>
					</Link>
					<h4>Conecte-se com a sua conta</h4>
				</div>

				{/* Display ERRORS */}
				{errors.length && (
					<div className="form__errors">
						<h6>{errors}</h6>
					</div>
				)}

				{/*  EMAIL input */}
				<Input
					type="text"
					fieldName="Email"
					icon="email_icon"
					place="Digite seu email"
					inputData={{ name: "email", value: inputData.email }}
					handleLogin={handleLogin}
				/>

				{/*  PASSWORD input */}
				<Input
					type="password"
					fieldName="Senha"
					icon="password_icon"
					place="Digite sua senha"
					inputData={{ name: "password", value: inputData.password }}
					handleLogin={handleLogin}
				/>

				{/* LOGIN button */}
				<div className="form__submit">
					<button className="main__button" onClick={authenticate}>
						Login
					</button>
				</div>

				{/* Link to REGISTER */}
				<div className="login__register">
					<h4>Não possui uma conta?</h4>
					<h5>
						<Link to="/register">Cadastre-se Aqui</Link>
					</h5>
				</div>
			</form>

			{/* externals */}
			<div className="login__bkg"></div>
			<Link to="/" id="user-page" />
		</div>
	);
}

export default Login;
